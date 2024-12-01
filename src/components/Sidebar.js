import { useState } from "react";
import {
  IconLayoutSidebarLeftExpandFilled,
  IconLayoutSidebarLeftCollapseFilled,
  IconBox,
  IconHighlight,
  IconUnderline,
} from "@tabler/icons-react";

import {
  annotationTypeList,
  textColorList,
  annotationColorList,
} from "../utils/constant";
import ColorButton from "./ColorButton";

const IconMapper = {
  box: IconBox,
  highlight: IconHighlight,
  underline: IconUnderline,
};

const getIcon = (type) => {
  let Component = IconMapper[type];
  return <Component size={16} />;
};

export default function Sidebar({
  onBoardDataChange,
  boardData,
  onAnnotationApplyClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [annotateText, setAnnotateText] = useState("");
  const { annotationColor, textColor, annotationType } = boardData;

  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const handleAnnotateTextChange = (e) => {
    setAnnotateText(e.target.value);
  };

  return (
    <section
      className={`w-[240px] z-[100] bg-white p-4  border border-gray-100 dark:border-slate-700 rounded-r-lg shadow-lg absolute ${
        isOpen ? "left-0" : "left-[-240px]"
      } duration-300 h-full dark:bg-slate-900 dark:text-white`}
    >
      <button
        className="absolute top-[55px] shadow-sm border border-gray-100 dark:border-slate-700 rounded-r-md p-1 right-[-42px] px-2 text-center bg-white dark:bg-slate-900"
        onClick={handleOpenClick}
      >
        {isOpen ? (
          <IconLayoutSidebarLeftCollapseFilled />
        ) : (
          <IconLayoutSidebarLeftExpandFilled />
        )}
      </button>

      <div className="border border-gray-300 dark:border-slate-700 rounded-lg my-3 bg-[#f5f5f5] dark:bg-transparent">
        <h4 className="text-sm text-center p-2 font-semibold border-b border-gray-300 dark:border-slate-700">
          BOARD
        </h4>

        <div className="px-2 py-3">
          <h6 className="text-xs mb-3">Text Color</h6>
          <div className="flex justify-between flex-wrap">
            {textColorList.map((data, index) => (
              <ColorButton
                key={index}
                color={data}
                selectedColor={textColor}
                onBoardDataChange={() => onBoardDataChange("textColor", data)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border border-gray-300 dark:border-slate-700 rounded-lg my-3 bg-[#f5f5f5] dark:bg-transparent">
        <h4 className="text-sm text-center border-gray-300 p-2 font-semibold border-b dark:border-slate-700">
          ANNOTATION
        </h4>
        <div className="px-2 py-3">
          <h6 className="text-xs mb-3">Type</h6>
          <div className="flex justify-between">
            {annotationTypeList.map((data, index) => (
              <button
                key={index}
                className={`rounded border p-2 duration-300 hover:bg-[#000] hover:text-white dark:hover:bg-white dark:hover:text-black ${
                  annotationType == data
                    ? "border-green-500 dark:border-green-500"
                    : "border-gray-100 dark:border-slate-700"
                }`}
                onClick={() => onBoardDataChange("annotationType", data)}
              >
                {getIcon(data)}
              </button>
            ))}
          </div>
          <h6 className="text-xs my-3">Color</h6>
          <div className="flex justify-between">
            {annotationColorList.map((data, index) => (
              <ColorButton
                key={index}
                color={data}
                selectedColor={annotationColor}
                onBoardDataChange={() =>
                  onBoardDataChange("annotationColor", data)
                }
              />
            ))}
          </div>
          <h6 className="text-xs my-3">Annotate Text</h6>
          <div>
            <input
              className="border border-gray-300 dark:border-slate-700 dark:bg-transparent dark:text-white px-2 py-1 text-sm rounded w-full text-black"
              type="text"
              onChange={handleAnnotateTextChange}
              value={annotateText}
              placeholder="Enter annotation"
            />
            <button
              className="border-0 w-full p-1 rounded duration-300 hover:shadow-md bg-black text-white text-sm mt-2 disabled:bg-gray-500 opacity-80 hover:opacity-100"
              onClick={() => onAnnotationApplyClick(annotateText)}
              disabled={annotateText.trim().length == 0}
            >
              APPLY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
