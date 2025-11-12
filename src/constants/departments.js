// src/constants/departments.js

// Grouped departments by stream
export const departments = {
  "Arts Stream": [
    "English",
    "Odia",
    "History",
    "Political Science",
    "Economics",
    "Education",
    "Sociology",
    "Philosophy"
  ],
  "Science Stream": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Botany",
    "Zoology"
  ],
  "Commerce Stream": [
    "Accountancy",
    "Business Management"
  ],
  "Self-Finance Stream": [
    "BCA (Bachelor of Computer Applications)",
    "BBA (Bachelor of Business Administration)"
  ]
};

// Flattened array of all departments
export const allDepartments = Object.values(departments).flat();
