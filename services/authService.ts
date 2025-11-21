import { supabase } from './supabaseClient';
import { UserProfile } from '../types';

export const authService = {
  // Connexion par Email/Mot de passe
  async signIn(email: string, password?: string) {
    if (!password) {
      throw new Error("Password is required");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Inscription avec métadonnées de l'institution
  async signUp(email: string, password: string, institutionName: string, website: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          institution_name: institutionName,
          website: website,
        }
      }
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) return null;

    // Fetch user role from database
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    // Map Supabase User to our UserProfile type
    return {
      id: user.id,
      email: user.email,
      role: (roleData?.role as 'admin' | 'editor' | 'viewer') || 'viewer',
      displayName: user.user_metadata?.institution_name || user.email.split('@')[0],
      institutionName: user.user_metadata?.institution_name,
      website: user.user_metadata?.website,
    };
  }
};