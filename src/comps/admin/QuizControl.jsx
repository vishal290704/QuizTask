import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Sample API
const loginUrl = "https://quizapp-r80t.onrender.com/admin/login";
const fetchUrl = "https://quizapp-r80t.onrender.com/admin/fetchQuiz";

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
  const [token, setToken] = useState("");
  let url = `${fetchUrl}?adminId=${adminid}`;

  let aToken = "";
  let aId = "";

  // authenticate admin
  const authenticateAdmin = async (e) => {
    e.preventDefault();

    if (adminid === SAMPLE_ADMIN_ID && adminpass === SAMPLE_ADMIN_PASS) {
      setIsLoggedIn(true);
      return;
    }

    const loginData = {
      adminId: adminid,
      password: adminpass,
    };

    try {
      setBtnTxt("...");
      let response = await axios.post(loginUrl, loginData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      setToken(response.data.accessToken);
      console.log(token);
      aToken = token;
      aId = adminid;
      refreshPlayers();
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      setPrompt("Invalid ID or Password");
    } finally {
      setBtnTxt("Login");
    }
  };

  const refreshPlayers = async () => {
    try {
      setLoading(true);
      console.log(url, token);
      
      const response = await axios.get(url,{
        "adminId": adminid
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setPlayers(response.data.players || []);
      let { quizTitle, quizId, status, players } = response.data;
      setQuizTitle(quizTitle || "Loading");
      setQuizKey(quizId || "Loading");
      setStatus(status || "Loading");
      setPlayers(players || []);
      setPrompt("Login successful. Welcome!");
      setActionStatus("Player list refreshed!");
    } catch (error) {
      console.error("Error refreshing players:", error.message);
      setActionStatus("Failed to refresh player list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Admin logged in, quiz data and players set.");
      refreshPlayers();
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500">
      {/* title */}
      <h1 className="text-[5vw] pt-2 md:text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
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

      {/* check if logged in */}
      {!isLoggedIn ? (
        // panel
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[90%] sm:w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
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
        <div className="flex flex-col md:flex-row h-[90vh]">
          {/* Left Panel */}
          <div className="flex text-white flex-col p-6 bg-[rgba(0,0,0,0.3)] md:my-[2vh] mt-6 rounded-lg mx-2 shadow-lg w-5/5 md:w-4/5">
            {/* top */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 md:pr-6 bg-[rgba(255,255,255,0.3)] shadow-lg rounded-lg">
              <div>
                <h2 className="text-3xl font-semibold">Quiz: {quizTitle}</h2>
              </div>
              <div>
                <p>
                  <b>Quiz Key:</b> {quizKey}
                </p>
                <p>
                  <b>Status:</b> {status}
                </p>
              </div>
            </div>
            {/* buttons for action */}
            <div className="p-4 shadow-lg bg-[rgba(255,255,255,0.3)] rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Quiz Controls</h3>
              <div className="flex flex-col sm:flex-row justify-between">
                <button
                  onClick={() => controlQuiz("start")}
                  disabled={loading || status === "Started"}
                  className={`px-4 py-2 max-w-48 rounded-lg text-white ${
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
                  className={`px-4 py-2 max-w-48 rounded-lg text-white ${
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
          <div className="w-5/5 md:w-1/5 p-3 bg-gray-50 shadow-md rounded-lg mr-2 md:mr-2 ml-2 md:ml-0 my-[2vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Players : {players.length}</h3>
              <button
                onClick={refreshPlayers}
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
