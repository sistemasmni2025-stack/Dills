import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Mail, Lock, LogIn, ArrowLeft, BadgeCheck, Gift, Wallet } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithProvider, registerWithEmail, redirectPath } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const completeAndRedirect = () => {
    navigate(redirectPath || '/live', { replace: true });
  };

  const handleProvider = async (provider: 'google' | 'microsoft' | 'yahoo') => {
    setSubmitting(true);
    await loginWithProvider(provider);
    setSubmitting(false);
    completeAndRedirect();
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) return;
    setSubmitting(true);
    await registerWithEmail(name.trim(), email.trim(), password);
    setSubmitting(false);
    completeAndRedirect();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-arena-red to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-arena-red/20">
            <span className="font-bold">N</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold">Acceder a NeoArena</h1>
          <p className="text-sm text-slate-400">Inicia sesión para ver el en vivo y apostar</p>
        </div>

        <div className="space-y-3">
            <button
                disabled={submitting}
                onClick={() => handleProvider('google')}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
                <LogIn className="w-4 h-4" />
                Continuar con Google
            </button>
            <button
                disabled={submitting}
                onClick={() => handleProvider('microsoft')}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
                <LogIn className="w-4 h-4" />
                Continuar con Outlook
            </button>
            <button
                disabled={submitting}
                onClick={() => handleProvider('yahoo')}
                className="w-full px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
                <LogIn className="w-4 h-4" />
                Continuar con Yahoo
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

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs text-slate-500">o</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BadgeCheck className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-arena-red/50 focus:border-arena-red/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Correo</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-arena-red/50 focus:border-arena-red/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:ring-2 focus:ring-arena-red/50 focus:border-arena-red/50 transition-all"
              />
            </div>
          </div>
          <button
            disabled={submitting}
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-200 bg-arena-red hover:bg-red-600 text-white shadow-lg shadow-red-900/20"
          >
            <Lock className="w-5 h-5" />
            Registrarme con correo
          </button>
        </form>
      </div>
    </div>
  );
};
