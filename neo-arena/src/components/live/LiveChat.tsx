import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    user: string;
    text: string;
    timestamp: string;
    isSystem?: boolean;
}

export const LiveChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', user: 'System', text: 'Bienvenido al chat en vivo de NeoArena!', timestamp: '12:00', isSystem: true },
        { id: '2', user: 'Carlos M.', text: '¡Vamos Rojo! 🔥', timestamp: '12:01' },
        { id: '3', user: 'Ana P.', text: 'El verde se ve fuerte hoy', timestamp: '12:02' },
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user, setRedirectPath } = useAuth();
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        if (!user) {
            setRedirectPath('/live');
            navigate('/login');
            return;
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            user: 'Tú',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText('');
    };

    return (
        <div className="flex flex-col h-[600px] lg:h-full bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-900/80">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Chat en Vivo
                </h3>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-3", msg.isSystem ? "justify-center" : "")}>
                        {msg.isSystem ? (
                            <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                                {msg.text}
                            </span>
                        ) : (
                            <>
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-bold text-slate-300">{msg.user}</span>
                                        <span className="text-[10px] text-slate-600">{msg.timestamp}</span>
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed">{msg.text}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {user ? (
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900/80">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-arena-red/50 focus:border-arena-red/50 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-arena-red hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            ) : (
                <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
                    <span className="text-sm text-slate-400">Inicia sesión para participar en el chat</span>
                    <button
                        onClick={() => {
                            setRedirectPath('/live');
                            navigate('/login');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium text-white transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </div>
            )}
        </div>
    );
};
