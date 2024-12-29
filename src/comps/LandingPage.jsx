import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";


const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username && roomCode) {
      navigate(`/room/${"live"}/${roomCode}/${username}/_`);
    } else {
      alert("Enter username and invite code to continue");
    }
  };

  useEffect(() => {
    document.title = "Home - QuizSphere";
  }, []);

  return (
    // landing page
    <div className="h-screen w-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center bg-gray-100">
      <Link
        to="/admin"
        className="absolute bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md p-[10px] font-bold text-white top-3 right-5"
      >
        <div className="">ADMIN</div>
      </Link>

      {/* panel */}
      <div className="flex flex-col md:flex-row w-4/5 max-w-4xl px-[2em] bg-[rgba(0,0,0,0.4)] rounded-xl shadow-md">
        {/* left */}
        <div className="w-full md:w-1/2 p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white text-center md:text-left">
            QuizSphere
          </h1>
          <p className="text-white mt-2 text-center md:text-left">
            Learn | Compete | Excel
          </p>
        </div>

        {/* right */}
        <form className="w-full md:w-1/2 p-8 text-white" onSubmit={joinRoom}>
          <h2 className="text-2xl text-center font-bold mb-4">
            Join a Quiz Room
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Quiz ID:</label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter a Quiz ID"
            />
          </div>

          {/* buttons */}
          <button className="w-full mb-3 py-2 px-4 bg-[rgb(50,65,223)] shadow-md text-white font-bold rounded-lg hover:bg-[rgb(59,80,242)]">
            Join Room
          </button>
          <div className="text-center block">or</div>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/local-quiz")}
              className="w-full py-2 px-4 bg-[rgb(50,65,223)] shadow-md text-white font-bold rounded-lg hover:bg-[rgb(59,80,242)]"
            >
              Play Local Quizzes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
