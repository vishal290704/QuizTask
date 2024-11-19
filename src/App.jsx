import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

// components
import LandingPage from "./comps/LandingPage";
import QuizRoom from "./comps/QuizRoom";
import LocalQuizzes from "./comps/LocalQuizzes";

// admin comps
import AdminRoutes from "./comps/admin/AdminRoutes";
import CreateRoom from "./comps/admin/CreateRoom";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId" element={<QuizRoom />} />
        <Route path="/local-quizzes" element={<LocalQuizzes />} />

        {/* admin */}
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/admin" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;