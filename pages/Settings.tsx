import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { settingsService } from '../services/settingsService';
import { AppSettings } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardTitle as CardTitleUI } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Shield, Settings as SettingsIcon, Link, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsService.getSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    await settingsService.updateSettings(settings);
    setSaving(false);
  };

  if (loading || !settings) return <div className="p-6">{t('common.loading')}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h2>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t('settings.general')}</TabsTrigger>
          <TabsTrigger value="blockchain">{t('settings.blockchain')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" /> {t('settings.general')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label className="text-base">{t('settings.auto_mint')}</Label>
                   <p className="text-sm text-muted-foreground">Automatically mint NFT when a document is approved.</p>
                 </div>
                 <Switch 
                   checked={settings.autoMint} 
                   onCheckedChange={(c) => setSettings({...settings, autoMint: c})} 
                 />
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5" /> {t('settings.blockchain')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid gap-2">
                 <Label>{t('settings.network')}</Label>
                 <select 
                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                   value={settings.cardanoNetwork}
                   onChange={(e) => setSettings({...settings, cardanoNetwork: e.target.value as any})}
                 >
                   <option value="mainnet">Mainnet</option>
                   <option value="preprod">Preprod (Testnet)</option>
                   <option value="preview">Preview (Testnet)</option>
                 </select>
               </div>

               <div className="grid gap-2">
                 <Label>{t('settings.ipfs_gateway')}</Label>
                 <Input 
                   value={settings.ipfsGateway}
                   onChange={(e) => setSettings({...settings, ipfsGateway: e.target.value})}
                 />
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> {t('settings.notifications')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label className="text-base">{t('settings.email_notifs')}</Label>
                   <p className="text-sm text-muted-foreground">Receive a copy of every issued credential via email.</p>
                 </div>
                 <Switch 
                   checked={settings.emailNotifications} 
                   onCheckedChange={(c) => setSettings({...settings, emailNotifications: c})} 
                 />
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={saving}>{t('common.save')}</Button>
      </div>
    </div>
  );
};