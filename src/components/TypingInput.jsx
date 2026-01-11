import { useEffect, useRef } from 'react'

function TypingInput({ value, onChange, onUltimate, streak, ultimateReady }) {
    const inputRef = useRef(null)

    // Keep input focused
    useEffect(() => {
        const focusInput = () => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }

        focusInput()

        // Re-focus on click anywhere
        document.addEventListener('click', focusInput)

        return () => {
            document.removeEventListener('click', focusInput)
        }
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && ultimateReady) {
            e.preventDefault()
            onUltimate()
        }
    }

    const isOnFire = streak >= 5

    return (
        <div className="relative bg-slate-900 border-t border-slate-700 p-4">


            <div className="max-w-2xl mx-auto flex items-center gap-4">
                {/* Input container */}
                <div className={`
          flex-1 relative rounded-lg overflow-hidden
        `}>
                    {/* Input styling container */}
                    <div className={`
            relative rounded-lg border-2 transition-all duration-300
            ${ultimateReady
                            ? 'border-neon-purple bg-slate-800/50'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                        }
          `}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type to defend..."
                            className={`
                w-full px-4 py-3 bg-transparent
                font-mono text-xl tracking-wider
                text-neon-green placeholder:text-slate-600
                focus:outline-none
              `}
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />

                        {/* Cursor blink effect */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <span className="text-neon-green animate-pulse">|</span>
                        </div>
                    </div>
                </div>

                {/* Ultimate button */}
                <button
                    onClick={onUltimate}
                    disabled={!ultimateReady}
                    className={`
            px-4 py-3 rounded-lg font-orbitron font-bold text-sm tracking-wider
            transition-all duration-300 border-2
            ${ultimateReady
                            ? 'bg-neon-purple/20 border-neon-purple text-neon-purple hover:bg-neon-purple/30 shadow-[0_0_20px_rgba(191,0,255,0.5)] cursor-pointer'
                            : 'bg-slate-800/50 border-slate-700 text-slate-600 cursor-not-allowed'
                        }
          `}
                >
                    ⚡ CLEAR
                </button>
            </div>

            {/* Streak indicator */}
            {
                streak > 0 && (
                    <div className="absolute top-2 left-4 text-xs font-mono">
                        <span className={`
            ${isOnFire ? 'text-neon-orange text-glow-green' : 'text-slate-500'}
          `}>
                            {isOnFire && '🔥 '}
                            STREAK: {streak}
                        </span>
                    </div>
                )
            }

            {/* Ultimate hint */}
            {
                ultimateReady && (
                    <div className="absolute top-2 right-4 text-xs font-mono text-neon-purple animate-pulse">
                        Press ENTER to unleash!
                    </div>
                )
            }
        </div >
    )
}

export default TypingInput
