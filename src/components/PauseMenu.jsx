import React, { useEffect } from 'react'

const PauseMenu = ({ onResume, onExit }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border-2 border-cyan-500/50 p-8 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] max-w-md w-full text-center relative overflow-hidden">
                {/* Animated background element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

                <h2 className="text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8 tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    Paused
                </h2>

                <div className="space-y-4">
                    <button
                        onClick={onResume}
                        className="w-full py-4 text-xl font-bold text-cyan-950 bg-cyan-500 hover:bg-cyan-400 transition-all duration-200 rounded shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] uppercase tracking-wide group relative overflow-hidden"
                    >
                        <span className="relative z-10">Resume Protocol</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    <button
                        onClick={onExit}
                        className="w-full py-4 text-xl font-bold text-slate-300 border border-slate-700 hover:border-red-500 hover:text-red-400 hover:bg-red-950/30 transition-all duration-200 rounded uppercase tracking-wide"
                    >
                        Abort Mission
                    </button>
                </div>

                <div className="mt-8 text-slate-500 text-sm font-mono">
                    Press ESC to Resume
                </div>
            </div>
        </div>
    )
}

export default PauseMenu
