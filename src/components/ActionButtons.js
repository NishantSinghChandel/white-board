import {
  IconPencilPlus,
  IconPencilStar,
  IconWriting,
} from "@tabler/icons-react";
import React from "react";

const ActionButtons = ({ onWrite, onAppend, onAnnotate, onAnnotate2 }) => {
  return (
    <div className="border-gray-200 flex text-black justify-between items-center border border-b-0 mt-5 bg-white rounded-t-md">
      <button
        onClick={onWrite}
        className="mx-4 border-0  pointer w-full text-md font-semibold  p-2 px-4 duration-300 hover:tracking-wider"
      >
        <IconWriting className="inline-block mr-3" />
        WRITE
      </button>
      <button
        onClick={onAppend}
        className="mx-4 border-0 pointer w-full text-md border-l font-semibold border-gray-200 border-r  p-2 px-4 duration-300 hover:tracking-wider"
      >
        <IconPencilPlus className="inline-block mr-3" />
        APPEND
      </button>
      <button
        onClick={onAnnotate}
        className="mx-4 border-0 pointer w-full text-md  p-2 px-4 font-semibold duration-300 hover:tracking-wider"
      >
        <IconPencilStar className="inline-block mr-3" /> ANNOTATE
      </button>
      {/* <button onClick={onAnnotate2}>ANNOTATE2</button> */}
    </div>
  );
};

export default ActionButtons;
