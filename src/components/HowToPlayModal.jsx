import { Heart, Snowflake, Wind, Crosshair, Coins, Shield as ShieldIcon } from 'lucide-react'

function HowToPlayModal({ onClose }) {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-8 m-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-3xl font-orbitron font-bold text-center mb-8 text-neon-cyan text-glow-cyan">HOW TO PLAY</h2>

                <div className="space-y-8 font-mono text-slate-300">
                    {/* Section 1: Basics */}
                    <section>
                        <h3 className="text-xl font-bold text-neon-green mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                            The Mission
                        </h3>
                        <p className="leading-relaxed">
                            Words are descending from the network. Type them exactly as they appear to destroy them before they breach the <span className="text-red-400">Core</span>.
                            <br /><br />
                            <span className="text-slate-400 text-sm">Target priority:</span> Type the word to target it. Once locked, you must finish that word or clear your input to switch targets.
                        </p>
                    </section>

                    {/* Section 2: Controls */}
                    <section>
                        <h3 className="text-xl font-bold text-neon-pink mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-pink rounded-full"></span>
                            Controls
                        </h3>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><span className="text-white font-bold">Typing</span>: Destroy enemies</li>
                            <li><span className="text-white font-bold">Enter</span>: Activate Ultimate (when charged)</li>
                            <li><span className="text-white font-bold">Esc</span>: Pause Game</li>
                        </ul>
                    </section>

                    {/* Section 3: Special Units */}
                    <section>
                        <h3 className="text-xl font-bold text-neon-orange mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-orange rounded-full"></span>
                            Special Units
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Health Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-neon-pink/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-neon-pink/30">
                                    <Heart className="w-5 h-5 text-neon-pink animate-pulse" fill="currentColor" />
                                </div>
                                <div>
                                    <span className="font-bold text-neon-pink">Health Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Restores 1 Health Point upon destruction.</p>
                                </div>
                            </div>

                            {/* Slow Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-neon-purple/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-neon-purple/30">
                                    <Snowflake className="w-5 h-5 text-neon-purple animate-spin-slow" />
                                </div>
                                <div>
                                    <span className="font-bold text-neon-purple">Slow Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Freezes time! Slows all enemies by 50% for 5 seconds.</p>
                                </div>
                            </div>

                            {/* Gust Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-cyan-400/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-cyan-400/30">
                                    <Wind className="w-5 h-5 text-cyan-400 animate-pulse" />
                                </div>
                                <div>
                                    <span className="font-bold text-cyan-400">Gust Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Blows all enemies back up the screen, buying you time.</p>
                                </div>
                            </div>

                            {/* Assassin Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-purple-500/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-purple-500/30">
                                    <Crosshair className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <span className="font-bold text-purple-500">Assassin Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Instantly destroys the enemy closest to the core.</p>
                                </div>
                            </div>

                            {/* Midas Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-yellow-400/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-yellow-400/30">
                                    <Coins className="w-5 h-5 text-yellow-400 animate-bounce" />
                                </div>
                                <div>
                                    <span className="font-bold text-yellow-400">Midas Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Doubles all score points gained for 10 seconds.</p>
                                </div>
                            </div>

                            {/* Shield Unit */}
                            <div className="p-3 bg-slate-800/50 rounded border border-green-500/50 flex items-start gap-3">
                                <div className="mt-1 p-1 bg-slate-900 rounded-lg border border-green-500/30">
                                    <ShieldIcon className="w-5 h-5 text-green-500" fill="currentColor" />
                                </div>
                                <div>
                                    <span className="font-bold text-green-500">Shield Unit</span>
                                    <p className="text-sm mt-1 text-slate-400">Grants a shield that blocks the next instance of damage.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Tips */}
                    <section>
                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            Pro Tips
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2">
                                <span className="text-neon-cyan">&gt;&gt;</span>
                                Maintain your <span className="text-neon-cyan">Streak</span> to increase your score multiplier.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neon-cyan">&gt;&gt;</span>
                                Save your <span className="text-neon-pink">Ultimate</span> for Boss Waves or when overwhelmed.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neon-cyan">&gt;&gt;</span>
                                Bonus units (except Health) do not cause damage if missed, but you miss out on their buffs!
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={onClose}
                        className="
              px-8 py-3 rounded-lg
              bg-slate-800 hover:bg-slate-700
              border border-slate-600 hover:border-slate-500
              text-white font-mono font-bold
              transition-all duration-200
            "
                    >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HowToPlayModal
