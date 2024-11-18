import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

// components
import LandingPage from "./comps/LandingPage";
import QuizRoom from "./comps/QuizRoom";
import CreateQuiz from "./comps/CreateQuiz";
import LocalQuizzes from "./comps/LocalQuizzes";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/room/:roomId" element={<QuizRoom />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/local-quizzes" element={<LocalQuizzes />} />
      </Routes>
    </Router>
  );
}

export default App;