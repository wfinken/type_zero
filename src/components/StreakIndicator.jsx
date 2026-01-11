function StreakIndicator({ popup }) {
    const { text, x, y } = popup

    return (
        <div
            className="absolute pointer-events-none z-20 animate-streak-popup"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div className="bg-neon-yellow/10 border border-neon-yellow px-4 py-2 rounded-lg shadow-[0_0_20px_rgba(255,255,0,0.3)]">
                <span className="font-bold text-neon-yellow text-xl tracking-widest whitespace-nowrap text-glow-yellow">
                    {text}
                </span>
            </div>
        </div>
    )
}

export default StreakIndicator
