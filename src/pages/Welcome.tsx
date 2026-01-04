import { useNavigate, Link } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col justify-between overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-10 pb-6 w-full max-w-md mx-auto">
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
          <div className="w-24 h-24 bg-center bg-no-repeat bg-contain flex items-center justify-center overflow-hidden rounded-xl"
               style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWYTNzljL6CwxeC5DaJ9w0etAvyUQoTfMBrWUqOCeD5ojT4YChGaIhqB8gDj7nthDbAbCkPiH4dPuuZJZZM76jAJTH_BMANC51pPDP_RQQ7H0i-_RD3zski2T854IcZ5qqaaKTUsWH7uUS6IXJtdtxdj5bwkS35I1M1sd5_IqTZfbM4UUMjr2DhqU2KTWvMCht2Ykac0M6-zkdhuEfADhXxbPho5CrQ5gfsGqxV3drnUc7juYiMyEcKMzJsHZwN-7N0qleMAoj_w")' }}>
          </div>
        </div>
        <h1 className="text-[#121417] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center mb-3">
          OBHelp
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed text-center max-w-[260px]">
          Apoio clínico inteligente em obstetrícia
        </p>
      </div>
      <div className="w-full bg-white dark:bg-[#1a202c] rounded-t-[2rem] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] px-6 pt-8 pb-10">
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <button
            onClick={() => navigate('/register')}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-blue-700 transition-colors text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20 active:scale-[0.98] transform duration-100"
          >
            <span className="truncate">Criar conta</span>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-transparent border-2 border-primary/20 hover:bg-primary/5 transition-colors text-primary dark:text-blue-400 text-lg font-bold leading-normal tracking-[0.015em] active:scale-[0.98] transform duration-100"
          >
            <span className="truncate">Entrar</span>
          </button>
        </div>
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Link to="/termos" className="hover:text-primary transition-colors">Termos</Link>
            <span>•</span>
            <Link to="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            © {new Date().getFullYear()} OBHelp
          </p>
        </div>
      </div>
    </div>
  );
};
