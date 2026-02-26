import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockStudentResults } from '@/lib/mockData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

const COLORS = ['hsl(152, 60%, 40%)', 'hsl(0, 72%, 51%)', 'hsl(215, 15%, 70%)'];

const StudentResults = () => {
  const [selectedExam, setSelectedExam] = useState(mockStudentResults[0]);

  const pieData = [
    { name: 'Correct', value: selectedExam.correct },
    { name: 'Incorrect', value: selectedExam.incorrect },
    { name: 'Skipped', value: selectedExam.skipped },
  ];

  const barData = selectedExam.questionResults?.map((qr, i) => ({
    name: `Q${i + 1}`,
    obtained: qr.obtainedMarks,
    total: qr.marks,
  }));

  const pct = Math.round((selectedExam.obtainedMarks / selectedExam.totalMarks) * 100);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">My Results</h1>
        <p className="text-muted-foreground mt-1">Detailed performance analytics</p>
      </div>

      {/* Exam selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {mockStudentResults.map((r) => (
          <button
            key={r.examId}
            onClick={() => setSelectedExam(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedExam.examId === r.examId
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {r.examTitle}
          </button>
        ))}
      </div>

      {/* Score summary */}
      <motion.div
        key={selectedExam.examId}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-card rounded-xl border p-4 text-center">
          <p className="text-3xl font-bold text-accent">{pct}%</p>
          <p className="text-xs text-muted-foreground mt-1">Overall Score</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center">
          <p className="text-3xl font-bold text-card-foreground">{selectedExam.obtainedMarks}/{selectedExam.totalMarks}</p>
          <p className="text-xs text-muted-foreground mt-1">Marks</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center">
          <p className="text-3xl font-bold text-card-foreground">{selectedExam.answered}/{selectedExam.totalQuestions}</p>
          <p className="text-xs text-muted-foreground mt-1">Answered</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center">
          <p className="text-3xl font-bold text-success">{Math.round((selectedExam.correct / selectedExam.totalQuestions) * 100)}%</p>
          <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {barData && (
          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-semibold text-card-foreground mb-4">Question-wise Performance</h3>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Total" />
                  <Bar dataKey="obtained" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Obtained" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="bg-card rounded-xl border p-6">
          <h3 className="font-semibold text-card-foreground mb-4">Answer Breakdown</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Question breakdown */}
      {selectedExam.questionResults && (
        <div>
          <h3 className="font-semibold text-foreground mb-4">Question Breakdown</h3>
          <div className="space-y-3">
            {selectedExam.questionResults.map((qr, i) => (
              <div key={qr.questionId} className="bg-card rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {qr.status === 'correct' && <CheckCircle className="w-5 h-5 text-success" />}
                    {qr.status === 'incorrect' && <XCircle className="w-5 h-5 text-destructive" />}
                    {qr.status === 'skipped' && <MinusCircle className="w-5 h-5 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">Q{i + 1}. {qr.questionText}</p>
                    <div className="mt-2 space-y-1 text-xs">
                      {qr.yourAnswer && <p className="text-muted-foreground">Your answer: <span className="text-foreground">{qr.yourAnswer}</span></p>}
                      {qr.correctAnswer && qr.status !== 'correct' && (
                        <p className="text-success">Correct answer: {qr.correctAnswer}</p>
                      )}
                      {qr.feedback && <p className="text-info mt-1">{qr.feedback}</p>}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">{qr.obtainedMarks}/{qr.marks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
