import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/I18nContext';
import { studentService } from '../services/studentService';
import { Student } from '../types';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

export const Students: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">{t('students.list_title')}</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('students.col_id')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('students.col_name')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('students.col_email')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('students.col_program')}</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('students.col_year')}</th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">{t('doc.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="p-4 text-center">{t('common.loading')}</td></tr>
                ) : students.map((s) => (
                  <tr key={s.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{s.studentId}</td>
                    <td className="p-4 align-middle">{s.firstName} {s.lastName}</td>
                    <td className="p-4 align-middle">{s.email}</td>
                    <td className="p-4 align-middle">{s.program}</td>
                    <td className="p-4 align-middle">{s.graduationYear}</td>
                    <td className="p-4 align-middle text-right">
                      <Button size="sm" variant="ghost" onClick={() => navigate(`/students/${s.id}`)}>
                        <Eye className="h-4 w-4 mr-2" /> {t('students.view_details')}
                      </Button>
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