import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackHeader } from '../components/BackHeader';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserProfile, UserStatus } from '../lib/supabase';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'blocked'>('pending');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/home');
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar usuarios:', error);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const updateUserStatus = async (userId: string, newStatus: UserStatus) => {
    setUpdating(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', userId);

    if (error) {
      console.error('Erro ao atualizar status:', error);
    } else {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    }
    setUpdating(null);
  };

  const filteredUsers = users.filter(u => {
    if (filter === 'all') return true;
    return u.status === filter;
  });

  const getStatusBadge = (status: UserStatus) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      approved: 'bg-green-100 text-green-700',
      blocked: 'bg-red-100 text-red-700',
    };
    const labels = {
      pending: 'Pendente',
      approved: 'Aprovado',
      blocked: 'Bloqueado',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
          Admin
        </span>
      );
    }
    return null;
  };

  const pendingCount = users.filter(u => u.status === 'pending').length;

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <BackHeader title="Painel de Administracao" />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-primary">{users.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-amber-500">{pendingCount}</p>
            <p className="text-xs text-gray-500">Pendentes</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-500">{users.filter(u => u.status === 'approved').length}</p>
            <p className="text-xs text-gray-500">Aprovados</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {(['pending', 'approved', 'blocked', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              {f === 'pending' && `Pendentes (${pendingCount})`}
              {f === 'approved' && 'Aprovados'}
              {f === 'blocked' && 'Bloqueados'}
              {f === 'all' && 'Todos'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_off</span>
              <p className="text-gray-500">Nenhum usuario encontrado</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.nome || 'Sem nome'}
                      </h3>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    {user.especialidade && (
                      <p className="text-xs text-gray-400 mt-1">{user.especialidade}</p>
                    )}
                    {(user.cidade || user.estado) && (
                      <p className="text-xs text-gray-400">
                        {[user.cidade, user.estado].filter(Boolean).join(' - ')}
                      </p>
                    )}
                    <p className="text-xs text-gray-300 mt-1">
                      Cadastro: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {user.role !== 'admin' && (
                    <div className="flex flex-col gap-2">
                      {user.status !== 'approved' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'approved')}
                          disabled={updating === user.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 disabled:opacity-50"
                        >
                          {updating === user.id ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <span className="material-symbols-outlined text-sm">check</span>
                          )}
                          Aprovar
                        </button>
                      )}
                      {user.status !== 'blocked' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'blocked')}
                          disabled={updating === user.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 disabled:opacity-50"
                        >
                          {updating === user.id ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <span className="material-symbols-outlined text-sm">block</span>
                          )}
                          Bloquear
                        </button>
                      )}
                      {user.status === 'blocked' && (
                        <button
                          onClick={() => updateUserStatus(user.id, 'pending')}
                          disabled={updating === user.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white rounded-lg text-xs font-medium hover:bg-gray-600 disabled:opacity-50"
                        >
                          Reativar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={fetchUsers}
          className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
        >
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>
    </div>
  );
};
