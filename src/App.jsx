import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DepartmentsPage from "./pages/DepartmentsPage";
import PapersPage from "./pages/PapersPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AfterLogin from "./pages/AfterLogin";

import { departments } from "./data/mockData";

// Convex hooks (future use)
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    department: "",
    year: "",
    semester: "",
    exam_type: "",
  });

  // Clerk user context
  const { user } = useUser();
  const currentUser = user;

  // Paper data (static for now)
  const papers = [];

  // Filter logic
  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = !filters.department || paper.department === filters.department;
    const matchesYear = !filters.year || paper.year?.toString() === filters.year;
    const matchesSem = !filters.semester || paper.semester?.toString() === filters.semester;
    const matchesExamType = !filters.exam_type || paper.exam_type === filters.exam_type;

    return matchesSearch && matchesDept && matchesYear && matchesSem && matchesExamType;
  });

  // Admin email check
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "nccareofficial@gmail.com";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#070B26] via-[#0F153A] to-[#111642]">
      <Header />

      <main className="flex-grow">
        <Routes>

          {/* Public Routes */}
          <Route
            path="/"
            element={<HomePage papers={papers} departments={departments} user={currentUser} />}
          />
          <Route
            path="/departments"
            element={<DepartmentsPage papers={papers} filters={filters} setFilters={setFilters} />}
          />
          <Route
            path="/papers"
            element={
              <PapersPage
                filteredPapers={filteredPapers}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filters={filters}
                setFilters={setFilters}
              />
            }
          />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/after-login" element={<AfterLogin />} />

          {/* Protected Routes (Clerk required) */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <StudentDashboard />
              </SignedIn>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <SignedIn>
                {isAdmin ? <AdminDashboard /> : <div className="p-10 text-white">Access Denied</div>}
              </SignedIn>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* SignedOut users redirected */}
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>

      <Footer />
    </div>
  );
}

export default App;
