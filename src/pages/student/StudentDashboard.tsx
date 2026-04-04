import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import SkeletonCard from '@/components/SkeletonCard';
import { mockExams, mockStudentResults, mockPerformanceTrend } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const availableExams = mockExams.filter((e) => e.status === 'active');
  const totalScore = mockStudentResults.reduce((s, r) => s + r.obtainedMarks, 0);
  const totalMax = mockStudentResults.reduce((s, r) => s + r.totalMarks, 0);
  const overallPct = Math.round((totalScore / totalMax) * 100);
  const totalCorrect = mockStudentResults.reduce((s, r) => s + r.correct, 0);
  const totalQuestions = mockStudentResults.reduce((s, r) => s + r.totalQuestions, 0);
  const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

  const getScoreBadge = (pct: number) => {
    if (pct >= 70) return 'bg-success/10 text-success';
    if (pct >= 50) return 'bg-warning/10 text-warning';
    return 'bg-destructive/10 text-destructive';
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} lines={2} />)}
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} lines={3} />)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.username || user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-muted-foreground mt-1">Your exam dashboard at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Available Exams" value={availableExams.length} icon={BookOpen} color="accent" />
        <StatCard title="Completed" value={mockStudentResults.length} icon={Target} color="success" />
        <StatCard title="Overall Score" value={`${overallPct}%`} icon={Trophy} color="warning" />
        <StatCard title="Pending Results" value={mockStudentResults.filter((r) => r.status === 'pending').length} icon={Clock} color="info" />
      </div>

      {/* Accuracy Progress */}
      <div className="bg-card rounded-xl border p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="font-semibold text-card-foreground">Overall Accuracy</span>
          </div>
          <span className="text-lg font-bold text-accent">{accuracy}%</span>
        </div>
        <Progress value={accuracy} className="h-2" />
      </div>

      {/* Performance Trend */}
      <div className="bg-card rounded-xl border p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Performance Trend</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="exam" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
        {mockStudentResults.map((result) => {
          const pct = Math.round((result.obtainedMarks / result.totalMarks) * 100);
          return (
            <motion.div
              key={result.examId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-xl border p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">{result.examTitle}</h3>
                <p className="text-xs text-muted-foreground">{result.subject} · {result.submittedAt}</p>
              </div>
              <Badge variant="secondary" className={getScoreBadge(pct)}>{pct}%</Badge>
              <div className="text-right">
                <p className="text-lg font-bold text-accent">{result.obtainedMarks}/{result.totalMarks}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentDashboard;
