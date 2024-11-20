import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const AdminRoutes = () => {

  useEffect(() => {
    document.title = "Admin - QuizSutra";
  }, []); 

  return (
    <div className="flex-col justify-center items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_purple]">
        ADMIN ROUTES
      </h1>

      <Link to="/">
        <div className="absolute p-[10px] font-bold text-white top-[12px] right-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          HOME
        </div>
      </Link>

      {/* panel */}
      <div className="flex items-center mx-auto py-[2vh] justify-center mt-[20vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.3)] rounded-xl shadow-md">
        <ul className="text-[2em] items-center text-center">
          <li>
            <Link
              to="/admin/create"
              className="text-white [text-shadow:0_0_10px_black] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.4)]"
            >
              Create New Quiz
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quiz-control"
              className="text-white [text-shadow:0_0_10px_black] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.4)]"
            >
              Quiz Control
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quiz-results"
              className="text-white [text-shadow:0_0_10px_black] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.4)]"
            >
              Check Results
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminRoutes;
