// src/data/mockData.js

// Available academic years
export const years = [2021, 2022, 2023, 2024, 2025];

// Semesters list
export const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

// Exam types
export const examTypes = ["Mid-Sem", "End-Sem", "Back Paper"];

// Department list
export const departments = [
  // Arts Stream
  "English",
  "Odia",
  "History",
  "Political Science",
  "Economics",
  "Education",
  "Sociology",
  "Philosophy",
  
  // Science Stream
  "Physics",
  "Chemistry",
  "Mathematics",
  "Botany",
  "Zoology",
  
  // Commerce Stream
  "Accountancy",
  "Business Management",
  
  // Self-Finance Stream
  "BCA (Bachelor of Computer Applications)",
  "BBA "
];

// Sample papers
export const samplePapers = [
  {
    id: 1,
    title: "Data Structures Mid-Sem 2023",
    department: "Computer Science",
    subject: "Data Structures",
    year: 2023,
    semester: 3,
    exam_type: "Mid-Sem",
    uploaded_at: "2023-10-01T00:00:00Z",
    verified: true,
  },
  {
    id: 2,
    title: "Database Systems End-Sem 2022",
    department: "Computer Science",
    subject: "DBMS",
    year: 2022,
    semester: 4,
    exam_type: "End-Sem",
    uploaded_at: "2022-11-15T00:00:00Z",
    verified: false,
  },
  {
    id: 3,
    title: "Digital Electronics Back Paper 2021",
    department: "Electronics",
    subject: "Digital Electronics",
    year: 2021,
    semester: 2,
    exam_type: "Back Paper",
    uploaded_at: "2021-12-01T00:00:00Z",
    verified: true,
  },
];