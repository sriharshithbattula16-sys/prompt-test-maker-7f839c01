import { motion } from 'framer-motion';
import { mockExams } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FacultyResults = () => {
  const evaluated = mockExams.filter((e) => e.averageScore);
  const chartData = evaluated.map((e) => ({
    name: e.title.length > 20 ? e.title.slice(0, 20) + '…' : e.title,
    avgScore: e.averageScore,
    attempts: e.attempts,
  }));

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
        {evaluated.map((exam) => (
          <div key={exam.id} className="bg-card rounded-xl border p-5 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground">{exam.title}</h3>
              <p className="text-sm text-muted-foreground">{exam.subject} · {exam.attempts} students</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent">{exam.averageScore}%</p>
              <p className="text-xs text-muted-foreground">avg score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyResults;
