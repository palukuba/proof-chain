import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/I18nContext';
import { studentService } from '../services/studentService';
import { documentService } from '../services/documentService';
import { Student, AcademicDocument } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, User, Mail, BookOpen, Calendar, Award } from 'lucide-react';

export const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [student, setStudent] = useState<Student | null>(null);
  const [docs, setDocs] = useState<AcademicDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const studentData = await studentService.getStudentById(id);
      if (studentData) {
        setStudent(studentData);
        // Filter docs for this student (mock filter)
        const allDocs = await documentService.getAllDocuments();
        // In a real app we would query by student ID
        // For mock, just randomly assign if ID matches logic or show all for demo
        setDocs(allDocs); 
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">{t('common.loading')}</div>;
  if (!student) return <div className="p-6">Student not found</div>;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="pl-0 hover:pl-2 transition-all">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>

      <div className="flex justify-between items-start">
         <h2 className="text-3xl font-bold tracking-tight">{t('students.details_title')}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-primary" />
             </div>
             <CardTitle>{student.firstName} {student.lastName}</CardTitle>
             <p className="text-sm text-muted-foreground">{student.studentId}</p>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-3">
               <Mail className="h-4 w-4 text-muted-foreground" />
               <span className="text-sm">{student.email}</span>
             </div>
             <div className="flex items-center gap-3">
               <BookOpen className="h-4 w-4 text-muted-foreground" />
               <span className="text-sm">{student.program}</span>
             </div>
             <div className="flex items-center gap-3">
               <Calendar className="h-4 w-4 text-muted-foreground" />
               <span className="text-sm">Class of {student.graduationYear}</span>
             </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('students.issued_docs')}</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {docs.length === 0 ? (
                  <p className="text-muted-foreground">No documents issued yet.</p>
                ) : (
                  docs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                          <Award className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.issueDate}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{doc.status}</Badge>
                    </div>
                  ))
                )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};