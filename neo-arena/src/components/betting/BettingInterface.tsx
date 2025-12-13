import React, { useState } from 'react';
import { FightStatus } from './FightStatus';
import { CornerCard } from './CornerCard';
import { OddsSelector, type OddsType } from './OddsSelector';
import { DollarSign, Send, Gift, Lock, Wallet, BadgeCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const BettingInterface: React.FC = () => {
    const [selectedSide, setSelectedSide] = useState<'red' | 'green' | null>(null);
    const [oddsType, setOddsType] = useState<OddsType>('parejo');
    const [amount, setAmount] = useState<string>('');
    const { user, setRedirectPath } = useAuth();
    const navigate = useNavigate();

    const quickAmounts = [100, 500, 1000, 5000];

    const handlePlaceBet = () => {
        if (!selectedSide || !amount) return;
        if (!user) {
            setRedirectPath('/live');
            navigate('/login');
            return;
        }
        alert(`Apuesta enviada: $${amount} al ${selectedSide === 'red' ? 'ROJO' : 'VERDE'} (${oddsType})`);
        setAmount('');
        setSelectedSide(null);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <FightStatus />

            {user ? (
                <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <CornerCard
                            side="red"
                            selected={selectedSide === 'red'}
                            onSelect={() => setSelectedSide('red')}
                            odds="-110"
                        />
                        <CornerCard
                            side="green"
                            selected={selectedSide === 'green'}
                            onSelect={() => setSelectedSide('green')}
                            odds="+110"
                        />
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Apuesta</label>
                                <OddsSelector value={oddsType} onChange={setOddsType} />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monto</label>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="block w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-arena-red/50 focus:border-arena-red/50 transition-all font-mono text-lg"
                                    />
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {quickAmounts.map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => setAmount(amt.toString())}
                                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium text-slate-300 transition-colors whitespace-nowrap"
                                        >
                                            ${amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceBet}
                                disabled={!selectedSide || !amount}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200",
                                    selectedSide && amount
                                        ? (selectedSide === 'red' ? "bg-arena-red hover:bg-red-600 text-white shadow-lg shadow-red-900/20" : "bg-arena-green hover:bg-green-600 text-white shadow-lg shadow-green-900/20")
                                        : "bg-slate-800 text-slate-500 cursor-not-allowed"
                                )}
                            >
                                <span>Apostar al {selectedSide === 'red' ? 'Rojo' : selectedSide === 'green' ? 'Verde' : '...'}</span>
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold">Regístrate para apostar</h3>
                            <p className="text-sm text-slate-400">Crea tu cuenta o inicia sesión para participar</p>
                        </div>
                        <button
                            onClick={() => {
                                setRedirectPath('/live');
                                navigate('/login');
                            }}
                            className="px-4 py-2 bg-arena-red hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Iniciar sesión
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
                            <div className="w-9 h-9 rounded-lg bg-arena-red/20 flex items-center justify-center">
                                <Gift className="w-5 h-5 text-arena-red" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Bono de bienvenida</p>
                                <p className="text-xs text-slate-400">Empieza con beneficios exclusivos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
                            <div className="w-9 h-9 rounded-lg bg-arena-green/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-arena-green" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Seguridad y verificación</p>
                                <p className="text-xs text-slate-400">Protección de identidad y acceso seguro</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-700/30 flex items-center justify-center">
                                <BadgeCheck className="w-5 h-5 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Historial de apuestas</p>
                                <p className="text-xs text-slate-400">Consulta tus resultados y movimientos</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/40 rounded-xl p-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-700/30 flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-slate-300" />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Saldo protegido</p>
                                <p className="text-xs text-slate-400">Gestiona depósitos y retiros con control</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                        Solo para mayores de 18 años. Juega con responsabilidad. Al crear una cuenta aceptas los Términos y Condiciones y el Aviso de Privacidad.
                    </p>
                </div>
            )}
        </div>
    );
};
