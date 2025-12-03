import React from 'react';
import { Menu, User, Wallet } from 'lucide-react';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-arena-red selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-arena-red to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-arena-red/20">
                            <span className="font-bold text-white">N</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            NeoArena
                        </span>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Balance Pill */}
                        <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                            <Wallet className="w-4 h-4 text-arena-green" />
                            <span className="font-mono font-medium text-arena-green">$5,000.00</span>
                        </div>

                        {/* User Profile */}
                        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors relative group">
                            <User className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        </button>

                        {/* Menu Toggle */}
                        <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <Menu className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
};
