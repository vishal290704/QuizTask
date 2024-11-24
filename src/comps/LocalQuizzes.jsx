import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// api url
const offlineList = "/sampleAPI/localQuiz.json";

const LocalQuizzes = () => {
  // states
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(true);

  // fetch
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(offlineList);
      setQuizzes(response.data.quizzes || []);
      setLoading(false);
      console.log("req");
    } catch (error) {
      console.error("Error fetching quizzes:", error.message);
      setLoading(false);
      console.log("api");
    }
  };

  // initial load
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    // main rendering div function
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title */}

      <div>
        <h1 className="text-[5vw] pt-2 md:text-[3em] my-0 text-center font-bold text-white [text-shadow:0_0_10px_black]">
          Local Quizzes
        </h1>
      </div>

      {/* HOME */}
      <Link to="/">
        <div className="absolute p-[12px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          BACK
        </div>
      </Link>

      {/* Quizzes List */}
      <div className="flex flex-col items-center mx-auto py-6 px-3 justify-center mt-[6vh] w-[80%] max-w-4xl bg-[rgba(0,0,0,0.2)] rounded-xl shadow-md">
        {loading ? (
          <p className="text-white text-lg">Local Quizzes.</p>
        ) : quizzes.length > 0 ? (
          <ul className="w-full space-y-6">
            {quizzes.map((quiz, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-4 px-6 bg-[rgba(255,255,255,0.1)] rounded-lg m-0 shadow-md"
              >
                <div className="text-white">
                  <p className="text-2xl font-bold">{quiz.title}</p>
                  <p className="text-md">Category: {quiz.category}</p>
                </div>
                <Link
                  // to={`/quiz/${quiz.quizKey}`}
                  to={`/room/${"local"}/${quiz.category}/${"web"}/${
                    quiz.title
                  }`}
                  className="text-white"
                >
                  <button className="py-2 px-4 bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.3)] text-white font-bold rounded-lg">
                    Join Quiz
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white text-lg">No quizzes available...</p>
        )}
      </div>
    </div>
  );
};

export default LocalQuizzes;
