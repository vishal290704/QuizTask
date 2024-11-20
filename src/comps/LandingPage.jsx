import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username && inviteCode) {
      navigate("/room", { state: { username, inviteCode } });
    } else {
      alert("Enter username and invite code to continue");
    }
  };

  useEffect(() => {
    document.title = "Home - QuizSutra";
  }, []); 

  return (
    // landing page full bg
    <div className="h-screen w-screen bg-gradient-to-t from-violet-500 to-fuchsia-500 flex items-center justify-center bg-gray-100">
      <div className="absolute p-[10px] font-bold text-white top-[10px] right-[10px] bg-[rgba(0,0,0,0.4)] rounded-xl shadow-md">
        <Link to="/admin">ADMIN</Link>
      </div>

      {/* panel */}
      <div className="flex w-4/5 max-w-4xl px-[2em] bg-[rgba(0,0,0,0.4)] rounded-xl shadow-md">
        {/* left */}
        <div className="w-1/2 p-6 rounded-l-lg flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white">QuizSutra</h1>
          <p className="text-white mt-2">
            powered by Cloud Computing Cell, AKGEC
          </p>
        </div>

        {/* right */}
        <div className="w-1/2 p-8 text-white">
          <h2 className="text-2xl text-center font-bold mb-4">
            Join a Quiz Room
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Room Code:</label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter room code"
            />
          </div>

          {/* buttons */}
          <button
            onClick={joinRoom}
            className="w-full mb-3 py-2 px-4 bg-[rgb(135,28,188)] shadow-md text-white font-bold rounded-lg hover:bg-[rgb(138,42,197)]"
          >
            Join Room
          </button>
          <div className="text-center block">or</div>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/local-quiz")}
              className="w-full py-2 px-4 bg-[rgb(128,28,188)] shadow-md text-white font-bold rounded-lg hover:bg-[rgb(138,42,197)]"
            >
              Play Local Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
