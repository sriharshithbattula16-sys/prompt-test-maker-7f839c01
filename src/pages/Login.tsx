import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await login(email, password, role);
      navigate(role === 'faculty' ? '/faculty' : '/student');
    } catch {
      toast({ title: 'Login failed', description: 'Invalid email, password, or role.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-8 shadow-glow">
            <GraduationCap className="w-9 h-9 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            AI-Powered Examination Platform
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Generate intelligent question papers, automate evaluations, and gain deep insights into student performance — all powered by AI.
          </p>
          <div className="mt-10 space-y-4">
            {[
              'AI question generation from natural language prompts',
              'Automated descriptive answer evaluation',
              'Rich analytics and performance dashboards',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-primary-foreground/80 text-sm">{feat}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ExamAI</span>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          {/* Role Toggle */}
          <div className="flex gap-3 mb-8">
            {(['student', 'faculty'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                  role === r
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-card text-muted-foreground hover:border-muted-foreground/30'
                }`}
              >
                {r === 'student' ? <BookOpen className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                <span className="capitalize">{r}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === 'faculty' ? 'faculty@exam.com' : 'student@exam.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Faculty: faculty@exam.com / faculty123</p>
              <p>Student: student@exam.com / student123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
