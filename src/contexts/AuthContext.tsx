import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, UserProfile, UserStatus } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  isApproved: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = 'marcio_meca@hotmail.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const initialLoadDone = useRef(false);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    return data as UserProfile;
  };

  const createProfile = async (userId: string, email: string, profileData: Partial<UserProfile>) => {
    const isFirstAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    
    const newProfile: Partial<UserProfile> = {
      id: userId,
      email: email,
      nome: profileData.nome || '',
      especialidade: profileData.especialidade || '',
      estado: profileData.estado || '',
      cidade: profileData.cidade || '',
      role: isFirstAdmin ? 'admin' : 'user',
      status: 'approved',
    };

    const { data, error } = await supabase
      .from('profiles')
      .insert(newProfile)
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar perfil:', error);
      return null;
    }
    return data as UserProfile;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        setProfile(userProfile);
      }
      
      initialLoadDone.current = true;
      setLoading(false);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        setSession(session);
        if (session?.user && !profile) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        }
        return;
      }
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setSession(null);
        return;
      }
      
      if (event === 'SIGNED_IN' && !initialLoadDone.current) {
        setLoading(true);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        let userProfile = await fetchProfile(session.user.id);
        
        if (!userProfile && event === 'SIGNED_IN') {
          userProfile = await createProfile(
            session.user.id,
            session.user.email || '',
            { nome: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '' }
          );
        }
        
        setProfile(userProfile);
      }
      
      if (!initialLoadDone.current) {
        initialLoadDone.current = true;
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: profileData.nome,
        }
      }
    });
    
    if (error) return { error: error as Error };
    
    if (data.user) {
      await createProfile(data.user.id, email, profileData);
    }
    
    return { error: null };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/home'
      }
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setSession(null);
    supabase.auth.signOut();
  };

  const isApproved = profile?.status === 'approved';
  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      isApproved,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
