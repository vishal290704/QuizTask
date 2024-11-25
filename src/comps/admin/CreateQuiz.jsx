import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

// API URLs
const createQuizUrl = "https://quizapp-r80t.onrender.com/admin/createQuiz";
const loginUrl = "https://quizapp-r80t.onrender.com/admin/login";

// Sample for testing
const SAMPLE_ADMIN_ID = "testAdmin";
const SAMPLE_ADMIN_PASS = "newPass";

const CreateQuiz = () => {
  useEffect(() => {
    document.title = "Create New Quiz - QuizSutra";
  }, []);

  // State management
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState("");

  // Admin authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminid, setAdmin] = useState("");
  const [adminpass, setAdminPass] = useState("");
  const [prompt, setPrompt] = useState("Login to continue");
  const [btnTxt, setBtnTxt] = useState("Login");
  const [cTxt, setTxt] = useState("Create Quiz");
  const [actionStatus, setActionStatus] = useState(true);

  // quiz creating
  const [quizSuccess, setQuizSuccess] = useState("");
  const [quizId, setquizId] = useState("");

  // Authenticate admin
  const authenticateAdmin = async (e) => {
    e.preventDefault();

    // Sample authentication for testing
    if (adminid === SAMPLE_ADMIN_ID && adminpass === SAMPLE_ADMIN_PASS) {
      setIsLoggedIn(true);
      return;
    }

    const loginData = {
      adminId: adminid,
      password: adminpass,
    };

    // login
    try {
      setBtnTxt("...");
      let response = await axios.post(loginUrl, loginData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      setPrompt("Login successful. Welcome!");
      setIsLoggedIn(true);
      setToken(response.data.accessToken);
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);
      setPrompt("Invalid ID or Password");
    } finally {
      setBtnTxt("Login");
    }
  };

  // Add a question to the quiz
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        quesKey: "",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        category: "",
        difficulty: "",
      },
    ]);
  };

  // Submit  quiz
  const submitQuiz = async () => {
    if (!quizTitle || questions.length === 0) {
      alert("Quiz Title and Questions are required to submit the quiz.");
      return;
    }

    const quizData = {
      adminId: adminid,
      quizTitle: quizTitle,
      questions: questions.map((q, i) => ({
        quesKey: (i + 1).toString(),
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        category: q.category,
        difficulty: q.difficulty,
      })),
    };

    try {
      setTxt('...')
      const response = await axios.post(createQuizUrl, quizData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizSuccess(
        `Quiz created successfully! Your Quiz ID is: ${response.data.quizId}`
      );
      setquizId(response.data.quizId);
      message(
        `Quiz created successfully! Your Quiz ID is: ${response.data.quizId}`
      );
      // Reset form
      setQuizTitle("");
      setQuestions([]);
    } catch (error) {
      setPrompt('waiting...')
      // alert("Failed to create quiz. Please try again.");
    }finally{
      setTxt('Create Quiz')
    }
  };

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* title */}
      <h1 className="text-[5vw] pt-2 md:text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        CREATE NEW QUIZ
      </h1>

      {/* navigation */}
      <Link to="/">
        <div className="absolute p-[10px] font-bold text-white top-[12px] right-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          HOME
        </div>
      </Link>
      <Link to="/admin">
        <div className="absolute p-[10px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          BACK
        </div>
      </Link>

      {/* panel */}
      <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[90%] sm:w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
        {!isLoggedIn ? (
          // Login Panel
          <div className="flex flex-col w-3/5 mx-auto">
            <form onSubmit={authenticateAdmin}>
              <div className="mb-4 text-center font-semibold">{prompt}</div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Admin Email:</label>
                <input
                  type="text"
                  value={adminid}
                  onChange={(e) => setAdmin(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter admin ID"
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2">
                  Admin Password:
                </label>
                <input
                  type="password"
                  value={adminpass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter admin password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-500"
              >
                {btnTxt}
              </button>
              {actionStatus && (
                <p className="text-center text-red-600 mt-4">{actionStatus}</p>
              )}
            </form>
          </div>
        ) : (
          // Quiz Creation Panel
          <div className="w-3/5 overflow-y-scroll max-h-[70vh] rounded-lg px-1 mx-auto">
            <div className="mb-1">
              <label className="block text-[2md] font-medium">
                Quiz Title:
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter quiz title"
              />
            </div>

            <div>
              {questions.map((q, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <label className="block text-sm font-medium">
                    Question {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={q.questionText}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].questionText = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder={`Question ${index + 1}`}
                    className="w-full border rounded-lg p-2 mb-2"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[index].options[optIndex] =
                            e.target.value;
                          setQuestions(newQuestions);
                        }}
                        placeholder={`Option ${optIndex + 1}`}
                        className="w-full border rounded-lg p-2"
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    value={q.correctAnswer}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].correctAnswer = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder="Correct Answer"
                    className="w-full border rounded-lg p-2 mt-2"
                  />
                  <input
                    type="text"
                    value={q.category}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].category = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder="Question Category"
                    className="w-full border rounded-lg p-2 mt-2"
                  />
                  <input
                    type="text"
                    value={q.difficulty}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].difficulty = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder="Question Difficulty"
                    className="w-full border rounded-lg p-2 mt-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <button
                onClick={addQuestion}
                className="py-2 px-4 bg-black text-white rounded-lg hover:bg-red-700"
              >
                Add Question
              </button>
              <button
                onClick={submitQuiz}
                className="py-2 px-4 bg-purple-700 text-white rounded-lg hover:bg-purple-500 mt-2"
              >
                {cTxt}
              </button>
            </div>

            {/* Display =quiz ID */}
            {quizSuccess ? (
              <div className="text-center text-lg">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-600"
                />
                Quiz created successfully Quiz ID - {quizId} <br />
                Share Quiz ID with players for the quiz
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
