import { motion } from 'framer-motion';
import { BookOpen, Trophy, Clock, Target } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { mockExams, mockStudentResults } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const availableExams = mockExams.filter((e) => e.status === 'active');
  const totalScore = mockStudentResults.reduce((s, r) => s + r.obtainedMarks, 0);
  const totalMax = mockStudentResults.reduce((s, r) => s + r.totalMarks, 0);
  const overallPct = Math.round((totalScore / totalMax) * 100);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">Your exam dashboard at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Available Exams" value={availableExams.length} icon={BookOpen} color="accent" />
        <StatCard title="Completed" value={mockStudentResults.length} icon={Target} color="success" />
        <StatCard title="Overall Score" value={`${overallPct}%`} icon={Trophy} color="warning" />
        <StatCard title="Pending Results" value={mockStudentResults.filter((r) => r.status === 'pending').length} icon={Clock} color="info" />
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Available Exams</h2>
      <div className="grid gap-4 mb-8">
        {availableExams.map((exam, i) => (
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
                <Badge variant="secondary" className="bg-accent/10 text-accent">{exam.type.toUpperCase()}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {exam.subject} · {exam.questionCount} questions · {exam.duration} min
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => navigate(`/student/exam/${exam.id}`)}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Start Exam
            </Button>
          </motion.div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Results</h2>
      <div className="grid gap-3">
        {mockStudentResults.map((result) => (
          <div key={result.examId} className="bg-card rounded-xl border p-4 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-card-foreground">{result.examTitle}</h3>
              <p className="text-xs text-muted-foreground">{result.subject} · {result.submittedAt}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-accent">{result.obtainedMarks}/{result.totalMarks}</p>
              <p className="text-xs text-muted-foreground">{Math.round((result.obtainedMarks / result.totalMarks) * 100)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
