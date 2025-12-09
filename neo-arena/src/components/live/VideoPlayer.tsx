import React from 'react';
import ReactPlayer from 'react-player';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
    url?: string;
}

// Wrapper to bypass strict type checking on ReactPlayer props
const Player = ReactPlayer as any;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    return (
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
            {url ? (
                <Player
                    url={url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                />
            ) : (
                /* Placeholder for when no stream is active */
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-arena-red/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Play className="w-8 h-8 text-arena-red fill-current" />
                        </div>
                        <p className="text-slate-400 font-medium">Esperando señal en vivo...</p>
                        <p className="text-xs text-slate-600 mt-2">RTMP / HLS Ready</p>
                    </div>
                </div>
            )}
        </div>
    );
};
