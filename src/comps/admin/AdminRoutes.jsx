import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminRoutes = () => {
  useEffect(() => {
    document.title = "Admin - QuizSutra";
  }, []);

  return (
    <div className="flex flex-col justify-start items-center bg-gradient-to-t from-violet-500 to-fuchsia-500 w-screen h-screen">
      {/* Title */}
      <h1 className="mt-1 text-[2em] md:text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_purple]">
        ADMIN ROUTES
      </h1>

      {/* Home Button */}
      <Link to="/" className="absolute top-3 right-3">
        <div className="p-2 md:p-[10px] font-bold text-white bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
          HOME
        </div>
      </Link>

      {/* Panel */}
      <div className="flex flex-col items-center mx-auto py-4 px-4 justify-center mt-44 md:mt-[20vh] w-[70%] md:w-[70%] max-w-4xl bg-[rgba(255,255,255,0.3)] rounded-xl shadow-md">
        <ul className="text-[1.5em] md:text-[2em] text-center space-y-6">
          <li>
            <Link
              to="/admin/register"
              className="text-white [text-shadow:0_0_10px_black] hover:[text-shadow:0_0_10px_rgba(255,255,255,0.4)]"
            >
              Register
            </Link>
          </li>
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
        </ul>
      </div>
    </div>
  );
};

export default AdminRoutes;
