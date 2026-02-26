import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  GraduationCap,
  Sparkles,
  BarChart3,
  ClipboardList,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const facultyLinks = [
  { to: '/faculty', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/faculty/generate', icon: Sparkles, label: 'Generate Exam' },
  { to: '/faculty/exams', icon: ClipboardList, label: 'Manage Exams' },
  { to: '/faculty/results', icon: BarChart3, label: 'Results' },
];

const studentLinks = [
  { to: '/student', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/student/exams', icon: BookOpen, label: 'My Exams' },
  { to: '/student/results', icon: BarChart3, label: 'Results' },
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.role === 'faculty' ? facultyLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">ExamAI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`
              }
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-foreground">
              {user?.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-card">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-bold text-foreground">ExamAI</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>

        {/* Mobile nav */}
        <nav className="md:hidden flex items-center gap-1 px-2 py-2 border-b bg-card overflow-x-auto">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <link.icon className="w-3.5 h-3.5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-8 max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
