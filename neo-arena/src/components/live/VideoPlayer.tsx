import React from 'react';
import { Play, Volume2, Maximize2 } from 'lucide-react';

export const VideoPlayer: React.FC = () => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
            {/* Placeholder for actual video stream */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="w-16 h-16 bg-arena-red/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Play className="w-8 h-8 text-arena-red fill-current" />
                    </div>
                    <p className="text-slate-400 font-medium">Esperando señal en vivo...</p>
                </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                        <Play className="w-5 h-5 fill-current" />
                    </button>
                    <div className="flex items-center gap-2 group/vol">
                        <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                            <Volume2 className="w-5 h-5" />
                        </button>
                        <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                            <div className="h-1 bg-slate-600 rounded-full w-20 ml-2">
                                <div className="h-full w-3/4 bg-arena-red rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">En Vivo</span>
                    </div>
                </div>

                <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                    <Maximize2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
