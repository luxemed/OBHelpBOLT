import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';

export const Perfil = () => {
  const navigate = useNavigate();
  const { profile, signOut, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notificacoes, setNotificacoes] = useState(true);
  const [acessoOffline, setAcessoOffline] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handlePhotoClick = () => {
    setShowPhotoMenu(true);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no maximo 5MB.');
      return;
    }

    setUploading(true);
    setShowPhotoMenu(false);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao salvar a foto. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*';
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  const menuItems = [
    {
      icon: 'info',
      label: 'Sobre',
      description: 'Informações sobre o OBHelp',
      path: '/profile/sobre'
    },
    {
      icon: 'shield',
      label: 'Política de Privacidade',
      description: 'Como protegemos seus dados',
      path: '/profile/privacy'
    },
    {
      icon: 'gavel',
      label: 'Termos de Uso',
      description: 'Condições de uso do aplicativo',
      path: '/profile/terms'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fa] dark:bg-gray-900 pb-24">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {showPhotoMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowPhotoMenu(false)}>
          <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-4">Alterar foto de perfil</h3>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={openCamera}
                className="flex items-center gap-3 w-full p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
                <span className="text-gray-800 dark:text-white font-medium">Tirar foto</span>
              </button>
              
              <button
                onClick={openGallery}
                className="flex items-center gap-3 w-full p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">photo_library</span>
                </div>
                <span className="text-gray-800 dark:text-white font-medium">Escolher da galeria</span>
              </button>
            </div>
            
            <button
              onClick={() => setShowPhotoMenu(false)}
              className="w-full mt-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="w-8"></div>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Meu Perfil</h1>
        <button className="w-8 h-8 flex items-center justify-center text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-xl">edit</span>
        </button>
      </header>
      
      <main className="flex-1 px-4 pt-6 flex flex-col gap-5 max-w-lg mx-auto w-full">
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {uploading ? (
                <div className="w-8 h-8 border-3 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              ) : avatarUrl || profile?.avatar_url ? (
                <img 
                  src={avatarUrl || profile?.avatar_url} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-purple-400 text-5xl">person</span>
              )}
            </div>
            <button 
              onClick={handlePhotoClick}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-white text-sm">photo_camera</span>
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{profile?.nome || 'Usuário'}</h2>
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{profile?.especialidade || 'Profissional de Saúde'}</p>
          {isAdmin && (
            <span className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
              Administrador
            </span>
          )}
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white">admin_panel_settings</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Painel de Administração</p>
              <p className="text-xs text-purple-200">Gerenciar usuários e aprovações</p>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <h3 className="px-5 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Dados Pessoais</h3>
          
          <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-700">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-0.5">Nome Completo</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">{profile?.nome || '-'}</p>
          </div>
          
          <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-700">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-0.5">E-mail</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">{profile?.email || '-'}</p>
          </div>
          
          <div className="px-5 py-3">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-0.5">Cidade / Estado</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {profile?.cidade && profile?.estado 
                ? `${profile.cidade} - ${profile.estado}` 
                : profile?.cidade || profile?.estado || '-'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <h3 className="px-5 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Configurações</h3>
          
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">notifications</span>
              </div>
              <span className="text-sm text-gray-800 dark:text-gray-200">Notificações</span>
            </div>
            <button 
              onClick={() => setNotificacoes(!notificacoes)}
              className={`w-12 h-7 rounded-full transition-colors relative ${notificacoes ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${notificacoes ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">dark_mode</span>
              </div>
              <span className="text-sm text-gray-800 dark:text-gray-200">Modo Escuro</span>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-12 h-7 rounded-full transition-colors relative ${isDark ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isDark ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between px-5 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">wifi_off</span>
              </div>
              <span className="text-sm text-gray-800 dark:text-gray-200">Acesso Offline</span>
            </div>
            <button 
              onClick={() => setAcessoOffline(!acessoOffline)}
              className={`w-12 h-7 rounded-full transition-colors relative ${acessoOffline ? 'bg-purple-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${acessoOffline ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <h3 className="px-5 pt-4 pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Informações</h3>
          
          {menuItems.map((item, index) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index < menuItems.length - 1 ? 'border-b border-gray-50 dark:border-gray-700' : ''
              }`}
            >
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-800 dark:text-gray-200">{item.label}</p>
              </div>
              <span className="material-symbols-outlined text-gray-400 text-xl">chevron_right</span>
            </button>
          ))}
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="text-sm font-medium">Sair da conta</span>
        </button>

        <div className="py-2">
          <p className="text-xs text-gray-400 text-center">
            OBHelp v1.0.0
          </p>
        </div>
      </main>
    </div>
  );
};
