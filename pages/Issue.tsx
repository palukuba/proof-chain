import React, { useState } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { documentService } from '../services/documentService';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export const Issue: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    studentName: '',
    studentId: '',
    issueDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await documentService.createDocument(formData);
      navigate(ROUTES.DOCUMENTS);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t('nav.issue')}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t('doc.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">{t('doc.title')}</label>
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">{t('doc.student')}</label>
                <Input 
                  placeholder="Student Name" 
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Student ID</label>
                <Input 
                  placeholder="ID12345" 
                  value={formData.studentId}
                  onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">{t('doc.date')}</label>
                <Input 
                  type="date" 
                  value={formData.issueDate}
                  onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                  required 
                />
              </div>

               <div className="space-y-2">
                <label className="text-sm font-medium leading-none">{t('doc.upload')} (PDF)</label>
                <Input type="file" accept=".pdf" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" isLoading={loading}>
                {t('common.save')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};