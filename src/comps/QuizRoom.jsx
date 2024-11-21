import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// api url
const fetchQuizUrl = "/sampleAPI/responseQuiz.json";

const QuizRoom = () => {
  // data from previous page
  let { roomCode, username } = useParams();

  useEffect(() => {
    document.title = `${roomCode} - QuizSutra`;
  }, []);

  // states
  const [quizStatus, setStatus] = useState(false);
  const [prompt, setPrompt] = useState("Waiting for the admin to start");
  let [loadedTitle, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // question countdown default to 10 second

  // axios fetch
  const fetchQuizStatus = async () => {
    try {
      const response = await axios.get(fetchQuizUrl);
      setStatus(response.data.status);
      setTitle(response.data.quizTitle);
      if (response.data.status) {
        setQuestions(response.data.questions);
      } else {
        setPrompt("Waiting for the admin to start");
      }
      console.log(quizStatus);
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect to restart fetch
  useEffect(() => {
    // if status is false
    if (!quizStatus) {
      const timer = setInterval(() => {
        fetchQuizStatus();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStatus]);

  // initial load
  useEffect(() => {
    fetchQuizStatus();
  }, []);

  // Automatically change questions and reset time
  useEffect(() => {
    if (quizStatus && questions.length > 0) {
      const questionTimer = setInterval(() => {
        setCurrentQuestionIndex(
          (prevIndex) => (prevIndex + 1) % questions.length
        );
        setTimeLeft(10); // Reset time to 10 seconds again
      }, 10000);

      return () => clearInterval(questionTimer);
    }
  }, [quizStatus, questions]);

  // 10 second timer
  useEffect(() => {
    if (quizStatus && questions.length > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [quizStatus, questions, currentQuestionIndex]);

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title */}
      {!quizStatus ? (
        <div>
          <h1 className="text-[5vh] my-0 text-center font-bold text-white [text-shadow:0_0_10px_black]">
            {roomCode}
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-[5vh] my-0 text-center font-bold text-white [text-shadow:0_0_10px_black]">
            {loadedTitle}
          </h1>
        </div>
      )}

      {/* Navigation */}
      <Link to="/">
        <div className="absolute p-[12px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          LEAVE
        </div>
      </Link>

      {/* if quiz status is false */}
      {!quizStatus ? (
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[2vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.2)] rounded-xl shadow-md">
          <p>{prompt}</p>
        </div>
      ) : (
        // quizstatus true means quiz has to start
        <div className="flex [text-shadow:0_0_5px_rgba(0,0,0,0.5)]">
          {/* left panel for leaderboard and player data */}
          <div className="flex text-white text-center flex-col space-y-3 mx-2 w-1/5 m-[2vh] h-[88vh] rounded-xl">
            {/* leaderboard */}
            <div className="flex text-white text-center pl-2 pr-1 flex-col py-4 mx-0 w-full h-2/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
              <p className="text-2xl mb-4 ">Leaderboard</p>
              <ul className="h-full overflow-scroll divide-y-2 divide-gray-500">
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
                <li>a</li>
              </ul>
            </div>
            {/* player data */}
            <div className="flex text-white text-center pl-2 pr-1 flex-col py-4 mx-0 w-full h-3/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
              <p className="text-2xl mb-4 ">:) {username}</p>
              <ul>
                <li>Quiz: {loadedTitle}</li>
                <li>Room Code: {roomCode}</li>
                <li>Total Questions: {questions.length}</li>
              </ul>
            </div>
          </div>

          {/* quiz box - question panel */}
          <div className="relative flex flex-col items-center mx-2 ml-1 w-[96vw] py-[2vh] justify-center my-[2vh] h-[88vh] bg-[rgba(0,0,0,0.2)] rounded-xl shadow-xl">
            {questions.length > 0 ? (
              <div className="text-white w-full h-full wx text-lg text-center">
                {/* Timer Display */}
                <div className="absolute top-4 right-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-xl rounded-xl shadow-md">
                  <FontAwesomeIcon icon="fa-solid fa-clock" className="mr-2" />
                  {timeLeft}
                </div>

                {/* display questions */}
                {/* ques number */}
                <h2 className="absolute top-4 left-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-2xl rounded-xl shadow-md">
                  Q:{currentQuestionIndex + 1}
                </h2>

                {/* ques text */}
                <p className="mx-16 mt-20 text-4xl [text-shadow:0_0_10px_black]">
                  {questions[currentQuestionIndex].questionText}
                </p>
                {/* options */}
                <div className="absolute w-full flex-wrap bottom-32 mt-6 space-y-4">
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        className="w-2/5 py-2 h-12 px-4 mx-1 bg-[rgba(255,255,255,0.2)] text-center text-white rounded-md shadow-md hover:bg-[rgba(0,0,0,0.3)]"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="text-white text-lg">Quiz is Loading...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizRoom;
