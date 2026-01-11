import { Heart, Snowflake, Hourglass, Wind, Crosshair, Coins, Shield as ShieldIcon } from 'lucide-react'

function Enemy({ enemy, isMatched, matchedLength }) {
    const { word, x, y } = enemy

    // Determine icon based on type
    const getIcon = () => {
        if (enemy.type === 'health') {
            return <Heart className="w-5 h-5 text-neon-pink absolute -top-5 left-1/2 -translate-x-1/2 animate-pulse" fill="currentColor" />
        }
        if (enemy.type === 'slow') {
            return <Snowflake className="w-5 h-5 text-neon-purple absolute -top-5 left-1/2 -translate-x-1/2 animate-spin-slow" />
        }
        if (enemy.type === 'gust') {
            return <Wind className="w-5 h-5 text-cyan-400 absolute -top-5 left-1/2 -translate-x-1/2 animate-pulse" />
        }
        if (enemy.type === 'assassin') {
            return <Crosshair className="w-5 h-5 text-purple-500 absolute -top-5 left-1/2 -translate-x-1/2 animate-pulse" />
        }
        if (enemy.type === 'midas') {
            return <Coins className="w-5 h-5 text-yellow-400 absolute -top-5 left-1/2 -translate-x-1/2 animate-bounce" />
        }
        if (enemy.type === 'shield') {
            return <ShieldIcon className="w-5 h-5 text-green-500 absolute -top-5 left-1/2 -translate-x-1/2 animate-pulse" fill="currentColor" />
        }
        return null
    }

    // Determine border color
    const getBorderColor = () => {
        if (isMatched) return 'border-neon-cyan shadow-[0_0_15px_rgba(0,245,255,0.5)] scale-110'
        if (enemy.type === 'health') return 'border-neon-pink/50 shadow-[0_0_10px_rgba(255,110,199,0.3)]'
        if (enemy.type === 'slow') return 'border-neon-purple/50 shadow-[0_0_10px_rgba(191,0,255,0.3)]'
        if (enemy.type === 'gust') return 'border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
        if (enemy.type === 'assassin') return 'border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
        if (enemy.type === 'midas') return 'border-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.3)]'
        if (enemy.type === 'shield') return 'border-green-500 border-2 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
        return 'border-neon-green/50 shadow-[0_0_10px_rgba(57,255,20,0.3)]'
    }

    // Determine text color for unmatched portion
    const getUnmatchedColor = () => {
        if (enemy.type === 'health') return 'text-neon-pink'
        if (enemy.type === 'slow') return 'text-neon-purple'
        if (enemy.type === 'gust') return 'text-cyan-400'
        if (enemy.type === 'assassin') return 'text-purple-500'
        if (enemy.type === 'midas') return 'text-yellow-400'
        if (enemy.type === 'shield') return 'text-green-500'
        return 'text-neon-green'
    }

    return (
        <div
            className={`absolute z-10`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div className={`
        relative px-3 py-1.5 rounded-lg
        bg-slate-900/90 border transition-transform duration-100
        ${getBorderColor()}
        font-mono text-lg tracking-wider
      `}>
                {getIcon()}

                {/* Word with matched portion highlighted */}
                <span className="relative">
                    {word.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`
                                transition-colors duration-100
                                ${i < matchedLength
                                    ? 'text-neon-cyan text-glow-cyan'
                                    : getUnmatchedColor()
                                }
                              `}
                        >
                            {char}
                        </span>
                    ))}
                </span>

                {/* Glow effect when matched */}
                {isMatched && (
                    <div className="absolute inset-0 rounded-lg bg-neon-cyan/10 animate-pulse-glow" />
                )}
            </div>
        </div>
    )
}

export default Enemy
