import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, FileText, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockExams, mockStudentPerformances } from '@/lib/mockData';
import { toast } from 'sonner';

const initialSyllabi = [
  { id: '1', name: 'Biology_Ch3_Photosynthesis.pdf', subject: 'Biology', date: '2026-02-20' },
  { id: '2', name: 'OrganicChem_Basics.pdf', subject: 'Chemistry', date: '2026-02-18' },
  { id: '3', name: 'Physics_Newton_Laws.pdf', subject: 'Physics', date: '2026-02-10' },
];

const FacultyDelete = () => {
  const [exams, setExams] = useState(mockExams.map((e) => ({ ...e })));
  const [syllabi, setSyllabi] = useState(initialSyllabi);
  const [students, setStudents] = useState(mockStudentPerformances.map((s) => ({ ...s })));

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
    toast.success('Exam deleted');
  };

  const deleteSyllabus = (id: string) => {
    setSyllabi((prev) => prev.filter((s) => s.id !== id));
    toast.success('Syllabus deleted');
  };

  const deleteStudent = (studentId: string, examId: string) => {
    setStudents((prev) => prev.filter((s) => !(s.studentId === studentId && s.examId === examId)));
    toast.success('Student record deleted');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Delete</h1>
        <p className="text-muted-foreground mt-1">Manage and remove exams, syllabi, and student records</p>
      </div>

      {/* Delete Exams */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" /> Delete Exams
        </h2>
        <div className="bg-card rounded-xl border overflow-hidden">
          {exams.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/20 transition-colors"
            >
              <div>
                <p className="font-medium text-card-foreground">{exam.title}</p>
                <p className="text-xs text-muted-foreground">{exam.subject} · {exam.status}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteExam(exam.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
          {exams.length === 0 && (
            <p className="p-6 text-center text-muted-foreground">No exams to delete</p>
          )}
        </div>
      </div>

      {/* Delete Syllabus PDFs */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent" /> Delete Syllabus PDFs
        </h2>
        <div className="bg-card rounded-xl border overflow-hidden">
          {syllabi.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/20 transition-colors"
            >
              <div>
                <p className="font-medium text-card-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.subject} · {s.date}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteSyllabus(s.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
          {syllabi.length === 0 && (
            <p className="p-6 text-center text-muted-foreground">No syllabi to delete</p>
          )}
        </div>
      </div>

      {/* Delete Student Records */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" /> Delete Student Records
        </h2>
        <div className="bg-card rounded-xl border overflow-hidden">
          {students.map((s, i) => (
            <motion.div
              key={`${s.studentId}-${s.examId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/20 transition-colors"
            >
              <div>
                <p className="font-medium text-card-foreground">{s.studentName}</p>
                <p className="text-xs text-muted-foreground">{s.email} · Score: {s.score}/{s.totalMarks}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => deleteStudent(s.studentId, s.examId)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
          {students.length === 0 && (
            <p className="p-6 text-center text-muted-foreground">No student records to delete</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDelete;
