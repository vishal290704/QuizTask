import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

// Results Page Component
const QuizResults = () => {
  const location = useLocation();
  const { score, correctAns, streak, incorrectAns, roomcode, username } =
    location.state || {};

  console.log(location.state);

  useEffect(() => {
    document.title = `Results - QuizSutra`;
  }, []);

  return (
    <div className="flex-col p-0 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      <Link to="/">
        <div className="absolute p-[12px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          HOME
        </div>
      </Link>

      {/* Title */}
      <h1 className="text-[5vh] my-0 py-20 text-center font-bold text-white [text-shadow:0_0_10px_black]">
        Quiz Completed
      </h1>

      {/* Result panel */}
      <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[3vh] w-[90%] sm:w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
        <FontAwesomeIcon
          icon={faTrophy}
          className="text-yellow-500 text-6xl mb-4"
        />

        <h1>Quiz Results</h1>
        <p>Score: {score}</p>
        <p>Correct Answers: {correctAns}</p>
        <p>Streak: {streak}</p>
        <p>Incorrect Answers: {incorrectAns}</p>

        {/* Navigation */}
        <Link to="/">
          <div className="p-[12px] font-bold text-white mt-10 bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
            BACK TO HOME
          </div>
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
