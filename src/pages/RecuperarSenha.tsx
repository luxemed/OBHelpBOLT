import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const emailMascarado = email ? email.replace(/^(.{1,2}).*(@.*)$/, '$1***$2') : '';

  const handleEnviar = () => {
    if (email.trim() && email.includes('@')) {
      setEnviado(true);
    }
  };

  const handleReenviar = () => {
    setEnviado(false);
    setTimeout(() => setEnviado(true), 500);
  };

  if (enviado) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f5f7fa]">
        <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
          <button 
            onClick={() => setEnviado(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-8">Instruções Enviadas</h1>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-10">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-green-500 text-4xl">check</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">Verifique seu e-mail</h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            Enviamos as instruções de recuperação de senha para o endereço:
          </p>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2.5 mb-6">
            <span className="material-symbols-outlined text-gray-500 text-xl">mail</span>
            <span className="text-sm font-medium text-gray-700">{emailMascarado}</span>
          </div>

          <p className="text-xs text-gray-500 text-center mb-2">
            Não recebeu? Lembre-se de checar também sua caixa de <span className="font-semibold text-blue-600">Spam</span> ou <span className="font-semibold text-blue-600">Lixo Eletrônico</span>.
          </p>

          <button
            onClick={handleReenviar}
            className="text-blue-600 text-sm font-medium hover:underline mb-8"
          >
            Reenviar e-mail
          </button>
        </main>

        <div className="px-6 pb-8">
          <button
            onClick={() => navigate('/login')}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa]">
      <header className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <button 
          onClick={() => navigate('/login')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-800 pr-8">Recuperar Senha</h1>
      </header>

      <main className="flex-1 px-6 pt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Esqueceu sua senha?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Não se preocupe. Informe seu e-mail cadastrado abaixo para receber as instruções de redefinição.
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">E-mail</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <span className="material-symbols-outlined text-xl">mail</span>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full h-12 pl-12 pr-4 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline">
          <span className="material-symbols-outlined text-lg">help</span>
          Precisa de ajuda?
        </button>
      </main>

      <div className="px-6 pb-8">
        <button
          onClick={handleEnviar}
          disabled={!email.trim() || !email.includes('@')}
          className={`w-full h-14 font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 ${
            email.trim() && email.includes('@')
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Enviar instruções
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
