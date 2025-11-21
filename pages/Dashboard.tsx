import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Clock, Users, Activity } from 'lucide-react';
import { documentService } from '../services/documentService';
import { AcademicDocument, DocumentStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ total: 0, pending: 0, minted: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const docs = await documentService.getAllDocuments();
      setStats({
        total: docs.length,
        pending: docs.filter(d => d.status === DocumentStatus.DRAFT).length,
        minted: docs.filter(d => d.status === DocumentStatus.MINTED).length
      });
    };
    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t('nav.dashboard')}</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('dashboard.total_minted')} value={stats.minted} icon={FileText} color="bg-blue-500" />
        <StatCard title={t('dashboard.pending')} value={stats.pending} icon={Clock} color="bg-yellow-500" />
        <StatCard title={t('dashboard.students')} value="1,240" icon={Users} color="bg-green-500" />
        <StatCard title="Block Height" value="9,234,123" icon={Activity} color="bg-purple-500" />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Diploma Issued - Student #{1000 + i}</p>
                    <p className="text-xs text-muted-foreground">Cardano Tx: addr1...xyz</p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground">
                    2h ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};