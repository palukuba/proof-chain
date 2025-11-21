import { supabase } from './supabaseClient';
import { SchoolProfile, AppSettings } from '../types';

// Default values - used as fallback if database is not configured
// or if there's an error fetching from Supabase
const DEFAULT_PROFILE: SchoolProfile = {
  name: 'My Institution',
  website: '',
  email: '',
  address: '',
  issuerDid: ''
};

const DEFAULT_SETTINGS: AppSettings = {
  autoMint: false,
  emailNotifications: true,
  cardanoNetwork: 'preprod',
  ipfsGateway: 'https://ipfs.io/ipfs/'
};

export const settingsService = {
  async getProfile(): Promise<SchoolProfile> {
    const { data, error } = await supabase
      .from('school_profile')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error.message || error);
      return DEFAULT_PROFILE;
    }

    if (!data) return DEFAULT_PROFILE;

    return {
      name: data.name,
      website: data.website || '',
      email: data.email || '',
      address: data.address || '',
      issuerDid: data.issuer_did,
      logoUrl: data.logo_url
    };
  },

  async updateProfile(profile: SchoolProfile): Promise<SchoolProfile> {
    const payload = {
      name: profile.name,
      website: profile.website,
      email: profile.email,
      address: profile.address,
      issuer_did: profile.issuerDid,
      logo_url: profile.logoUrl
    };

    // Upsert logic: We try to update if ID exists, or insert. 
    // Since we only want one profile, we can check if one exists first.
    const { data: existing } = await supabase.from('school_profile').select('id').limit(1).maybeSingle();

    let result;
    if (existing) {
      result = await supabase.from('school_profile').update(payload).eq('id', existing.id).select().single();
    } else {
      result = await supabase.from('school_profile').insert([payload]).select().single();
    }

    if (result.error) {
      console.error('Error updating profile:', result.error.message);
      throw result.error;
    }
    return profile;
  },

  async getSettings(): Promise<AppSettings> {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching settings:', error.message || error);
      return DEFAULT_SETTINGS;
    }
    if (!data) return DEFAULT_SETTINGS;

    return {
      autoMint: data.auto_mint,
      emailNotifications: data.email_notifications,
      cardanoNetwork: data.cardano_network as any,
      ipfsGateway: data.ipfs_gateway
    };
  },

  async updateSettings(settings: AppSettings): Promise<AppSettings> {
    const payload = {
      auto_mint: settings.autoMint,
      email_notifications: settings.emailNotifications,
      cardano_network: settings.cardanoNetwork,
      ipfs_gateway: settings.ipfsGateway
    };

    const { data: existing } = await supabase.from('app_settings').select('id').limit(1).maybeSingle();

    if (existing) {
      await supabase.from('app_settings').update(payload).eq('id', existing.id);
    } else {
      await supabase.from('app_settings').insert([payload]);
    }

    return settings;
  }
};