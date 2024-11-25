import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const saveUrl = "https://quizapp-r80t.onrender.com/QuizEntry/SavePlayerData";
const leaderBoardUrl = "https://quizapp-r80t.onrender.com/QuizEntry/findAll";

// Results Page Component
const QuizResults = () => {
  const { score, correctAns, streak, incorrectAns, username, roomcode } =
    useParams();

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    document.title = `Results - QuizSutra`;

    const playerData = {
      username: username,
      score: Number(score),
      correctAnswers: Number(correctAns),
      incorrectAnswers: Number(incorrectAns),
      streak: Number(streak),
    };

    axios
      .post(saveUrl, playerData)
      .then(() => {
        console.log("Player data saved successfully.");
        return axios.get(leaderBoardUrl);
      })
      .then((response) => {
        const leaderboardData = response.data;

        const sortedLeaderboard = leaderboardData.sort(
          (a, b) => b.score - a.score
        );

        setLeaderboard(sortedLeaderboard);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, [score, correctAns, streak, incorrectAns, username, roomcode]);

  return (
    <div className="flex-col p-0 text-white [text-shadow:0_0_5px_rgba(0,0,0,0.5)] justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      <Link to="/">
        <div className="absolute p-[12px] font-bold text-white top-[12px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          HOME
        </div>
      </Link>

      {/* Title */}
      <h1 className="text-[5vh] my-0 py-20 text-center font-bold text-white [text-shadow:0_0_10px_black]">
        Quiz Completed
      </h1>

      {/* Result panel */}
      <div className="flex flex-row px-4 min-h-[22vh] items-center mx-auto py-[2vh] justify-center mt-[3vh] w-[90%] sm:w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
        <div className="w-3/5">
          <FontAwesomeIcon
            icon={faTrophy}
            className="text-yellow-500 text-6xl mb-4"
          />

          <h1>Quiz Results</h1>
          <p>Score: {score}</p>
          <p>Correct Answers: {correctAns}</p>
          <p>Streak: {streak}</p>
          <p>Incorrect Answers: {incorrectAns}</p>
        </div>

        {/* Leaderboard */}
        <div className="mt-10 w-2/5 overflow-y-scroll max-h-[20vh]">
          <h2 className="text-[3vh] font-bold text-center">Leaderboard</h2>
          <div className="flex flex-col items-center mt-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((player, index) => (
                <div
                  key={index}
                  className="w-[90%] sm:w-[80%] max-w-3xl p-4 bg-[rgba(0,0,0,0.55)] text-white mb-2 rounded-lg shadow-md flex justify-between"
                >
                  <span className="font-bold">
                    {index + 1}. {player.username}
                  </span>
                  <span>Score: {player.score}</span>
                </div>
              ))
            ) : (
              <p>Loading leaderboard...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
