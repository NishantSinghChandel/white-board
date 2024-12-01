import React from "react";
import {
  IconPencilPlus,
  IconPencilStar,
  IconWriting,
} from "@tabler/icons-react";

const ICONS = {
  write: IconWriting,
  append: IconPencilPlus,
  annotate: IconPencilStar,
};

const ActionButton = ({ onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className="border-0 pointer w-full text-xs md:text-md font-semibold p-2 duration-300 hover:tracking-wider flex items-center justify-center"
    aria-label={label}
  >
    <Icon className="inline-block mr-1 text-xs md:text-sm md:mr-3" />
    {label.toUpperCase()}
  </button>
);

const ActionButtons = ({ onWrite, onAppend, onAnnotate }) => {
  const actions = [
    { onClick: onWrite, icon: ICONS.write, label: "Write" },
    { onClick: onAppend, icon: ICONS.append, label: "Append" },
    { onClick: onAnnotate, icon: ICONS.annotate, label: "Annotate" },
  ];

  return (
    <div className="border-gray-200 flex text-black justify-between items-center border border-b-0 mt-5 bg-white rounded-t-md">
      {actions.map((action, index) => (
        <ActionButton
          key={index}
          onClick={action.onClick}
          icon={action.icon}
          label={action.label}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
