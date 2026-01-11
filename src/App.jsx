import { useState, useEffect, useCallback, useRef } from 'react'
import GameArena from './components/GameArena'
import TypingInput from './components/TypingInput'
import StatusBar from './components/StatusBar'
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver'
import PauseMenu from './components/PauseMenu'
import { getRandomWord, getRandomBossPhrase, SLOW_WORDS, GUST_WORDS, ASSASSIN_WORDS, MIDAS_WORDS, SHIELD_WORDS } from './data/words'

// Game constants
const ARENA_HEIGHT_PERCENT = 0.75
const SPAWN_INTERVAL_BASE = 2500
const SPAWN_INTERVAL_VARIANCE = 1500
const BOSS_INTERVAL = 30000
const BASE_SPEED = 12 // Percent per second (crosses screen in ~8s)
const SPEED_VARIANCE = 8 // Can go up to 20%/sec
const BOSS_SPEED = 8
const MAX_HEALTH = 5
const ULTIMATE_CHARGE_REQUIRED = 10
const SLOW_DURATION = 5000
const SLOW_FACTOR = 0.5

function App() {
  // Game state
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'gameover'
  const [enemies, setEnemies] = useState([])
  const [health, setHealth] = useState(MAX_HEALTH)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ultimateCharge, setUltimateCharge] = useState(0)
  const [isBossWave, setIsBossWave] = useState(false)
  const [input, setInput] = useState('')
  const [matchedEnemy, setMatchedEnemy] = useState(null)
  const [destroyedEnemies, setDestroyedEnemies] = useState([])
  const [screenShake, setScreenShake] = useState(false)
  const [gameTime, setGameTime] = useState(0)
  const [totalWordsTyped, setTotalWordsTyped] = useState(0)
  const [accumulatedTypingTime, setAccumulatedTypingTime] = useState(0)
  const [streakPopups, setStreakPopups] = useState([]) // Array of { id, text, x, y }
  const [hasShield, setHasShield] = useState(false)
  const [scoreMultiplier, setScoreMultiplier] = useState(1)

  // Refs for game loop
  const gameLoopRef = useRef(null)
  const lastTimeRef = useRef(0)
  const spawnTimerRef = useRef(0)
  const bossTimerRef = useRef(0)
  const slowdownTimerRef = useRef(0)
  const nextSpawnInterval = useRef(SPAWN_INTERVAL_BASE)
  const arenaRef = useRef(null)
  const enemyIdCounter = useRef(0)
  const popupIdCounter = useRef(0)
  const isBossWaveRef = useRef(false)
  const gameStateRef = useRef('menu')
  const wordStartTimeRef = useRef(null)

  // Get arena height
  const getArenaHeight = useCallback(() => {
    if (arenaRef.current) {
      return arenaRef.current.offsetHeight
    }
    return window.innerHeight * ARENA_HEIGHT_PERCENT
  }, [])

  // Calculate stats
  // active typing time per word logic
  const wps = accumulatedTypingTime > 0 ? (totalWordsTyped / accumulatedTypingTime) : 0
  const wpm = wps * 60

  // Calculate difficulty multiplier based on time
  const getDifficultyMultiplier = useCallback((timeMs) => {
    // Every 30 seconds, difficulty increases by ~20%
    // Cap at 3x difficulty (about 4-5 minutes in)
    const minutes = timeMs / 60000
    const multiplier = 1 + (minutes * 0.4)
    return Math.min(3, multiplier)
  }, [])

  // Spawn a new enemy
  const spawnEnemy = useCallback((isBoss = false) => {
    const id = ++enemyIdCounter.current
    let word = isBoss ? getRandomBossPhrase() : getRandomWord()

    // Calculate speed based on difficulty
    // Calculate speed based on difficulty
    const difficultyMult = getDifficultyMultiplier(gameTime)

    // Modulate speed based on word length
    // Shorter words move faster, longer words move slower
    // Reference length is 5 characters
    let lengthModifier = 1
    if (!isBoss) {
      // Use a dampened inverse relationship
      // e.g. Length 3 -> 5/3 = 1.66x speed
      // e.g. Length 8 -> 5/8 = 0.625x speed
      lengthModifier = 5 / Math.max(1, word.length)

      // Clamp modifier to avoid extreme speeds
      // Min 0.4x (25 char word), Max 1.5x (3 char word)
      lengthModifier = Math.max(0.4, Math.min(1.5, lengthModifier))
    }

    const baseSpeedForNow = isBoss ? BOSS_SPEED : (BASE_SPEED * difficultyMult)
    const speed = isBoss ? BOSS_SPEED : (baseSpeedForNow * lengthModifier) + (Math.random() * SPEED_VARIANCE * lengthModifier)

    // Random X position (5% to 75% to leave space for word width)
    const x = 5 + Math.random() * 70

    // Determine type (normal vs health vs slow)
    // Only spawn health words if damaged
    // 20% chance to spawn health word if damaged
    // 15% chance to spawn slow word independently
    let type = 'normal'
    const rand = Math.random()

    if (!isBoss) {
      if (health < MAX_HEALTH && rand < 0.2) {
        type = 'health'
      } else if (rand > 0.85) {
        // Special word roll
        const subRand = Math.random()
        if (subRand < 0.25) {
          type = 'slow'
          word = SLOW_WORDS[Math.floor(Math.random() * SLOW_WORDS.length)]
        } else if (subRand < 0.5) {
          type = 'gust'
          word = GUST_WORDS[Math.floor(Math.random() * GUST_WORDS.length)]
        } else if (subRand < 0.7) {
          type = 'assassin'
          word = ASSASSIN_WORDS[Math.floor(Math.random() * ASSASSIN_WORDS.length)]
        } else if (subRand < 0.85) {
          type = 'midas'
          word = MIDAS_WORDS[Math.floor(Math.random() * MIDAS_WORDS.length)]
        } else {
          type = 'shield'
          word = SHIELD_WORDS[Math.floor(Math.random() * SHIELD_WORDS.length)]
        }
      }
    }

    const newEnemy = {
      id,
      word,
      x,
      y: 5, // Start slightly below top so immediately visible
      speed,
      isBoss,
      health: isBoss ? 1 : 1,
      spawned: Date.now(),
      type
    }

    setEnemies(prev => [...prev, newEnemy])

    if (isBoss) {
      setIsBossWave(true)
      isBossWaveRef.current = true
    }
  }, [gameTime, getDifficultyMultiplier])

  // Track processed enemies to prevent double damage
  const processedEnemiesRef = useRef(new Set())

  // Handle enemy reaching bottom
  const handleEnemyReachBottom = useCallback((enemy, currentMatchedEnemy) => {
    // Prevent double damage from the same enemy
    if (processedEnemiesRef.current.has(enemy.id)) return
    processedEnemiesRef.current.add(enemy.id)

    // Special words (bonuses) don't cause damage or break streak if missed
    if (enemy.type !== 'normal') {
      setEnemies(prev => prev.filter(e => e.id !== enemy.id))
      // Check if this was the enemy currently being typed
      if (currentMatchedEnemy && enemy.id === currentMatchedEnemy.id) {
        setInput('')
        setMatchedEnemy(null)
      }
      return
    }

    if (hasShield) {
      setHasShield(false)
      setEnemies(prev => prev.filter(e => e.id !== enemy.id))
      // Shield protects health and streak
    } else {
      setHealth(prev => {
        // Always remove just 1 health, regardless of enemy type
        const newHealth = prev - 1
        if (newHealth <= 0) {
          setGameState('gameover')
        }
        return Math.max(0, newHealth)
      })
      setStreak(0)
    }
    setScreenShake(true)
    setTimeout(() => setScreenShake(false), 500)

    // Check if this was the enemy currently being typed
    if (currentMatchedEnemy && enemy.id === currentMatchedEnemy.id) {
      setInput('')
      setMatchedEnemy(null)
    }

    setEnemies(prev => prev.filter(e => e.id !== enemy.id))
  }, [hasShield])

  // Stable game loop wrapper ref
  const runGameLoopRef = useRef(null)

  // Game loop function stored in a ref for stability
  const gameLoopFn = useRef(null)

  gameLoopFn.current = (timestamp) => {
    if (gameStateRef.current !== 'playing') return

    const deltaTime = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0
    lastTimeRef.current = timestamp

    // Update game time (limit delta to prevent jumps if tab inactive)
    const safeDelta = Math.min(deltaTime, 0.1)
    const newGameTime = gameTime + safeDelta * 1000
    setGameTime(newGameTime)

    // Update timers
    const currentSpeedModifier = slowdownTimerRef.current > 0 ? SLOW_FACTOR : 1

    spawnTimerRef.current += safeDelta * 1000 * currentSpeedModifier
    bossTimerRef.current += safeDelta * 1000 * currentSpeedModifier

    if (slowdownTimerRef.current > 0) {
      slowdownTimerRef.current = Math.max(0, slowdownTimerRef.current - safeDelta * 1000)
    }

    // Calculate spawn interval based on difficulty logic
    // More difficulty = smaller interval
    const difficultyMult = getDifficultyMultiplier(newGameTime)
    const currentBaseInterval = SPAWN_INTERVAL_BASE / difficultyMult

    // Spawn new enemies
    if (!isBossWaveRef.current && spawnTimerRef.current >= nextSpawnInterval.current) {
      spawnEnemy(false)
      spawnTimerRef.current = 0
      nextSpawnInterval.current = currentBaseInterval + Math.random() * SPAWN_INTERVAL_VARIANCE
    }

    // Boss wave trigger
    if (bossTimerRef.current >= BOSS_INTERVAL) {
      bossTimerRef.current = 0
      spawnEnemy(true)
    }

    // Update enemy positions
    setEnemies(prev => {
      const updated = []
      for (const enemy of prev) {
        // Apply slowdown factor if active
        // Only affect normal movement, bosses are resistant or only partially affected? 
        // Let's affect everything for now as a powerful ability
        const currentSpeedModifier = slowdownTimerRef.current > 0 ? SLOW_FACTOR : 1
        const newY = enemy.y + (enemy.speed * currentSpeedModifier) * safeDelta

        // Check if reached bottom (leaving space for the enemy display)
        if (newY >= 95) {
          // Schedule damage on next tick to avoid state update during render
          setTimeout(() => handleEnemyReachBottom(enemy, matchedEnemy), 0)
        } else {
          updated.push({ ...enemy, y: newY })
        }
      }
      return updated
    })

    // Use the ref wrapper to continue the loop
    gameLoopRef.current = requestAnimationFrame(runGameLoopRef.current)
  }

  // Set up the stable wrapper
  runGameLoopRef.current = (timestamp) => {
    if (gameLoopFn.current) {
      gameLoopFn.current(timestamp)
    }
  }

  // Start game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameStateRef.current = 'playing'
      lastTimeRef.current = 0
      gameLoopRef.current = requestAnimationFrame(runGameLoopRef.current)
    } else {
      gameStateRef.current = gameState
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState])

  // Handle input change
  const handleInputChange = useCallback((value) => {
    // Check if user backspaced (typo correction)
    if (value.length < input.length) {
      setStreak(0)
    }

    setInput(value)

    if (!value) {
      setMatchedEnemy(null)
      return
    }

    // Find matching enemy (prefer exact matches, then prefix matches)
    const lowerValue = value.toLowerCase()

    // Start timer on first successful letter of a new attempt
    const isNewAttempt = value.length === 1 && !input
    if (isNewAttempt) {
      // Check if this single letter starts any word
      const startsAnyWord = enemies.some(e => e.word.toLowerCase().startsWith(lowerValue))
      if (startsAnyWord) {
        wordStartTimeRef.current = Date.now()
      }
    }

    // Check for exact match first
    const exactMatch = enemies.find(e => e.word.toLowerCase() === lowerValue)
    if (exactMatch) {
      // Calculate duration
      if (wordStartTimeRef.current) {
        const duration = (Date.now() - wordStartTimeRef.current) / 1000
        setAccumulatedTypingTime(prev => prev + duration)
        wordStartTimeRef.current = null
      } else {
        // Fallback for very fast internal state updates or logic gaps
        // Assume minimal time to avoid 0 division if logic is tight
        setAccumulatedTypingTime(prev => prev + 0.1)
      }

      // Destroy the enemy!
      const pointValue = exactMatch.isBoss ? 100 : exactMatch.word.length
      const streakMultiplier = Math.floor(streak / 5) + 1
      // Combine streak multiplier with midas score multiplier
      const finalMultiplier = streakMultiplier * scoreMultiplier

      // Handle Health Recovery
      if (exactMatch.type === 'health') {
        setHealth(prev => Math.min(MAX_HEALTH, prev + 1))
      }

      // Handle Slow Effect
      if (exactMatch.type === 'slow') {
        slowdownTimerRef.current = SLOW_DURATION
      }

      // Handle Gust Effect (Crowd Control)
      if (exactMatch.type === 'gust') {
        setEnemies(prev => prev.map(e => ({
          ...e,
          y: e.id === exactMatch.id ? e.y : Math.max(5, e.y - 20)
        })))
      }

      // Handle Midas Effect (Score Economy)
      if (exactMatch.type === 'midas') {
        setScoreMultiplier(2)
        setTimeout(() => setScoreMultiplier(1), 10000)
      }

      // Handle Shield Effect (Defense)
      if (exactMatch.type === 'shield') {
        setHasShield(true)
      }

      // Handle Assassin Effect (High Priority Target)
      let extraKilledId = null
      if (exactMatch.type === 'assassin') {
        // Find lowest enemy that is NOT the current one
        const otherEnemies = enemies.filter(e => e.id !== exactMatch.id)
        if (otherEnemies.length > 0) {
          const lowest = otherEnemies.reduce((prev, curr) => (prev.y > curr.y) ? prev : curr, otherEnemies[0])
          extraKilledId = lowest.id
          // Add extra score for the kill? Let's say yes, base value.
          setScore(prev => prev + (lowest.word.length * finalMultiplier))

          // Add to destroyed list
          setDestroyedEnemies(prev => [...prev, lowest])
        }
      }

      // Handle Streak Popups
      const newStreak = streak + 1
      if (newStreak > 0 && newStreak % 5 === 0) {
        // Add popup at the enemy's location
        const popupId = ++popupIdCounter.current
        setStreakPopups(prev => [
          ...prev,
          {
            id: popupId,
            text: `${newStreak} STREAK!`,
            x: exactMatch.x,
            y: exactMatch.y
          }
        ])

        // Remove popup after animation
        setTimeout(() => {
          setStreakPopups(prev => prev.filter(p => p.id !== popupId))
        }, 1500)
      }

      setScore(prev => prev + pointValue * finalMultiplier)
      setStreak(newStreak)
      setUltimateCharge(prev => Math.min(ULTIMATE_CHARGE_REQUIRED, prev + 1))
      setTotalWordsTyped(prev => prev + 1)

      if (exactMatch.isBoss) {
        setIsBossWave(false)
        isBossWaveRef.current = false
      }

      // Add to destroyed list for animation
      setDestroyedEnemies(prev => [...prev, exactMatch])
      setTimeout(() => {
        setDestroyedEnemies(prev => prev.filter(e => e.id !== exactMatch.id && e.id !== extraKilledId))
      }, 300)

      // Remove from enemies (include extraKilledId if exists)
      setEnemies(prev => prev.filter(e => e.id !== exactMatch.id && e.id !== extraKilledId))
      setInput('')
      setMatchedEnemy(null)
      return
    }

    // Find prefix match
    const prefixMatch = enemies.find(e => e.word.toLowerCase().startsWith(lowerValue))
    setMatchedEnemy(prefixMatch || null)
  }, [input, enemies, streak])

  // Handle ultimate ability
  const handleUltimate = useCallback(() => {
    if (ultimateCharge >= ULTIMATE_CHARGE_REQUIRED && enemies.length > 0) {
      // Clear all enemies
      const pointsGained = enemies.reduce((sum, e) => sum + (e.isBoss ? 100 : e.word.length), 0)
      setScore(prev => prev + pointsGained)

      // Add all to destroyed for animation
      setDestroyedEnemies(enemies)
      setTimeout(() => setDestroyedEnemies([]), 300)

      setEnemies([])
      setUltimateCharge(0)
      setIsBossWave(false)
      isBossWaveRef.current = false
      setInput('')
      setMatchedEnemy(null)
    }
  }, [ultimateCharge, enemies])

  // Toggle pause
  const togglePause = useCallback(() => {
    setGameState(current => {
      if (current === 'playing') return 'paused'
      if (current === 'paused') return 'playing'
      return current
    })
  }, [])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const current = gameStateRef.current
        if (current === 'playing' || current === 'paused') {
          togglePause()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePause])

  // Start game
  const startGame = useCallback(() => {
    setGameState('playing')
    setEnemies([])
    setHealth(MAX_HEALTH)
    setScore(0)
    setStreak(0)
    setUltimateCharge(0)
    setHasShield(false)
    setIsBossWave(false)
    isBossWaveRef.current = false
    setInput('')
    setMatchedEnemy(null)
    setDestroyedEnemies([])
    setGameTime(0)
    setTotalWordsTyped(0)
    setAccumulatedTypingTime(0)
    setStreakPopups([])
    spawnTimerRef.current = 0
    bossTimerRef.current = 0
    enemyIdCounter.current = 0
    wordStartTimeRef.current = null
    processedEnemiesRef.current.clear()

    // Spawn first enemy quickly
    setTimeout(() => spawnEnemy(false), 500)
  }, [spawnEnemy])

  // Calculate multiplier
  const multiplier = (Math.floor(streak / 5) + 1) * scoreMultiplier

  return (
    <div className={`h-screen w-screen bg-slate-950 flex flex-col overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
      {gameState === 'menu' && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === 'gameover' && (
        <GameOver
          score={score}
          gameTime={gameTime}
          onRestart={startGame}
          onExit={() => setGameState('menu')}
        />
      )}

      {gameState === 'playing' && (
        <>
          {/* Status Bar - Top */}
          <StatusBar
            health={health}
            maxHealth={MAX_HEALTH}
            score={score}
            streak={streak}
            multiplier={multiplier}
            ultimateCharge={ultimateCharge}
            ultimateMax={ULTIMATE_CHARGE_REQUIRED}
            isBossWave={isBossWave}
            gameTime={gameTime}
            wpm={wpm}
            hasShield={hasShield}
            isMidas={scoreMultiplier > 1}
          />

          {/* Game Arena - Middle */}
          <div ref={arenaRef} className="flex-1 relative">
            <GameArena
              enemies={enemies}
              destroyedEnemies={destroyedEnemies}
              matchedEnemy={matchedEnemy}
              inputValue={input}
              isBossWave={isBossWave}
              streakPopups={streakPopups}
              slowdownRemaining={slowdownTimerRef.current}
            />
          </div>

          {/* Typing Input - Bottom */}
          <TypingInput
            value={input}
            onChange={handleInputChange}
            onUltimate={handleUltimate}
            streak={streak}
            ultimateReady={ultimateCharge >= ULTIMATE_CHARGE_REQUIRED}
          />
        </>
      )}

      {gameState === 'paused' && (
        <>
          {/* Show game in background but blurred or darkened */}
          <div className="opacity-50 pointer-events-none flex flex-col h-full w-full">
            {/* Status Bar - Top */}
            <StatusBar
              health={health}
              maxHealth={MAX_HEALTH}
              score={score}
              streak={streak}
              multiplier={multiplier}
              ultimateCharge={ultimateCharge}
              ultimateMax={ULTIMATE_CHARGE_REQUIRED}
              isBossWave={isBossWave}
              gameTime={gameTime}
              wpm={wpm}
              hasShield={hasShield}
              isMidas={scoreMultiplier > 1}
            />

            {/* Game Arena - Middle */}
            <div ref={arenaRef} className="flex-1 relative">
              <GameArena
                enemies={enemies}
                destroyedEnemies={destroyedEnemies}
                matchedEnemy={matchedEnemy}
                inputValue={input}
                isBossWave={isBossWave}
                streakPopups={streakPopups}
                slowdownRemaining={slowdownTimerRef.current}
              />
            </div>
            {/* Typing Input - Visual only since we are paused */}
            <TypingInput
              value={input}
              onChange={() => { }}
              onUltimate={() => { }}
              streak={streak}
              ultimateReady={ultimateCharge >= ULTIMATE_CHARGE_REQUIRED}
            />
          </div>

          <PauseMenu
            onResume={togglePause}
            onExit={() => setGameState('menu')}
          />
        </>
      )}
    </div>
  )
}

export default App
