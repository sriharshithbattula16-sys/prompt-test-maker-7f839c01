export interface Exam {
  id: string;
  title: string;
  subject: string;
  type: 'mcq' | 'descriptive';
  status: 'draft' | 'active' | 'closed';
  questionCount: number;
  duration: number; // minutes
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
  questionResults?: {
    questionId: string;
    questionText: string;
    yourAnswer: string;
    correctAnswer?: string;
    marks: number;
    obtainedMarks: number;
    feedback?: string;
    status: 'correct' | 'incorrect' | 'partial' | 'skipped';
  }[];
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
    submittedAt: '2026-02-21', status: 'evaluated',
    questionResults: [
      { questionId: 'q1', questionText: 'What is the primary pigment involved in photosynthesis?', yourAnswer: 'Chlorophyll a', correctAnswer: 'Chlorophyll a', marks: 2, obtainedMarks: 2, status: 'correct' },
      { questionId: 'q2', questionText: 'Which organelle is responsible for photosynthesis?', yourAnswer: 'Chloroplast', correctAnswer: 'Chloroplast', marks: 2, obtainedMarks: 2, status: 'correct' },
      { questionId: 'q3', questionText: 'The light-dependent reactions occur in which part?', yourAnswer: 'Stroma', correctAnswer: 'Thylakoid membrane', marks: 2, obtainedMarks: 0, status: 'incorrect' },
      { questionId: 'q4', questionText: 'What is the final electron acceptor?', yourAnswer: 'NADP+', correctAnswer: 'NADP+', marks: 2, obtainedMarks: 2, status: 'correct' },
      { questionId: 'q5', questionText: 'Which cycle fixes CO2?', yourAnswer: '', correctAnswer: 'Calvin cycle', marks: 2, obtainedMarks: 0, status: 'skipped' },
    ],
  },
  {
    examId: '2', examTitle: 'Organic Chemistry Basics', subject: 'Chemistry', type: 'descriptive',
    totalMarks: 50, obtainedMarks: 38, totalQuestions: 5, answered: 5, correct: 3, incorrect: 1, skipped: 0,
    submittedAt: '2026-02-22', status: 'evaluated',
  },
  {
    examId: '3', examTitle: 'Newton\'s Laws of Motion', subject: 'Physics', type: 'mcq',
    totalMarks: 30, obtainedMarks: 26, totalQuestions: 15, answered: 14, correct: 13, incorrect: 1, skipped: 1,
    submittedAt: '2026-02-15', status: 'evaluated',
  },
];
