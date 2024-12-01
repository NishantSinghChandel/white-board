import { IconCheck } from "@tabler/icons-react";

const buttonBaseClass = "border-0 p-2 rounded duration-300 hover:shadow-md";
const selectedClass = "text-green-500 font-bold ";
const unselectedClass = "text-transparent";

function ColorButton({ color, onBoardDataChange, selectedColor }) {
  return (
    <button
      style={{ backgroundColor: color }}
      className={buttonBaseClass}
      onClick={() => onBoardDataChange("textColor", color)}
    >
      {selectedColor == color ? (
        <IconCheck size={16} className={selectedClass} />
      ) : (
        <IconCheck size={16} className={unselectedClass} />
      )}
    </button>
  );
}

export default ColorButton;
