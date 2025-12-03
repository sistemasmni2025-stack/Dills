import React from 'react';
import { VideoPlayer } from './live/VideoPlayer';
import { LiveChat } from './live/LiveChat';
import { BettingInterface } from './betting/BettingInterface';

export const LiveEventPage: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Video + Betting */}
            <div className="lg:col-span-2 space-y-6">
                <section aria-label="Live Stream">
                    <VideoPlayer />
                </section>

                <section aria-label="Betting Interface">
                    <BettingInterface />
                </section>
            </div>

            {/* Right Column: Chat */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <LiveChat />
                </div>
            </div>
        </div>
    );
};
