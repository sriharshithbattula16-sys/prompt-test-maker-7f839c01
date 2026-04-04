export interface Exam {
  id: string;
  title: string;
  subject: string;
  type: 'mcq' | 'descriptive';
  status: 'draft' | 'active' | 'closed';
  questionCount: number;
  duration: number;
  attempts: number;
  createdAt: string;
  averageScore?: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'descriptive';
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface StudentResult {
  examId: string;
  examTitle: string;
  subject: string;
  type: 'mcq' | 'descriptive';
  totalMarks: number;
  obtainedMarks: number;
  totalQuestions: number;
  answered: number;
  correct: number;
  incorrect: number;
  skipped: number;
  submittedAt: string;
  status: 'evaluated' | 'pending';
  timeTaken?: number; // seconds
  questionResults?: {
    questionId: string;
    questionText: string;
    yourAnswer: string;
    correctAnswer?: string;
    marks: number;
    obtainedMarks: number;
    feedback?: string;
    status: 'correct' | 'incorrect' | 'partial' | 'skipped';
    topic?: string;
  }[];
}

export interface StudentPerformance {
  studentId: string;
  studentName: string;
  email: string;
  examId: string;
  score: number;
  totalMarks: number;
  submittedAt: string;
}

export const mockExams: Exam[] = [
  { id: '1', title: 'Photosynthesis - Chapter 3', subject: 'Biology', type: 'mcq', status: 'active', questionCount: 10, duration: 30, attempts: 24, createdAt: '2026-02-20', averageScore: 72 },
  { id: '2', title: 'Organic Chemistry Basics', subject: 'Chemistry', type: 'descriptive', status: 'active', questionCount: 5, duration: 60, attempts: 18, createdAt: '2026-02-18', averageScore: 65 },
  { id: '3', title: 'Newton\'s Laws of Motion', subject: 'Physics', type: 'mcq', status: 'closed', questionCount: 15, duration: 45, attempts: 32, createdAt: '2026-02-10', averageScore: 78 },
  { id: '4', title: 'Data Structures - Trees', subject: 'Computer Science', type: 'mcq', status: 'draft', questionCount: 12, duration: 40, attempts: 0, createdAt: '2026-02-25' },
];

export const mockQuestions: Question[] = [
  { id: 'q1', text: 'What is the primary pigment involved in photosynthesis?', type: 'mcq', options: ['Chlorophyll a', 'Chlorophyll b', 'Carotenoids', 'Xanthophyll'], correctAnswer: 'Chlorophyll a', marks: 2 },
  { id: 'q2', text: 'Which organelle is responsible for photosynthesis?', type: 'mcq', options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Nucleus'], correctAnswer: 'Chloroplast', marks: 2 },
  { id: 'q3', text: 'The light-dependent reactions occur in which part of the chloroplast?', type: 'mcq', options: ['Stroma', 'Thylakoid membrane', 'Outer membrane', 'Inner membrane'], correctAnswer: 'Thylakoid membrane', marks: 2 },
  { id: 'q4', text: 'What is the final electron acceptor in the light reactions?', type: 'mcq', options: ['NADP+', 'O2', 'CO2', 'H2O'], correctAnswer: 'NADP+', marks: 2 },
  { id: 'q5', text: 'Which cycle fixes carbon dioxide into organic molecules?', type: 'mcq', options: ['Krebs cycle', 'Calvin cycle', 'Citric acid cycle', 'Electron transport chain'], correctAnswer: 'Calvin cycle', marks: 2 },
];

export const mockStudentResults: StudentResult[] = [
  {
    examId: '1', examTitle: 'Photosynthesis - Chapter 3', subject: 'Biology', type: 'mcq',
    totalMarks: 20, obtainedMarks: 16, totalQuestions: 10, answered: 9, correct: 8, incorrect: 1, skipped: 1,
    submittedAt: '2026-02-21', status: 'evaluated', timeTaken: 1420,
    questionResults: [
      { questionId: 'q1', questionText: 'What is the primary pigment involved in photosynthesis?', yourAnswer: 'Chlorophyll a', correctAnswer: 'Chlorophyll a', marks: 2, obtainedMarks: 2, status: 'correct', topic: 'Pigments' },
      { questionId: 'q2', questionText: 'Which organelle is responsible for photosynthesis?', yourAnswer: 'Chloroplast', correctAnswer: 'Chloroplast', marks: 2, obtainedMarks: 2, status: 'correct', topic: 'Cell Biology' },
      { questionId: 'q3', questionText: 'The light-dependent reactions occur in which part?', yourAnswer: 'Stroma', correctAnswer: 'Thylakoid membrane', marks: 2, obtainedMarks: 0, status: 'incorrect', topic: 'Light Reactions', feedback: 'Review the structure of chloroplast — light reactions occur on the thylakoid membrane.' },
      { questionId: 'q4', questionText: 'What is the final electron acceptor?', yourAnswer: 'NADP+', correctAnswer: 'NADP+', marks: 2, obtainedMarks: 2, status: 'correct', topic: 'Light Reactions' },
      { questionId: 'q5', questionText: 'Which cycle fixes CO2?', yourAnswer: '', correctAnswer: 'Calvin cycle', marks: 2, obtainedMarks: 0, status: 'skipped', topic: 'Calvin Cycle' },
    ],
  },
  {
    examId: '2', examTitle: 'Organic Chemistry Basics', subject: 'Chemistry', type: 'descriptive',
    totalMarks: 50, obtainedMarks: 38, totalQuestions: 5, answered: 5, correct: 3, incorrect: 1, skipped: 0,
    submittedAt: '2026-02-22', status: 'evaluated', timeTaken: 3200,
    questionResults: [
      { questionId: 'dq1', questionText: 'Explain the concept of hybridization with examples.', yourAnswer: 'Hybridization is the mixing of atomic orbitals...', marks: 10, obtainedMarks: 8, status: 'partial', topic: 'Hybridization', feedback: 'Good explanation but missed sp3d hybridization examples. Consider adding PCl5 as a case study.' },
      { questionId: 'dq2', questionText: 'Describe isomerism in organic chemistry.', yourAnswer: 'Isomerism is when compounds have the same molecular formula...', marks: 10, obtainedMarks: 9, status: 'correct', topic: 'Isomerism', feedback: 'Excellent answer with clear examples.' },
    ],
  },
  {
    examId: '3', examTitle: 'Newton\'s Laws of Motion', subject: 'Physics', type: 'mcq',
    totalMarks: 30, obtainedMarks: 26, totalQuestions: 15, answered: 14, correct: 13, incorrect: 1, skipped: 1,
    submittedAt: '2026-02-15', status: 'evaluated', timeTaken: 2100,
  },
];

// Performance trend data
export const mockPerformanceTrend = [
  { exam: 'Biology', score: 80, date: '2026-01-15' },
  { exam: 'Physics', score: 87, date: '2026-01-28' },
  { exam: 'Chemistry', score: 76, date: '2026-02-10' },
  { exam: 'Biology 2', score: 85, date: '2026-02-21' },
  { exam: 'Physics 2', score: 90, date: '2026-03-05' },
];

// Student performance data for faculty drill-down
export const mockStudentPerformances: StudentPerformance[] = [
  { studentId: 's1', studentName: 'Alex Chen', email: 'alex@exam.com', examId: '1', score: 16, totalMarks: 20, submittedAt: '2026-02-21' },
  { studentId: 's2', studentName: 'Maria Garcia', email: 'maria@exam.com', examId: '1', score: 18, totalMarks: 20, submittedAt: '2026-02-21' },
  { studentId: 's3', studentName: 'James Wilson', email: 'james@exam.com', examId: '1', score: 14, totalMarks: 20, submittedAt: '2026-02-21' },
  { studentId: 's4', studentName: 'Sarah Lee', email: 'sarah@exam.com', examId: '1', score: 20, totalMarks: 20, submittedAt: '2026-02-21' },
  { studentId: 's5', studentName: 'David Kim', email: 'david@exam.com', examId: '1', score: 12, totalMarks: 20, submittedAt: '2026-02-21' },
  { studentId: 's1', studentName: 'Alex Chen', email: 'alex@exam.com', examId: '2', score: 38, totalMarks: 50, submittedAt: '2026-02-22' },
  { studentId: 's2', studentName: 'Maria Garcia', email: 'maria@exam.com', examId: '2', score: 42, totalMarks: 50, submittedAt: '2026-02-22' },
  { studentId: 's3', studentName: 'James Wilson', email: 'james@exam.com', examId: '2', score: 35, totalMarks: 50, submittedAt: '2026-02-22' },
  { studentId: 's1', studentName: 'Alex Chen', email: 'alex@exam.com', examId: '3', score: 26, totalMarks: 30, submittedAt: '2026-02-15' },
  { studentId: 's2', studentName: 'Maria Garcia', email: 'maria@exam.com', examId: '3', score: 28, totalMarks: 30, submittedAt: '2026-02-15' },
];
