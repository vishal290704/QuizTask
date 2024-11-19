import React from "react";

const PurpleButton = (props) => {
  return (
    <button className="w-full py-2 px-4 bg-[rgb(139,5,180)] text-white font-bold rounded-lg hover:bg-[rgb(128,0,180)]">
      {props.Text}
    </button>
  );
};

export default PurpleButton;