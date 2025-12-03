import React from 'react';
import { clsx } from 'clsx';

export type OddsType = 'parejo' | 'doy' | 'agarro';

interface OddsSelectorProps {
    value: OddsType;
    onChange: (value: OddsType) => void;
}

export const OddsSelector: React.FC<OddsSelectorProps> = ({ value, onChange }) => {
    const options: { id: OddsType; label: string }[] = [
        { id: 'parejo', label: 'Parejo' },
        { id: 'doy', label: 'Doy' },
        { id: 'agarro', label: 'Agarro' },
    ];

    return (
        <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex relative">
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onChange(option.id)}
                    className={clsx(
                        "flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 z-10",
                        value === option.id
                            ? "bg-slate-800 text-white shadow-sm ring-1 ring-slate-700"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};
