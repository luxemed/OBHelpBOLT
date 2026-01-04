import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const hideNav = ['/', '/login', '/register', '/forgot-password', '/termos', '/privacidade', '/pending-approval', '/welcome'];
  const showNav = !hideNav.includes(location.pathname);

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#1a202c] border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto">
        <button onClick={() => navigate('/home')} className={`flex flex-col items-center justify-center gap-1 w-16 group ${isActive('/home') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
          <span className={`material-symbols-outlined text-[26px] ${isActive('/home') ? 'filled' : ''}`}>home</span>
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button onClick={() => navigate('/favorites')} className={`flex flex-col items-center justify-center gap-1 w-16 group ${isActive('/favorites') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
          <span className={`material-symbols-outlined text-[26px] ${isActive('/favorites') ? 'filled' : ''}`}>bookmark</span>
          <span className="text-[10px] font-medium">Favoritos</span>
        </button>
        <button onClick={() => navigate('/profile')} className={`flex flex-col items-center justify-center gap-1 w-16 group ${isActive('/profile') ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}>
          <span className={`material-symbols-outlined text-[26px] ${isActive('/profile') ? 'filled' : ''}`}>person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </nav>
  );
};
