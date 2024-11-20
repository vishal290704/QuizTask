import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// API URLs
let registerUrl = "/api/admin/register";
let createQuizUrl = "/api/admin/create-quiz";

// sample id
const SAMPLE_ADMIN_ID = "testAdmin";
const SAMPLE_ADMIN_PASS = "newPass";

const CreateQuiz = () => {
  useEffect(() => {
    document.title = "Create New Quiz - QuizSutra";
  }, []);

  // state management
  const [adminid, setAdmin] = useState("");
  const [adminpass, setAdminPass] = useState("");
  const [prompt, setPrompt] = useState("Create a unique ID to continue");
  const [btnTxt, setBtnTxt] = useState("Continue");
  const [quizTitle, setQuizTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  // Register the admin
  const registerAdmin = async (e) => {
    e.preventDefault();

    // mock login
    if (adminid === SAMPLE_ADMIN_ID && adminpass === SAMPLE_ADMIN_PASS) {
      setPrompt("Registration successful. Proceed to create your quiz.");
      setIsRegistered(true);
      return;
    }

    const userData = {
      admin: adminid,
      password: adminpass,
    };

    try {
      setBtnTxt("...");
      const response = await axios.post(registerUrl, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      setIsRegistered(true);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setPrompt("Registration failed. Try again.");
    } finally {
      setBtnTxt("Continue");
    }
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        category: "",
        difficulty: "",
        questionKey: questions.length + 1,
      },
    ]);
  };

  // Submit quiz
  const submitQuiz = async () => {
    const quizData = {
      admin: adminid,
      title: quizTitle,
      status,
      questions,
    };

    try {
      const response = await axios.post(createQuizUrl, quizData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Error creating quiz:", error.message);
    }
  };

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
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
      <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
        {!isRegistered ? (
          <form onSubmit={registerAdmin}>
            <div className="mb-4 font-semibold">{prompt}</div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Admin ID:</label>
              <input
                type="text"
                value={adminid}
                onChange={(e) => setAdmin(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter a new admin ID"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Password:</label>
              <input
                type="password"
                value={adminpass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[rgb(139,5,180)] text-white font-bold rounded-lg hover:shadow-md hover:bg-[rgb(151,62,199)]"
            >
              {btnTxt}
            </button>
          </form>
        ) : (
          <div className="w-3/5">
            <div className="mb-1">
              <label className="block text-[2md] font-medium">Quiz Title:</label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter quiz title"
              />
            </div>

            {/* Status checkbox */}
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-md font-medium">Start quiz Instantly</span>
              </label>
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
                          newQuestions[index].options[optIndex] = e.target.value;
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
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
