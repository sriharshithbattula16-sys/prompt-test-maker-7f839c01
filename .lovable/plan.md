

## Plan: Faculty Frontend Overhaul

Four areas of change across 7 files (3 new pages, 4 modified files).

---

### 1. Dashboard — Remove Recent Activity

**File:** `src/pages/faculty/FacultyDashboard.tsx`
- Delete the `recentActivity` array
- Remove the `lg:grid-cols-2` grid wrapper around Recent Exams and Recent Activity
- Delete the entire Recent Activity section
- Keep: welcome header, 2 stat cards, Recent Exams table (full width)

---

### 2. Sidebar — Remove "Manage Exams", Add "Upload Syllabus" and "Delete"

**File:** `src/components/AppLayout.tsx`
- Remove the `ClipboardList` import and the "Manage Exams" link from `facultyLinks`
- Add two new links:
  - `{ to: '/faculty/syllabus', icon: Upload, label: 'Upload Syllabus' }`
  - `{ to: '/faculty/delete', icon: Trash2, label: 'Delete' }`
- Import `Upload` and `Trash2` from lucide-react

**File:** `src/App.tsx`
- Remove the `ExamManagement` import and its route (`/faculty/exams`)
- Add two new routes under `/faculty`:
  - `<Route path="syllabus" element={<UploadSyllabus />} />`
  - `<Route path="delete" element={<FacultyDelete />} />`

---

### 3. New Page — Upload Syllabus (`src/pages/faculty/UploadSyllabus.tsx`)

A standalone page with:
- Page header: "Upload Syllabus"
- PDF upload area (drag-and-drop + file picker, PDF only)
- Upload button
- Table listing previously uploaded syllabi with columns: Name, Subject, Date — using mock data
- Each item shows file name, subject (editable or pre-set), and upload date

---

### 4. New Page — Delete (`src/pages/faculty/FacultyDelete.tsx`)

A standalone page with three sections:

1. **Delete Exams** — lists all exams from `mockExams` with a delete button beside each
2. **Delete Syllabus PDFs** — lists uploaded syllabus files with a delete button beside each
3. **Delete Student Records** — lists student performance records grouped or listed individually with a delete button

Each delete action shows a confirmation toast and removes the item from the local state.

---

### 5. Generate Exam — Remove Syllabus Upload, Add Start Time, Add Common Settings

**File:** `src/pages/faculty/GenerateExam.tsx`
- Remove the `SyllabusUpload` component and its import (lines 58-62)
- Add an "Exam Start Time" input (type `time`) beside the Duration field in the same `grid-cols-2` row
- Add a "Common Settings" section below the type toggle that applies to both MCQ and Descriptive:
  - Number of questions (input)
  - Difficulty level (dropdown: Easy / Medium / Hard)
  - Total marks (input)
  - Negative marking toggle (switch)

---

### 6. Results — Remove Top 5, Add "View Result" Button

**File:** `src/pages/faculty/FacultyResults.tsx`
- Remove the `Trophy` icon display showing the top performer in each exam card header (lines 72-77)
- Add a "View Result" button beside each exam name in the exam cards
- Clicking "View Result" expands/shows the detailed student results table (reuse existing expand logic but trigger via button instead of clicking the whole card)
- Keep the bar chart as-is

---

### Files Summary

| Action | File |
|--------|------|
| Modify | `src/pages/faculty/FacultyDashboard.tsx` |
| Modify | `src/components/AppLayout.tsx` |
| Modify | `src/App.tsx` |
| Create | `src/pages/faculty/UploadSyllabus.tsx` |
| Create | `src/pages/faculty/FacultyDelete.tsx` |
| Modify | `src/pages/faculty/GenerateExam.tsx` |
| Modify | `src/pages/faculty/FacultyResults.tsx` |

