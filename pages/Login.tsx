import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/I18nContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { GraduationCap, Mail, Lock, Building2, Globe } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const Login: React.FC = () => {
  const { login, register, isLoading, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  
  // Form States
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Registration specific states
  const [institutionName, setInstitutionName] = useState('');
  const [website, setWebsite] = useState('');
  
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await login(email, password);
      // Redirect is handled by auth state change triggering Navigate
    } catch (err: any) {
      console.error(err);
      setError(err.message || t('common.error'));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await register(email, password, institutionName, website);
      setSuccessMsg(t('auth.account_created'));
      // Optional: Switch to login tab or auto-login depending on Supabase config
    } catch (err: any) {
      console.error(err);
      setError(err.message || t('common.error'));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('app.name')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">{t('auth.tab_login')}</TabsTrigger>
              <TabsTrigger value="register">{t('auth.tab_register')}</TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive text-center">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-md text-sm text-green-800 text-center dark:bg-green-900/30 dark:text-green-300">
                {successMsg}
              </div>
            )}

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      className="pl-9"
                      placeholder={t('auth.email_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      className="pl-9"
                      placeholder={t('auth.password')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                  {t('auth.submit_login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder={t('auth.institution_name')}
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        required
                      />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder={t('auth.website')}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      className="pl-9"
                      placeholder={t('auth.email_placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      className="pl-9"
                      placeholder={t('auth.password')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                  {t('auth.submit_register')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <p className="text-xs text-muted-foreground text-center mt-6">
            {t('auth.helper')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};