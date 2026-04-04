

## Plan: Advanced UI/UX Upgrade for Exam Genius AI

This is a large upgrade touching authentication, both dashboards, the exam experience, results, and global UI. The work is broken into 8 implementation steps.

---

### 1. Student Signup + Auth Improvements

**What changes:**
- Add a **Signup page** (`src/pages/Signup.tsx`) for students to create accounts (name, email, password). Faculty accounts remain admin-created only.
- Update `Login.tsx` with a "Create account" link for students.
- Add more mock users support in `AuthContext` — store new signups in session state.
- Add **form validation** with inline error messages (empty fields, email format, password length).
- The existing loading spinner and role toggle already work; polish animations on the form transitions.

---

### 2. Dark Mode Toggle

**What changes:**
- Create a `ThemeProvider` context (`src/contexts/ThemeContext.tsx`) that reads/writes `localStorage` and toggles a `dark` class on `<html>`.
- Add dark mode CSS variables in `src/index.css` under `.dark` selector.
- Add a **Sun/Moon toggle button** in the `AppLayout` sidebar footer and on the Login page header.

---

### 3. Student Dashboard Enhancements

**What changes:**
- Add a **performance trend line chart** (Recharts `LineChart`) showing score % over time across exams.
- Add a **progress bar** for overall accuracy.
- Add **skeleton loaders** (using shadcn Skeleton component) that show briefly before mock data "loads."
- Recent results cards already exist; enhance with color-coded score badges (green >70%, yellow 50-70%, red <50%).

---

### 4. Exam Experience — MCQ Mode Overhaul

**What changes in `AttemptExam.tsx`:**
- Add a **sidebar panel** (desktop) / **bottom drawer** (mobile) showing all question numbers, color-coded:
  - Green = answered
  - Red = unanswered
  - Yellow = marked for review
- Add a **"Mark for Review"** status distinct from flagged (rename current flag to review).
- **Auto-save** answers to `sessionStorage` on every change, restore on page reload.
- **Fullscreen mode** toggle using `document.documentElement.requestFullscreen()`.
- **beforeunload warning** to prevent accidental navigation away.
- Auto-submit on timer expiry already works; keep it.
- **Keyboard navigation**: Left/Right arrow keys for prev/next question.

---

### 5. Exam Experience — Descriptive Mode Enhancements

**What changes in `AttemptExam.tsx`:**
- Add **word count indicator** below the textarea.
- Add **image upload preview** — show a thumbnail of the uploaded image before submit.
- **Auto-save draft** to sessionStorage every 5 seconds.
- Keep the timer and submit flow the same.

---

### 6. Faculty Dashboard + Syllabus Upload

**What changes:**
- **FacultyDashboard.tsx**: Add a "pending evaluations" stat card. Add recent activity feed.
- **GenerateExam.tsx**: Add a **drag-and-drop syllabus upload zone** at the top with file preview (name, size, date, delete button). The upload is optional — faculty can skip if syllabus was already uploaded. Store uploaded file info in component state (mock).
- Add **edit question modal** — clicking the edit icon on a generated question opens a dialog to modify question text, options, and correct answer.
- Add a duration input for all exam types (not just descriptive).

---

### 7. Results Page Upgrades

**Student (`StudentResults.tsx`):**
- Add **time taken** display.
- Add **AI suggestions/feedback** section for descriptive exams.
- Already has pie chart and bar chart; add topic-wise performance grouping if topic data exists.

**Faculty (`FacultyResults.tsx`):**
- Add **top performers** list per exam.
- Add **individual student drill-down** — click an exam to see per-student scores.
- For descriptive exams, show AI evaluation output alongside student answers.

---

### 8. Global Polish + Code Quality

**What changes:**
- Create `src/services/api.ts` — centralized API service file with functions for `generateQuestions()`, `evaluateAnswers()`, `login()`, `signup()`. Currently mock, but structured for n8n webhook swap.
- Create reusable components:
  - `SkeletonCard` — reusable skeleton loader
  - `ExamTimer` — extracted timer component
  - `QuestionNavigator` — extracted question sidebar
- Add **toast notifications** (already using sonner + useToast) — ensure all actions show feedback.
- Ensure **responsive design** on all new components.
- Add **smooth page transitions** via framer-motion `AnimatePresence` on route changes.

---

### Technical Details

**Files to create:**
- `src/pages/Signup.tsx`
- `src/contexts/ThemeContext.tsx`
- `src/services/api.ts`
- `src/components/ExamTimer.tsx`
- `src/components/QuestionNavigator.tsx`
- `src/components/SkeletonCard.tsx`
- `src/components/SyllabusUpload.tsx`
- `src/components/EditQuestionDialog.tsx`
- `src/components/ThemeToggle.tsx`

**Files to modify:**
- `src/index.css` — dark mode variables
- `src/App.tsx` — add signup route, wrap with ThemeProvider
- `src/contexts/AuthContext.tsx` — add signup function
- `src/components/AppLayout.tsx` — add theme toggle, mobile improvements
- `src/pages/Login.tsx` — add signup link, polish
- `src/pages/student/AttemptExam.tsx` — sidebar, fullscreen, auto-save, keyboard nav, word count, image preview
- `src/pages/student/StudentDashboard.tsx` — trend chart, skeletons
- `src/pages/student/StudentResults.tsx` — time taken, feedback
- `src/pages/faculty/FacultyDashboard.tsx` — pending evaluations
- `src/pages/faculty/GenerateExam.tsx` — syllabus upload, edit dialog, duration
- `src/pages/faculty/FacultyResults.tsx` — top performers, drill-down
- `src/lib/mockData.ts` — add more mock data for trends, topics, student lists

