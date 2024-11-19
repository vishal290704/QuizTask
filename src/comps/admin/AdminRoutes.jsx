import React from "react";
import { Link } from "react-router-dom";

const AdminRoutes = () => {
  return (
    <div className="flex-col justify-center items-center bg-adminBG bg-cover bg-no-repeat w-screen h-screen">
      {/* title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        ADMIN ROUTES
      </h1>

      <div className="absolute p-[10px] font-bold text-white top-[10px] right-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
        <Link to="/">HOME</Link>
      </div>

      {/* panel */}
      <div className="flex items-center mx-auto py-[2vh] justify-center mt-[20vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.55)] rounded-xl shadow-md">
        <ul className="text-[2em] items-center text-center">
          <li>
            <Link
              to="/create"
              className="hover:text-white hover:[text-shadow:0_0_10px_purple]"
            >
              Create New Quiz
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quiz-control"
              className="hover:text-white hover:[text-shadow:0_0_10px_purple]"
            >
              Quiz Control
            </Link>
          </li>
          <li>
            <Link
              to="/admin/quiz-results"
              className="hover:text-white hover:[text-shadow:0_0_10px_purple]"
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
