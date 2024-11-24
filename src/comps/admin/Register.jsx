import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let registerUrl = "https://quizapp-r80t.onrender.com/admin/register";

const SAMPLE_ADMIN_ID = "testAdmin";
const SAMPLE_ADMIN_PASS = "newPass";

const Register = () => {
  useEffect(() => {
    document.title = `Register - QuizSutra`;
  }, []);

  const [adminid, setAdmin] = useState("");
  const [adminpass, setAdminPass] = useState("");
  const [prompt, setPrompt] = useState("Create a unique ID to continue");
  const [btnTxt, setBtnTxt] = useState("Continue");
  const [isRegistered, setIsRegistered] = useState(false); // Added state

  const registerAdmin = async (e) => {
    e.preventDefault();

    // Mock registration
    if (adminid === SAMPLE_ADMIN_ID && adminpass === SAMPLE_ADMIN_PASS) {
      setPrompt("Registration successful. Proceed to create your quiz.");
      setIsRegistered(true);
      return;
    }

    let signupData = {
      adminId: adminid,
      password: adminpass,
    };

    // Registration logic
    try {
      setBtnTxt("...");
      console.log("Admin ID:", adminid);
      console.log("Admin Password:", adminpass);

      let response = await axios.post(registerUrl, signupData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);

      setPrompt("Registration successful. Proceed to create your quiz.");
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      setPrompt("Registration failed. Try again.");
    } finally {
      setBtnTxt("Continue");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-t from-violet-500 to-fuchsia-500">
      {/* title */}
      <h1 className="text-[5vw] pt-2 md:text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        REGISTER
      </h1>

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

      {/* panel */}
      <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.35)] rounded-xl shadow-md">
        {!isRegistered ? (
          <form onSubmit={registerAdmin}>
            <div className="mb-4 font-semibold">{prompt}</div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Admin Email:</label>
              <input
                type="text"
                value={adminid}
                onChange={(e) => setAdmin(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter an Email ID"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium">Password:</label>
              <input
                type="password"
                value={adminpass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[rgb(139,5,180)] text-white font-bold rounded-lg hover:shadow-md hover:bg-[rgb(151,62,199)]"
            >
              {btnTxt}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4 font-semibold">{prompt}</div>
            <Link
              to="/admin/create"
              className="py-2 px-4 bg-purple-700 font-bold text-white rounded-lg hover:bg-purple-500 mt-2"
            >
              Go to Create Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
