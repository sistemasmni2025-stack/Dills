import React from 'react';
import { Timer, Trophy } from 'lucide-react';

export const FightStatus: React.FC = () => {
    return (
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Fight Info */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Ronda 1 - Pelea 9</h2>
                        <p className="text-sm text-slate-400">Anillo 2 • Gallo vs Gallo</p>
                    </div>
                </div>

                {/* Live Status */}
                <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-800/50">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">En Vivo</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                            <Timer className="w-3 h-3" />
                            <span>02:14</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
