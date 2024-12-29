import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

// components
import LandingPage from "./comps/LandingPage";
import QuizRoom from "./comps/QuizRoom";
import LocalQuizzes from "./comps/LocalQuizzes";
import Result from "./comps/Result";


// admin comps
import AdminRoutes from "./comps/admin/AdminRoutes";
import CreateQuiz from "./comps/admin/CreateQuiz";
import QuizControl from "./comps/admin/QuizControl";
import Register from "./comps/admin/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:quizType/:roomCode/:username/:title" element={<QuizRoom />} />
        <Route path="/local-quiz" element={<LocalQuizzes />} />
        <Route path="/results/:scor/:correctAns/:streak/:incorrectAns/:username/:roomCode" element={<Result/>} />

        {/* admin */}
        <Route path="/admin/create" element={<CreateQuiz />} />
        <Route path="/admin" element={<AdminRoutes />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/quiz-control" element={<QuizControl />} />
      </Routes>
    </Router>
  );
}

export default App;
