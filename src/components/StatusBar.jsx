import { Shield } from 'lucide-react'

function StatusBar({
    health,
    maxHealth,
    score,
    streak,
    multiplier,
    ultimateCharge,
    ultimateMax,
    isBossWave,
    gameTime,
    wpm = 0,
    hasShield,
    isMidas
}) {
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000)
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className={`
      relative bg-slate-900/95 border-b border-slate-700 px-4 py-3
      ${isBossWave ? 'border-b-neon-pink' : ''}
    `}>
            {/* Boss wave warning banner */}
            {isBossWave && (
                <div className="absolute inset-0 bg-neon-pink/10 animate-pulse pointer-events-none" />
            )}

            <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
                {/* Left section: Health */}
                <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm font-orbitron tracking-wider">CORE</span>
                    <div className="flex gap-1 items-center">
                        {Array.from({ length: maxHealth }).map((_, i) => (
                            <div
                                key={i}
                                className={`
                  w-6 h-6 rounded border-2 transition-all duration-300
                  ${i < health
                                        ? 'bg-neon-green/30 border-neon-green shadow-[0_0_10px_rgba(57,255,20,0.5)]'
                                        : 'bg-slate-800 border-slate-700'
                                    }
                `}
                            />
                        ))}

                        {/* Shield Indicator */}
                        {hasShield && (
                            <div className="ml-2 animate-pulse">
                                <Shield className="w-6 h-6 text-green-500 fill-green-500/20" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Center section: Score & Time */}
                <div className="flex items-center gap-8">
                    {/* Score */}
                    <div className="text-center">
                        <div className="text-slate-500 text-xs font-orbitron tracking-widest">SCORE</div>
                        <div className={`text-2xl font-orbitron font-bold text-glow-cyan ${isMidas ? 'text-yellow-400 animate-pulse' : 'text-neon-cyan'}`}>
                            {score.toLocaleString()}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-10 bg-slate-700" />

                    {/* WPM */}
                    <div className="text-center">
                        <div className="text-slate-500 text-xs font-orbitron tracking-widest">WPM</div>
                        <div className="text-lg font-mono text-neon-green">
                            {Math.round(wpm)}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-10 bg-slate-700" />

                    {/* Time */}
                    <div className="text-center">
                        <div className="text-slate-500 text-xs font-orbitron tracking-widest">TIME</div>
                        <div className="text-lg font-mono text-slate-300">
                            {formatTime(gameTime)}
                        </div>
                    </div>
                </div>

                {/* Right section: Streak & Ultimate */}
                <div className="flex items-center gap-6">
                    {/* Streak / Multiplier */}
                    <div className="text-center min-w-[80px]">
                        <div className="text-slate-500 text-xs font-orbitron tracking-widest">MULTI</div>
                        <div className={`
              text-xl font-orbitron font-bold transition-all duration-300
              ${isMidas ? 'text-yellow-400' : (multiplier > 1 ? 'text-neon-orange' : 'text-slate-400')}
            `}>
                            x{multiplier}
                        </div>
                    </div>

                    {/* Ultimate meter */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-slate-500 text-xs font-orbitron tracking-widest">ULTIMATE</div>
                        <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                                className={`
                  h-full transition-all duration-300
                  ${ultimateCharge >= ultimateMax
                                        ? 'bg-gradient-to-r from-neon-purple to-neon-pink animate-pulse'
                                        : 'bg-gradient-to-r from-neon-purple/70 to-neon-cyan/70'
                                    }
                `}
                                style={{ width: `${(ultimateCharge / ultimateMax) * 100}%` }}
                            />
                        </div>
                        {ultimateCharge >= ultimateMax && (
                            <span className="text-neon-purple text-xs animate-pulse font-orbitron">READY!</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Boss wave warning text */}
            {isBossWave && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30">
                    <div className="px-4 py-1 bg-neon-pink/20 border border-neon-pink rounded-full">
                        <span className="text-neon-pink text-sm font-orbitron tracking-widest animate-pulse">
                            ⚠ BOSS INCOMING ⚠
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StatusBar
