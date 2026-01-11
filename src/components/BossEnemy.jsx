function BossEnemy({ enemy, isMatched, matchedLength }) {
    const { word, x, y } = enemy

    return (
        <div
            className={`absolute z-20`}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >

            {/* Boss warning indicator */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-neon-pink text-xs font-orbitron tracking-widest animate-pulse">
                ⚠ BOSS ⚠
            </div>

            <div className={`
        relative px-5 py-3 rounded-xl
        bg-slate-900/95 border-2 transition-transform duration-100
        ${isMatched
                    ? 'border-neon-cyan shadow-[0_0_30px_rgba(0,245,255,0.6)] scale-105'
                    : 'border-neon-pink shadow-[0_0_25px_rgba(255,110,199,0.5)]'
                }
        font-mono text-xl tracking-wider
        animate-boss-pulse
      `}>
                {/* Word with matched portion highlighted */}
                <span className="relative">
                    {word.split('').map((char, i) => (
                        <span
                            key={i}
                            className={`
                transition-colors duration-100
                ${i < matchedLength
                                    ? 'text-neon-cyan text-glow-cyan'
                                    : 'text-neon-pink'
                                }
              `}
                        >
                            {char}
                        </span>
                    ))}
                </span>

                {/* Corner decorations */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-neon-pink" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-neon-pink" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-neon-pink" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-neon-pink" />

                {/* Glow overlay */}
                {isMatched && (
                    <div className="absolute inset-0 rounded-xl bg-neon-cyan/10 animate-pulse" />
                )}
            </div>

            {/* Progress bar (matched characters) */}
            <div className="mt-2 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-100"
                    style={{ width: `${(matchedLength / word.length) * 100}%` }}
                />
            </div>
        </div>
    )
}

export default BossEnemy
