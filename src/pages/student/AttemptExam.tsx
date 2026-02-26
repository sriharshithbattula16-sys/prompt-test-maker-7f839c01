import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockExams, mockQuestions } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Flag, ChevronLeft, ChevronRight, Upload, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AttemptExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const exam = mockExams.find((e) => e.id === examId);
  const questions = mockQuestions;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 30) * 60);

  const handleSubmit = useCallback(() => {
    toast({ title: 'Exam submitted!', description: exam?.type === 'mcq' ? 'Your results are ready.' : 'Your answers are being evaluated by AI.' });
    navigate('/student/results');
  }, [exam, navigate, toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  if (!exam) return <p className="text-foreground">Exam not found</p>;

  const q = questions[current];
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">{exam.title}</h1>
          <p className="text-sm text-muted-foreground">{exam.subject} · {exam.type.toUpperCase()}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${timeLeft < 300 ? 'bg-destructive/10 text-destructive' : 'bg-muted text-foreground'}`}>
          <Clock className="w-4 h-4" />
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      </div>

      {/* Question navigator */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
              i === current
                ? 'bg-accent text-accent-foreground'
                : answers[questions[i].id]
                ? 'bg-success/10 text-success border border-success/30'
                : flagged.has(questions[i].id)
                ? 'bg-warning/10 text-warning border border-warning/30'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <motion.div
        key={current}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-xl border p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Question {current + 1} of {questions.length} · {q.marks} marks</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFlag}
            className={flagged.has(q.id) ? 'text-warning' : 'text-muted-foreground'}
          >
            <Flag className="w-4 h-4 mr-1" />
            {flagged.has(q.id) ? 'Flagged' : 'Flag'}
          </Button>
        </div>

        <p className="text-lg text-foreground font-medium mb-6">{q.text}</p>

        {q.type === 'mcq' && q.options ? (
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  answers[q.id] === opt
                    ? 'bg-accent/10 border-accent text-accent font-medium'
                    : 'bg-muted/30 border-border text-foreground hover:bg-muted/50'
                }`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <Textarea
              placeholder="Type your answer here..."
              value={answers[q.id] || ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
              rows={6}
              className="resize-none"
            />
            <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
              <Upload className="w-3.5 h-3.5" /> Upload handwritten answer
            </Button>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        {current === questions.length - 1 ? (
          <Button onClick={handleSubmit} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="w-4 h-4" /> Submit Exam
          </Button>
        ) : (
          <Button
            onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttemptExam;
