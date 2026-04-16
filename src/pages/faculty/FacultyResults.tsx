import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockExams, mockStudentPerformances } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FacultyResults = () => {
  const evaluated = mockExams.filter((e) => e.averageScore);
  const chartData = evaluated.map((e) => ({
    name: e.title.length > 20 ? e.title.slice(0, 20) + '…' : e.title,
    avgScore: e.averageScore,
    attempts: e.attempts,
  }));

  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  const getStudents = (examId: string) =>
    mockStudentPerformances
      .filter((s) => s.examId === examId)
      .sort((a, b) => b.score - a.score);

  const toggleExpand = (examId: string) => {
    setExpandedExam(expandedExam === examId ? null : examId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Results Overview</h1>
        <p className="text-muted-foreground mt-1">View aggregated performance across all exams</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border p-6 mb-6"
      >
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Average Scores by Exam</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              />
              <Bar dataKey="avgScore" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Avg Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid gap-4">
        {evaluated.map((exam) => {
          const students = getStudents(exam.id);
          const isExpanded = expandedExam === exam.id;

          return (
            <motion.div key={exam.id} layout className="bg-card rounded-xl border overflow-hidden">
              <div className="p-5 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground">{exam.subject} · {exam.attempts} students</p>
                </div>
                <div className="text-right mr-2">
                  <p className="text-2xl font-bold text-accent">{exam.averageScore}%</p>
                  <p className="text-xs text-muted-foreground">avg score</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => toggleExpand(exam.id)}
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Result
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </Button>
              </div>

              {isExpanded && students.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t"
                >
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-card-foreground mb-3">Student Results</h4>
                    <div className="space-y-2">
                      {students.map((s, i) => {
                        const pct = Math.round((s.score / s.totalMarks) * 100);
                        return (
                          <div key={`${s.studentId}-${s.examId}`} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/20">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              i === 0 ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                            }`}>
                              {i + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-card-foreground truncate">{s.studentName}</p>
                              <p className="text-xs text-muted-foreground">{s.email}</p>
                            </div>
                            <Badge variant="secondary" className={
                              pct >= 70 ? 'bg-success/10 text-success' : pct >= 50 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                            }>
                              {s.score}/{s.totalMarks} ({pct}%)
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyResults;
