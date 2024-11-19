import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// login url for api
let url;
let clr = false;

const CreateQuiz = () => {
  const [adminid, setadmin] = useState("");
  const [adminpass, adminpassword] = useState("");
  const [prompt, setPrompt] = useState("Create a unique ID to continue");
  const [btnTxt, setBtn] = useState("Continue");

  let newQuiz = async (e) => {
    // prevent occurence on default values
    e.preventDefault();

    // data to be sent
    let userData = {
      admin: adminid,
      password: adminpass,
    };

    let loginData = {
      email: umail,
      password: upass,
    };

    try {
      // set loding button animation
      setBtn("...");

      const response = await axios.post(url, userData, {
        Headers: {
          "content-type": "application/json",
        },
      });

      console.log(response);
      setPrompt("Signup Successful.");
      clr = true;

      // automatic login
      await axios.post(loginurl, loginData, {
        Headers: {
          "Content-Type": "application/json",
        },
      });

      // send name
      activeName = username;
      isId = true;
    } catch (error) {
      console.log(error.response.data);
      clr = false;
      setPrompt("Signup Failed.");
    } finally {
      setBtn("Sign Up");
    }

    // reset all fields
    setName("");
    setMail("");
    setUname("");
    setPass("");
  };

  return (
    <div className="flex-col justify-center items-center bg-adminBG bg-cover bg-repeat-y w-screen h-screen">
      {/* title */}
      <h1 className="text-[3em] text-center font-bold text-white [text-shadow:0_0_10px_black]">
        CREATE NEW QUIZ
      </h1>

      <div className="absolute p-[10px] font-bold text-white top-[10px] right-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
        <Link to="/">HOME</Link>
      </div>

      <div className="absolute p-[10px] font-bold text-white top-[10px] left-[10px] bg-[rgba(0,0,0,0.55)] rounded-xl shadow-md">
        <Link to="/admin">BACK</Link>
      </div>

      {/* panel */}
      <div className="flex flex-col items-center mx-auto py-[2vh] justify-center mt-[10vh] w-[80%] max-w-4xl bg-[rgba(255,255,255,0.55)] rounded-xl shadow-md">
        <div className="mb-4 font-semibold">{prompt}</div>

        <form onSubmit={newQuiz}>
          {/* input fields */}

          <div className="mb-4">
            <label className="block text-sm font-medium">Admin ID:</label>
            <input
              type="text"
              value={adminid}
              onChange={(e) => setadmin(e.target.value)}
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter a new admin ID"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium">Password:</label>
            <input
              type="text"
              value={adminpass}
              onChange={(e) => adminpassword(e.target.value)}
              className="mt-1 block w-full border rounded-lg text-gray-600 border-gray-300 p-2 focus:outline"
              placeholder="Enter admin password"
            />
          </div>

          {/* submit button */}
          <button className="w-full py-2 px-4 bg-[rgb(139,5,180)] text-white font-bold rounded-lg hover:bg-[rgb(128,0,180)]">
            {btnTxt}
          </button>
        </form>
      </div>

      {/* ch */}
    </div>
  );
};

export default CreateQuiz;
