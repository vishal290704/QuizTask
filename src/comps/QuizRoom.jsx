import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// api url
const fetchQuizUrl = "/sampleAPI/responseQuiz.json";

const QuizRoom = () => {
  // data from previous page
  let { quizType, roomCode, username } = useParams();

  useEffect(() => {
    document.title = `${roomCode} - QuizSutra`;
  }, []);

  // states
  const [quizStatus, setStatus] = useState(false);
  const [prompt, setPrompt] = useState("Waiting for the admin to start");
  let [loadedTitle, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // question countdown default to 10 second
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("");

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
    } catch (err) {
      console.error(err.message);
      setPrompt("Failed to fetch quiz. Please retry again.");
    }
  };

  // lock option
  const lockOption = (questionIndex, optionIndex) => () => {
    console.log(optionIndex, "+", questionIndex);

    setSelectedOptionIndex(optionIndex);
  };

  // clear selection
  const clearSelection = () => {
    setSelectedOptionIndex("");
  };

  // useEffect to restart fetch if status false
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
      const quesTimer = setInterval(() => {
        setCurrentQuestionIndex((prevIndex) => {
          if (prevIndex < questions.length - 1) {
            return prevIndex + 1; // Increment to the next question
          } else {
            clearInterval(quesTimer); // Clear the timer once all questions are done
            return prevIndex; // Stay at the last question
          }
        });
        console.log(currentQuestionIndex);

        setTimeLeft(10); // Reset the timer
        setSelectedOptionIndex(""); // Reset selected option
      }, 10000);

      return () => clearInterval(quesTimer); // Cleanup
    }
  }, [quizStatus, questions.length]);

  // 10 second timer
  useEffect(() => {
    if (
      quizStatus &&
      questions.length > 0 &&
      currentQuestionIndex < questions.length
    ) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [quizStatus, questions, currentQuestionIndex]);

  return (
    <div className="flex-col p-0 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title  with quiz type*/}
      {quizType == "live" || quizType == 'local' ? (
        // live quiz
        !quizStatus ? (
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
        )
      ) : (
        <div className=""></div>
      )}

      {/* Navigation */}
      <Link to="/">
        <div className="absolute p-[12px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          LEAVE
        </div>
      </Link>

      {/* decide quiz type */}
      {
        // if local
        quizType == "local" ? (
          <div className="flex px-2">
              {/* left panel for leaderboard and player data */}
              <div className="flex text-white mx-0 mr-2 text-center flex-col space-y-3 w-1/5 m-[2vh] h-[88vh] rounded-xl">
                {/* leaderboard */}
                <div className="flex text-white text-center flex-col py-4 px-2 mx-0 w-full h-2/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
                  <p className="text-2xl mb-4 ">Leaderboard</p>
                  <ul className="h-full overflow-y-auto divide-y-2 divide-gray-500">
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                  </ul>
                </div>
                {/* player data */}
                <div className="flex text-white text-center px-2 flex-col py-4 mx-0 w-full h-3/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
                  <p className="text-2xl mb-4 ">:) {username}</p>
                  <ul>
                    <li>Quiz: {loadedTitle}</li>
                    <li>Room Code: {roomCode}</li>
                    <li>Total Questions: {questions.length}</li>
                  </ul>
                </div>
              </div>

              {/* quiz box - question panel */}
              <div className="relative flex flex-col items-center w-[96vw] py-[2vh] justify-center my-[2vh] h-[88vh] bg-[rgba(0,0,0,0.2)] rounded-xl shadow-xl">
                {/* mapping questions */}
                {questions.length > 0 &&
                currentQuestionIndex < questions.length ? (
                  <div className="text-white w-full h-full wx text-lg text-center">
                    {/* Timer Display */}
                    <div className="absolute top-4 right-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-xl rounded-xl shadow-md">
                      <FontAwesomeIcon
                        icon="fa-solid fa-clock"
                        className="mr-2"
                      />
                      {timeLeft}
                    </div>

                    {/* display questions */}
                    {/* ques number */}
                    <h2 className="absolute top-4 left-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-2xl rounded-xl shadow-md">
                      Q:{currentQuestionIndex + 1}
                    </h2>

                    {/* ques text */}
                    <p className="mx-16 mt-20 text-6vh [text-shadow:0_0_10px_black]">
                      {questions[currentQuestionIndex].questionText}
                    </p>
                    {/* mapping options */}
                    <div className="absolute w-full flex-wrap bottom-30 mt-6 space-y-4">
                      {questions[currentQuestionIndex].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={lockOption(currentQuestionIndex, index)}
                            className={`w-2/5 py-2 min-h-12 px-4 mx-1 ${
                              selectedOptionIndex === index
                                ? "bg-[rgba(255,255,255,0.5)]"
                                : "bg-[rgba(255,255,255,0.2)]"
                            } text-center text-white rounded-md shadow-md hover:${
                              selectedOptionIndex === index
                                ? "bg-[rgba(255,255,255,0.5)]"
                                : "bg-[rgba(0,0,0,0.3)]"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>

                    {/* clear selection */}
                    <button
                      onClick={clearSelection}
                      className="absolute bg-[rgba(0,0,0,0.3)] py-2 px-4 rounded-md text-sm bottom-2 right-2 shadow-md hover:bg-[rgba(0,0,0,0.1)]"
                    >
                      clear selection
                    </button>
                  </div>
                ) : (
                  <div className="text-white text-lg">Quiz is Loading...</div>
                )}
              </div>
            </div>
        ) : // if livbe
        quizType == "live" ? (
          !quizStatus ? (
            <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[6vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.2)] rounded-xl shadow-md">
              <p>{prompt}</p>
            </div>
          ) : (
            // quizstatus true means quiz has to start
            <div className="flex px-2">
              {/* left panel for leaderboard and player data */}
              <div className="flex text-white mx-0 mr-2 text-center flex-col space-y-3 w-1/5 m-[2vh] h-[88vh] rounded-xl">
                {/* leaderboard */}
                <div className="flex text-white text-center flex-col py-4 px-2 mx-0 w-full h-2/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
                  <p className="text-2xl mb-4 ">Leaderboard</p>
                  <ul className="h-full overflow-y-auto divide-y-2 divide-gray-500">
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                    <li>a</li>
                  </ul>
                </div>
                {/* player data */}
                <div className="flex text-white text-center px-2 flex-col py-4 mx-0 w-full h-3/5 bg-[rgba(255,255,255,0.2)] rounded-xl shadow-xl">
                  <p className="text-2xl mb-4 ">:) {username}</p>
                  <ul>
                    <li>Quiz: {loadedTitle}</li>
                    <li>Room Code: {roomCode}</li>
                    <li>Total Questions: {questions.length}</li>
                  </ul>
                </div>
              </div>

              {/* quiz box - question panel */}
              <div className="relative flex flex-col items-center w-[96vw] py-[2vh] justify-center my-[2vh] h-[88vh] bg-[rgba(0,0,0,0.2)] rounded-xl shadow-xl">
                {/* mapping questions */}
                {questions.length > 0 &&
                currentQuestionIndex < questions.length ? (
                  <div className="text-white w-full h-full wx text-lg text-center">
                    {/* Timer Display */}
                    <div className="absolute top-4 right-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-xl rounded-xl shadow-md">
                      <FontAwesomeIcon
                        icon="fa-solid fa-clock"
                        className="mr-2"
                      />
                      {timeLeft}
                    </div>

                    {/* display questions */}
                    {/* ques number */}
                    <h2 className="absolute top-4 left-4 py-[6px] px-[20px] font-bold bg-[rgba(255,255,255,0.2)] text-white text-2xl rounded-xl shadow-md">
                      Q:{currentQuestionIndex + 1}
                    </h2>

                    {/* ques text */}
                    <p className="mx-16 mt-20 text-6vh [text-shadow:0_0_10px_black]">
                      {questions[currentQuestionIndex].questionText}
                    </p>
                    {/* mapping options */}
                    <div className="absolute w-full flex-wrap bottom-30 mt-6 space-y-4">
                      {questions[currentQuestionIndex].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={lockOption(currentQuestionIndex, index)}
                            className={`w-2/5 py-2 min-h-12 px-4 mx-1 ${
                              selectedOptionIndex === index
                                ? "bg-[rgba(255,255,255,0.5)]"
                                : "bg-[rgba(255,255,255,0.2)]"
                            } text-center text-white rounded-md shadow-md hover:${
                              selectedOptionIndex === index
                                ? "bg-[rgba(255,255,255,0.5)]"
                                : "bg-[rgba(0,0,0,0.3)]"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>

                    {/* clear selection */}
                    <button
                      onClick={clearSelection}
                      className="absolute bg-[rgba(0,0,0,0.3)] py-2 px-4 rounded-md text-sm bottom-2 right-2 shadow-md hover:bg-[rgba(0,0,0,0.1)]"
                    >
                      clear selection
                    </button>
                  </div>
                ) : (
                  <div className="text-white text-lg">Quiz is Loading...</div>
                )}
              </div>
            </div>
          )
        ) : (
          // invalid request
          <div className="fixed flex flex-col inset-0 justify-center text-center items-center top-[35vh] w-[40vw] h-[8vh] mx-auto bg-[rgba(255,255,255,0.2)] rounded-xl shadow-md">
            <p>Invalid Request</p>
          </div>
        )
      }

      {/* if quiz status is false */}
      {}
    </div>
  );
};

export default QuizRoom;
