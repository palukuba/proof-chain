import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { documentService } from '../services/documentService';
import { AcademicDocument, DocumentStatus } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { truncateHash } from '../lib/utils';
import { ExternalLink, Eye } from 'lucide-react';

export const Documents: React.FC = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState<AcademicDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    setLoading(true);
    const data = await documentService.getAllDocuments();
    setDocuments(data);
    setLoading(false);
  };

  const handleMint = async (id: string) => {
    // Optimistic update
    setDocuments(docs => docs.map(d => d.id === id ? { ...d, status: DocumentStatus.MINTING } : d));
    await documentService.mintDocument(id);
    loadDocs();
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case DocumentStatus.MINTED: return <Badge variant="success">{t('status.MINTED')}</Badge>;
      case DocumentStatus.MINTING: return <Badge variant="secondary">{t('status.MINTING')}</Badge>;
      case DocumentStatus.FAILED: return <Badge variant="destructive">{t('status.FAILED')}</Badge>;
      default: return <Badge variant="outline">{t('status.DRAFT')}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{t('nav.documents')}</h2>
        <Button>{t('nav.issue')}</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('doc.title')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('doc.student')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('doc.date')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">TX</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('doc.status')}</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">{t('doc.actions')}</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {loading ? (
                  <tr><td colSpan={6} className="p-4 text-center">{t('common.loading')}</td></tr>
                ) : documents.map((doc) => (
                  <tr key={doc.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{doc.title}</td>
                    <td className="p-4 align-middle">{doc.studentName}</td>
                    <td className="p-4 align-middle">{doc.issueDate}</td>
                    <td className="p-4 align-middle text-xs font-mono text-muted-foreground">
                      {doc.transactionId ? (
                        <a href="#" className="flex items-center gap-1 hover:text-primary">
                          {truncateHash(doc.transactionId)} <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : '-'}
                    </td>
                    <td className="p-4 align-middle">{getStatusBadge(doc.status)}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        {doc.status === DocumentStatus.DRAFT && (
                          <Button size="sm" onClick={() => handleMint(doc.id)}>
                             {t('doc.mint')}
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};