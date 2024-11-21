import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

// api url
const fetchQuizUrl = "/sampleAPI/responseQuiz.json";

const QuizRoom = () => {
  // data from previous page
  let { roomCode, username } = useParams();

  // states
  const [quizStatus, setStatus] = useState(false);
  const [prompt, setPrompt] = useState("Waiting for the admin to start");
  let [loadedTitle, setTitle] = useState("");

  // axios fetch
  const fetchQuizStatus = async () => {
    try {
      const response = await axios.get(fetchQuizUrl);
      setStatus(response.data.status);
      setTitle(response.data.quizTitle);
      if (!response.data.status) {
        setPrompt("Waiting for the admin to start");
      }
      console.log(quizStatus);
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect to restart fetch
  useEffect(() => {
    // only if quizStatus is false
    if (!quizStatus) {
      const timer = setInterval(() => {
        fetchQuizStatus();
      }, 1000);

      // clear after true
      return () => clearInterval(timer);
    }
  }, [quizStatus]);

  // initial load
  useEffect(() => {
    fetchQuizStatus();
  }, []);

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title */}

      {/* if status is false */}
      {!quizStatus ? (
        // panel
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
        <div className="absolute p-[10px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          BACK
        </div>
      </Link>

      {/* if status is false */}
      {!quizStatus ? (
        // panel
        <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[2vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
          <p>{prompt}</p>
        </div>
      ) : (
        // quiz has started

<div className="flex">

{/* // leaderboard */}

<div className="flex text-white text-center px-2 flex-col py-4 mx-2 w-1/5 m-[2vh] h-[89vh] bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
<p className="text-2xl mb-4 ">Leaderboard</p>
<ul className="h-full overflow-scroll divide-y-2 divide-gray-500">
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
  <li>a</li>
</ul>
</div>

{/* // quiz box */}
<div className="flex flex-col items-center mx-2 ml-0 w-[96vw] py-[2vh] justify-center my-[2vh] h-[89vh] bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
  <div className="text-white text-lg">Quiz Loaded</div>
</div>

</div>
      )}
    </div>
  );
};

export default QuizRoom;
