import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// api url
const fetchQuizUrl = "/sampleAPI/responseQuiz.json";

const QuizRoom = () => {
  // data from previous page
  let { roomCode, username } = useParams();

  // states
  const [quizStatus, setStatus] = useState(false);
  const [prompt, setPrompt] = useState("Waiting for the admin to start");

  // axios fetch
  const fetchQuizStatus = async () => {
    try {
      const response = await axios.get(fetchQuizUrl);
      setStatus(response.data.status);
      if (!response.data.status) {
        setPrompt("Waiting for the admin to start");
      }
      console.log(quizStatus);
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect to restart fetch
  useEffect(() => {
    // only if quizStatus is false
    if (!quizStatus) {
      const timer = setInterval(() => {
        fetchQuizStatus();
      }, 1000);

      // clear after true
      return () => clearInterval(timer);
    }
  }, [quizStatus]);

  // initial load
  useEffect(() => {
    fetchQuizStatus();
  }, []);

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        {roomCode}
      </h1>

      {/* Navigation */}
      <Link to="/">
        <div className="absolute p-[10px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          BACK
        </div>
      </Link>

      {/* if status is false */}
      {!quizStatus ? (
        // panel
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
          <p>{prompt}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
          <div className="text-white text-lg mt-[20vh]">Quiz Loaded</div>
        </div>
      )}
    </div>
  );
};

export default QuizRoom;
