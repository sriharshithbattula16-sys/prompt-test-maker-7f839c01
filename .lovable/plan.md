
## Plan: Remove Total Attempts and Pending Evaluations from Faculty Dashboard

Remove the "Total Attempts" and "Pending Evaluations" stat cards from `FacultyDashboard.tsx`, change the grid from 4 columns to 2, and clean up unused variables/imports (`Users`, `AlertCircle`, `totalAttempts`, `pendingEvaluations`).

**File:** `src/pages/faculty/FacultyDashboard.tsx`
- Remove `Users` and `AlertCircle` from lucide imports
- Remove `totalAttempts` and `pendingEvaluations` variables
- Change stat grid from `lg:grid-cols-4` to `lg:grid-cols-2`
- Keep only "Total Exams" and "Active Exams" stat cards
