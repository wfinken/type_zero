import Enemy from './Enemy'
import BossEnemy from './BossEnemy'
import StreakIndicator from './StreakIndicator'
import { Snowflake } from 'lucide-react'

function GameArena({ enemies, destroyedEnemies, matchedEnemy, inputValue, isBossWave, streakPopups, slowdownRemaining }) {
    return (
        <div className="absolute inset-0 cyber-grid overflow-hidden">
            {/* Gradient overlay at top */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* Bottom "Core" zone indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-red-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/40" />

            {/* Boss wave warning overlay */}
            {isBossWave && (
                <div className="absolute inset-0 bg-neon-pink/5 animate-pulse pointer-events-none" />
            )}

            {/* Active enemies */}
            {enemies.map(enemy => (
                enemy.isBoss ? (
                    <BossEnemy
                        key={enemy.id}
                        enemy={enemy}
                        isMatched={matchedEnemy?.id === enemy.id}
                        matchedLength={matchedEnemy?.id === enemy.id ? inputValue.length : 0}
                    />
                ) : (
                    <Enemy
                        key={enemy.id}
                        enemy={enemy}
                        isMatched={matchedEnemy?.id === enemy.id}
                        matchedLength={matchedEnemy?.id === enemy.id ? inputValue.length : 0}
                    />
                )
            ))}

            {/* Destroyed enemies (flash animation) */}
            {destroyedEnemies.map(enemy => (
                <div
                    key={`destroyed-${enemy.id}`}
                    className="absolute animate-flash pointer-events-none"
                    style={{
                        left: `${enemy.x}%`,
                        top: `${enemy.y}%`,
                    }}
                >
                    <span className={`font-mono text-lg ${enemy.isBoss ? 'text-neon-pink' : 'text-neon-green'}`}>
                        {enemy.word}
                    </span>
                </div>
            ))}

            {/* Streak Popups */}
            {streakPopups?.map(popup => (
                <StreakIndicator key={popup.id} popup={popup} />
            ))}

            {/* Slowdown visualization */}
            {slowdownRemaining > 0 && (
                <>
                    {/* Purple border overlay */}
                    <div className="absolute inset-0 border-4 border-neon-purple/50 shadow-[inset_0_0_50px_rgba(191,0,255,0.2)] pointer-events-none z-20 animate-pulse" />

                    {/* Timer display */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-30 pointer-events-none">
                        <div className="flex items-center gap-2 text-neon-purple text-glow-purple animate-pulse">
                            <Snowflake className="w-6 h-6 animate-spin-slow" />
                            <span className="text-xl font-bold tracking-widest font-orbitron">TIME SLOWED</span>
                            <Snowflake className="w-6 h-6 animate-spin-slow" />
                        </div>
                        <div className="text-neon-purple font-mono text-lg">
                            {(slowdownRemaining / 1000).toFixed(1)}s
                        </div>
                    </div>
                </>
            )}

            {/* Scan line effect */}
            <div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent pointer-events-none"
                style={{
                    top: `${(Date.now() / 50) % 100}%`,
                    transition: 'top 0.1s linear'
                }}
            />
        </div>
    )
}

export default GameArena
