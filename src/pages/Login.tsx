import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const { error } = await signIn(email, senha);
    
    if (error) {
      setErro('Email ou senha incorretos. Verifique suas credenciais.');
      setCarregando(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErro('');
    const { error } = await signInWithGoogle();
    if (error) {
      setErro('Erro ao fazer login com Google. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#2F5EB5]">
      <div className="flex flex-col items-center pt-12 pb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img src="/logo-circle.png" alt="OBHelp" className="w-full h-full object-cover scale-105" />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center px-4 pb-6">
        <div className="w-full max-w-[420px] flex flex-col gap-4">
          <form onSubmit={handleLogin} className="bg-white/95 dark:bg-[#1e2430]/95 backdrop-blur-sm rounded-3xl shadow-2xl p-7 flex flex-col gap-4">

          {erro && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <p className="text-sm text-red-600 dark:text-red-400 text-center">{erro}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#121417] dark:text-white text-sm font-medium">Email</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#677283] dark:text-gray-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input
                className="form-input flex w-full rounded-xl border border-[#dde0e4] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-14 pl-11 pr-4 text-base"
                placeholder="doutor@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#121417] dark:text-white text-sm font-medium">Senha</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#677283] dark:text-gray-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                className="form-input flex w-full rounded-xl border border-[#dde0e4] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-14 pl-11 pr-12 text-base"
                placeholder="Digite sua senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 bg-primary text-white text-base font-bold hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Entrar'
            )}
          </button>

          <div className="relative flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl h-14 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>
        </form>

          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-white/90 text-sm font-normal text-center drop-shadow-sm">
              Ainda nao tem conta? <Link to="/register" className="text-white font-semibold hover:underline">Cadastre-se</Link>
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium">
              <Link to="/termos" className="hover:text-white transition-colors">Termos</Link>
              <span>•</span>
              <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
