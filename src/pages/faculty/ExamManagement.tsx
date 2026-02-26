import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockExams } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const statusColors: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  active: 'bg-success/10 text-success',
  closed: 'bg-destructive/10 text-destructive',
};

const ExamManagement = () => {
  const [exams, setExams] = useState(mockExams);
  const { toast } = useToast();

  const closeExam = (id: string) => {
    setExams((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'closed' as const } : e))
    );
    toast({ title: 'Exam closed' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Manage Exams</h1>
        <p className="text-muted-foreground mt-1">View and manage all your created exams</p>
      </div>

      <div className="grid gap-4">
        {exams.map((exam, i) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-card-foreground">{exam.title}</h3>
                <Badge variant="secondary" className={statusColors[exam.status]}>{exam.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {exam.subject} · {exam.type.toUpperCase()} · {exam.questionCount} questions · {exam.duration} min
              </p>
              <p className="text-xs text-muted-foreground mt-1">{exam.attempts} attempts · Created {exam.createdAt}</p>
            </div>
            {exam.status === 'active' && (
              <Button variant="outline" size="sm" onClick={() => closeExam(exam.id)} className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10">
                <XCircle className="w-3.5 h-3.5" /> Close
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExamManagement;
