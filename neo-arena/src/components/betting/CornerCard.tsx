import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2 } from 'lucide-react';

interface CornerCardProps {
    side: 'red' | 'green';
    selected: boolean;
    onSelect: () => void;
    odds: string;
}

export const CornerCard: React.FC<CornerCardProps> = ({ side, selected, onSelect, odds }) => {
    const isRed = side === 'red';

    return (
        <button
            onClick={onSelect}
            className={clsx(
                "relative w-full group transition-all duration-300 ease-out",
                "h-48 sm:h-64 rounded-2xl border-2 overflow-hidden",
                "flex flex-col items-center justify-center gap-2",
                selected
                    ? (isRed ? "border-arena-red bg-arena-red/10 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]" : "border-arena-green bg-arena-green/10 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]")
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50"
            )}
        >
            {/* Selection Indicator */}
            {selected && (
                <div className={clsx(
                    "absolute top-4 right-4 animate-in fade-in zoom-in duration-200",
                    isRed ? "text-arena-red" : "text-arena-green"
                )}>
                    <CheckCircle2 className="w-6 h-6 fill-current" />
                </div>
            )}

            {/* Main Label */}
            <span className={clsx(
                "text-4xl sm:text-5xl font-black tracking-tighter uppercase transition-colors",
                isRed ? "text-arena-red" : "text-arena-green",
                !selected && "opacity-80 group-hover:opacity-100"
            )}>
                {isRed ? 'Rojo' : 'Verde'}
            </span>

            {/* Odds Pill */}
            <div className={clsx(
                "px-3 py-1 rounded-full text-sm font-bold font-mono tracking-wide",
                isRed ? "bg-arena-red/20 text-arena-red" : "bg-arena-green/20 text-arena-green"
            )}>
                {odds}
            </div>

            {/* Background Glow Effect */}
            <div className={clsx(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none",
                "bg-gradient-to-b",
                isRed ? "from-arena-red/5 to-transparent" : "from-arena-green/5 to-transparent"
            )} />
        </button>
    );
};
