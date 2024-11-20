import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// API URLs
const quizDataUrl = "/api/quiz/data"; // Fetch quiz data
const playersListUrl = "/api/quiz/players"; // Fetch players
const controlQuizUrl = "/api/quiz/control"; // Start/Stop quiz

// Sample credentials for testing
const SAMPLE_ADMIN_ID = "testAdmin";
const SAMPLE_ADMIN_PASS = "newPass";

const QuizControl = ({ quizId }) => {
  useEffect(() => {
    document.title = "Quiz Control - QuizSutra";
  }, []);

  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [quizTitle, setQuizTitle] = useState("");
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [actionStatus, setActionStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Authenticate Admin
  const authenticateAdmin = (e) => {
    e.preventDefault();

    if (adminId === SAMPLE_ADMIN_ID && adminPassword === SAMPLE_ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      setActionStatus("Invalid Admin ID or Password.");
    }
  };

  // Fetch basic quiz data
  const fetchQuizData = async () => {
    try {
      const response = await axios.post(quizDataUrl, { quizId });
      setQuizTitle(response.data.title);
      setStatus(response.data.status || "Not Started");
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
    }
  };

  // Fetch players data
  const fetchPlayers = async () => {
    try {
      const response = await axios.post(playersListUrl, { quizId });
      setPlayers(response.data.players);
    } catch (error) {
      console.error("Error fetching players:", error.message);
    }
  };

  // Control quiz (start/stop)
  const controlQuiz = async (action) => {
    setLoading(true);
    setActionStatus("");

    try {
      const response = await axios.post(controlQuizUrl, {
        quizId,
        action,
        adminPassword,
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
        CREATE NEW QUIZ
      </h1>

      {/* navigation */}
      <div className="absolute p-[10px] font-bold text-white top-[10px] right-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
        <Link to="/">HOME</Link>
      </div>
      <div className="absolute p-[10px] font-bold text-white top-[10px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
        <Link to="/admin">BACK</Link>
      </div>

      {!isLoggedIn ? (
        // panel
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
          <form
            onSubmit={authenticateAdmin}
            className="mb-4 font-semibold"
          >
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">
                Admin ID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter admin ID"
              />
            </div>
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-500"
            >
              Login
            </button>
            {actionStatus && (
              <p className="text-center text-red-600 mt-4">{actionStatus}</p>
            )}
          </form>
        </div>
      ) : (
        <>
          {/* Left Panel */}
          <div className="flex flex-col p-6 h-[96vh] bg-white my-[2vh] rounded-md mx-2 shadow-lg w-4/5">
            <h1 className="text-3xl text-center font-bold mb-4">
              Quiz Control
            </h1>
            <div className="mb-6 p-4 bg-gray-50 shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold">{quizTitle}</h2>
              <p className="text-gray-600">Status: {status}</p>
            </div>
            <div className="p-4 bg-gray-50 shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-4">Control Quiz</h3>
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
          <div className="w-1/5 p-4 bg-gray-50 shadow-md rounded-lg h-[96vh] mr-2 my-[2vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Players</h3>
              <button
                onClick={fetchPlayers}
                className="bg-purple-700 text-white px-2 py-1 rounded-lg hover:bg-purple-500"
              >
                Refresh
              </button>
            </div>
            <ul className="space-y-2">
              {players.length > 0 ? (
                players.map((player, index) => (
                  <li
                    key={index}
                    className="bg-white shadow-sm rounded-lg p-2 text-gray-700"
                  >
                    {player.username}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No players joined yet.</p>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizControl;
