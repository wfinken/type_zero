import { useState } from 'react'
import HowToPlayModal from './HowToPlayModal'

function StartScreen({ onStart }) {
    const [showHowToPlay, setShowHowToPlay] = useState(false)

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 cyber-grid z-50">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8 animate-slide-up">
                {/* Logo / Title */}
                <div className="text-center">
                    <h1 className="text-6xl md:text-8xl font-orbitron font-black tracking-wider">
                        <span className="text-neon-green text-glow-green">TYPE</span>
                        <br />
                        <span className="text-neon-pink text-glow-pink">ZERO</span>
                    </h1>
                    <p className="mt-4 text-slate-400 font-mono tracking-widest">
                        TYPE TO SURVIVE
                    </p>
                </div>

                {/* Divider */}
                <div className="w-48 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />

                {/* Instructions */}
                <div className="text-center space-y-2 text-sm font-mono text-slate-500 max-w-md">
                    <p>Words fall from above. Type them to destroy.</p>
                    <p>Don't let them reach the <span className="text-red-400">core</span>.</p>
                    <p className="text-neon-orange">Build streaks for score multipliers!</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-2 text-xs font-mono text-slate-600">
                    <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">TYPE</span>
                        <span>→ Destroy words</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">ENTER</span>
                        <span>→ Ultimate (when charged)</span>
                    </div>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                    {/* Start button */}
                    <button
                        onClick={onStart}
                        className="
                w-full px-8 py-4 rounded-xl
                bg-gradient-to-r from-neon-green/20 to-neon-cyan/20
                border-2 border-neon-green
                text-neon-green font-orbitron font-bold text-xl tracking-widest
                shadow-[0_0_30px_rgba(57,255,20,0.4)]
                hover:shadow-[0_0_50px_rgba(57,255,20,0.6)]
                hover:scale-105
                active:scale-95
                transition-all duration-300
                cursor-pointer
            "
                    >
                        [ START DEFENSE ]
                    </button>

                    {/* How to Play button */}
                    <button
                        onClick={() => setShowHowToPlay(true)}
                        className="
                w-full px-8 py-3 rounded-xl
                bg-slate-900/50
                border border-slate-600 hover:border-slate-400
                text-slate-300 font-mono font-bold text-lg tracking-wider
                hover:bg-slate-800
                hover:scale-105
                active:scale-95
                transition-all duration-300
                cursor-pointer
            "
                    >
                        HOW TO PLAY
                    </button>
                </div>

                {/* Version */}
                <p className="mt-8 text-slate-700 text-xs font-mono">v1.0.0</p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 border border-neon-green/20 rounded-full animate-pulse-glow opacity-20" />
            <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-neon-pink/20 rounded-full animate-pulse-glow opacity-20" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-neon-cyan/20 rounded-full animate-pulse-glow opacity-20" style={{ animationDelay: '1s' }} />

            {/* Modal */}
            {showHowToPlay && (
                <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
            )}
        </div>
    )
}

export default StartScreen
