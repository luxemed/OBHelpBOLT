import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, isApproved, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && !loading) {
      if (user && isApproved) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }
  }, [showSplash, loading, user, isApproved, navigate]);

  return (
    <div className="fixed inset-0 bg-[#3b6fb6] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <img 
          src="/logo.png" 
          alt="OBHelp Logo" 
          className="w-48 h-48 object-contain animate-pulse-slow"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/80 text-sm font-medium">
            Apoio ao raciocinio clinico em obstetricia
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
        <p className="text-white/60 text-xs">Carregando...</p>
      </div>
    </div>
  );
};
