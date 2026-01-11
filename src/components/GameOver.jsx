function GameOver({ score, gameTime, onRestart, onExit }) {
    const formatTime = (ms) => {
        const seconds = Math.floor(ms / 1000)
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm z-50">
            {/* Red overlay pulse */}
            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 animate-slide-up">
                {/* Game Over text */}
                <div className="text-center">
                    <h2 className="text-5xl md:text-7xl font-orbitron font-black tracking-wider text-red-500">
                        SYSTEM
                    </h2>
                    <h2 className="text-5xl md:text-7xl font-orbitron font-black tracking-wider text-red-500">
                        BREACH
                    </h2>
                </div>

                {/* Divider */}
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                {/* Stats */}
                <div className="flex flex-col items-center gap-4">
                    {/* Score */}
                    <div className="text-center">
                        <p className="text-slate-500 text-sm font-orbitron tracking-widest">FINAL SCORE</p>
                        <p className="text-4xl font-orbitron font-bold text-neon-cyan text-glow-cyan">
                            {score.toLocaleString()}
                        </p>
                    </div>

                    {/* Time survived */}
                    <div className="text-center">
                        <p className="text-slate-500 text-sm font-orbitron tracking-widest">TIME SURVIVED</p>
                        <p className="text-2xl font-mono text-slate-300">
                            {formatTime(gameTime)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-xs items-center">
                    {/* Restart button */}
                    <button
                        onClick={onRestart}
                        className="
                w-full px-10 py-4 rounded-xl
                bg-gradient-to-r from-neon-green/20 to-neon-cyan/20
                border-2 border-neon-green
                text-neon-green font-orbitron font-bold text-lg tracking-widest
                shadow-[0_0_30px_rgba(57,255,20,0.4)]
                hover:shadow-[0_0_50px_rgba(57,255,20,0.6)]
                hover:scale-105
                active:scale-95
                transition-all duration-300
                cursor-pointer
              "
                    >
                        [ RESTART ]
                    </button>

                    {/* Exit button */}
                    <button
                        onClick={onExit}
                        className="
                w-full px-10 py-3 rounded-xl
                bg-slate-900/50
                border border-slate-700 hover:border-red-500/50
                text-slate-400 hover:text-red-400 font-mono font-bold text-base tracking-wider
                hover:bg-slate-800
                hover:scale-105
                active:scale-95
                transition-all duration-300
                cursor-pointer
              "
                    >
                        EXIT TO MENU
                    </button>
                </div>

                {/* Return to menu hint */}
                <p className="text-slate-600 text-xs font-mono">
                    The core has been breached. Defend again.
                </p>
            </div>

            {/* Glitch lines effect */}
            <div className="absolute top-1/3 left-0 right-0 h-px bg-red-500/30" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-red-500/20" />
            <div className="absolute bottom-1/3 left-0 right-0 h-px bg-red-500/30" />
        </div>
    )
}

export default GameOver
