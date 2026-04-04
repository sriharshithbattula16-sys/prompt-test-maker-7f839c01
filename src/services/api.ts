import { Question, mockQuestions } from '@/lib/mockData';

// Centralized API service — currently mock, structured for n8n webhook swap.
// Replace the URLs and remove setTimeout when connecting to real endpoints.

const N8N_GENERATE_URL = '/api/generate'; // placeholder
const N8N_EVALUATE_URL = '/api/evaluate'; // placeholder

export async function generateQuestions(prompt: string, examType: 'mcq' | 'descriptive'): Promise<Question[]> {
  // Simulate n8n webhook
  await new Promise((r) => setTimeout(r, 2500));
  // In production: return fetch(N8N_GENERATE_URL, { method: 'POST', body: JSON.stringify({ prompt, examType }) }).then(r => r.json())
  return mockQuestions;
}

export async function evaluateAnswers(
  examId: string,
  answers: Record<string, string>,
  _images?: Record<string, File>
): Promise<{ marks: number; feedback: string }[]> {
  await new Promise((r) => setTimeout(r, 2000));
  return Object.keys(answers).map(() => ({
    marks: Math.floor(Math.random() * 3),
    feedback: 'Good attempt. Consider elaborating on key concepts.',
  }));
}

export async function loginUser(email: string, password: string, role: string) {
  await new Promise((r) => setTimeout(r, 800));
  return { token: 'mock-jwt-token', role };
}

export async function signupUser(name: string, email: string, password: string) {
  await new Promise((r) => setTimeout(r, 1000));
  return { id: crypto.randomUUID(), name, email, role: 'student' as const };
}
