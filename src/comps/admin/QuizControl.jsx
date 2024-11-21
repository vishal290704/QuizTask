import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Sample API
const quizDataUrl = "/sampleAPI/responseQuiz.json";
const roomUrl = "/sampleAPI/sampleRoom.json";

// Sample for testing
const SAMPLE_ADMIN_ID = "testAdmin";
const SAMPLE_ADMIN_PASS = "newPass";

const QuizControl = ({ quizId }) => {
  useEffect(() => {
    document.title = "Quiz Control - QuizSutra";
  }, []);

  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminid, setAdmin] = useState("");
  const [adminpass, setAdminPass] = useState("");
  const [prompt, setPrompt] = useState("Login to continue");
  const [btnTxt, setBtnTxt] = useState("Login");

  const [quizTitle, setQuizTitle] = useState("");
  const [quizKey, setQuizKey] = useState("");
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [actionStatus, setActionStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Authenticate Admin
  const authenticateAdmin = async (e) => {
    e.preventDefault();

    if (adminid === SAMPLE_ADMIN_ID && adminpass === SAMPLE_ADMIN_PASS) {
      setIsLoggedIn(true);
      return;
    }

    const userData = {
      admin: adminid,
      password: adminpass,
    };

    try {
      setBtnTxt("...");
      const response = await axios.post(loginUrl, userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      setPrompt("Registration successful. Proceed to create your quiz.");
      setIsLoggedIn(true);
      fetchQuizData();
      fetchPlayers();
    } catch (error) {
      console.error(error.response.data);
      setPrompt("Invalid ID or Password");
    } finally {
      setBtnTxt("Login");
    }
  };

  // Fetch basic quiz data
  const fetchQuizData = async () => {
    try {
      const response = await axios.get(quizDataUrl, { quizId });
      setQuizTitle(response.data.quizTitle);
      console.log(quizTitle);
      setQuizKey(response.data.quizKey);
      setStatus(response.data.status || "Not Started");
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
    }
  };

  // Fetch players data

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(roomUrl);
      console.log(response.data);
      setPlayers(response.data.players);
    } catch (error) {
      console.error("Error fetching players:", error.message);
    }
  };

  // Control quiz
  const controlQuiz = async (action) => {
    setLoading(true);
    setActionStatus("");

    try {
      const response = await axios.post(controlQuizUrl, {
        quizId,
        action,
      });

      setStatus(action === "start" ? "Started" : "Stopped");
      setActionStatus(response.data.message || "Action successful.");
    } catch (error) {
      setActionStatus(
        error.response?.data?.message || "Failed to perform the action."
      );
      console.error("Error controlling quiz:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchQuizData();
      fetchPlayers();
    }
  }, [isLoggedIn, quizId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500">
      {/* title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        QUIZ CONTROL
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

      {!isLoggedIn ? (
        // panel
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
          <form onSubmit={authenticateAdmin}>
            <div className="mb-4 text-center font-semibold">{prompt}</div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Admin ID:</label>
              <input
                type="text"
                value={adminid}
                onChange={(e) => setAdmin(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter admin ID"
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium mb-2">Admin Password:</label>
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
        <div className="flex h-[90vh]">
          {/* Left Panel */}
          <div className="flex flex-col p-6 bg-gray-100 my-[2vh] rounded-lg mx-2 shadow-lg w-4/5">
            <div className="flex justify-between items-center mb-6 p-4 pr-6 bg-gray-50 shadow-md rounded-lg">
              <div>
                <h2 className="text-3xl font-semibold">{quizTitle}</h2>
              </div>
              <div>
                <p className="text-gray-600">
                  <b>Quiz Key:</b> {quizKey}
                </p>
                <p className="text-gray-600">
                  <b>Status:</b> {status}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Quiz Controls</h3>
              <div className="flex justify-between">
                <button
                  onClick={() => controlQuiz("start")}
                  disabled={loading || status === "Started"}
                  className={`px-4 py-2 rounded-lg text-white ${
                    status === "Started"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-700 hover:bg-purple-500"
                  }`}
                >
                  {loading && status !== "Started"
                    ? "Starting..."
                    : "Start Quiz"}
                </button>
                <button
                  onClick={() => controlQuiz("stop")}
                  disabled={loading || status === "Stopped"}
                  className={`px-4 py-2 rounded-lg text-white ${
                    status === "Stopped"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-500"
                  }`}
                >
                  {loading && status !== "Stopped"
                    ? "Stopping..."
                    : "Stop Quiz"}
                </button>
              </div>
              {actionStatus && (
                <p className="mt-4 text-center text-gray-700">{actionStatus}</p>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/5 p-3 bg-gray-100 shadow-md rounded-lg mr-2 my-[2vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Players : {players.length}</h3>
              <button
                onClick={fetchPlayers}
                className="bg-purple-700 text-white px-2 py-1 rounded-lg hover:bg-purple-500"
              >
                Refresh
              </button>
            </div>
            <ul className="space-y-2">
              {players.length > 0 ? (
                players.map((p) => <li className="border-b-2 p-2">{p}</li>)
              ) : (
                <p className="text-gray-500">Waiting for players...</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizControl;
