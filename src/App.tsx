import CivicReportingLandingPage from "./page";
import { Routes, Route } from "react-router-dom";

import IssueForm from "./components/forms/issueForm";
import LoginPage from "./components/forms/login";
import SignUpForm from "./components/forms/signUp";
import AdminDashboard from "./components/pages/admin";
import ClientDashboard from "./components/pages/client";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CivicReportingLandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/issue" element={<IssueForm />} />
      <Route path="/Signup" element={<SignUpForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/client" element={<ClientDashboard />} />
      <Route path="*" element={<CivicReportingLandingPage />} />
    </Routes>
  );
}

export default App;
