import { IconTrash } from "@tabler/icons-react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { RoughNotation } from "react-rough-notation";

const WhiteBoard = ({ action, boardData }) => {
  const [content, setContent] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const { annotationColor, textColor, annotationType } = boardData;

  const whiteboardRef = useRef(null);

  useEffect(() => {
    if (action) {
      const { mode, text, regex, index } = action;
      switch (mode) {
        case "WRITE":
          handleWrite(text);
          break;
        case "APPEND":
          handleAppend(text);
          break;
        case "ANNOTATE":
          handleAnnotate(regex, index);
          break;
        case "CUSTOM_ANNOTATE":
          handleAnnotate(regex, index);
          break;
      }
    }
  }, [action]);

  const handleWrite = (text, i = 0) => {
    let index = i;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setContent(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  };

  const handleAppend = (text) => {
    handleWrite(content + text, content.length);
  };

  const handleAnnotate = (regex, index) => {
    const matches = [...content.matchAll(new RegExp(regex, "g"))];
    if (matches.length > index) {
      const match = matches[index];
      console.log(match, match.index);
      const start = match.index;
      const end = start + match[0].length;
      setAnnotations((prev) => [...prev, { start, end }]);
    }
  };

  const handleClear = () => {
    setAnnotations([]);
    setContent("");
  };

  // Optimize annotation lookups
  const annotatedMap = useMemo(() => {
    const map = new Set();
    annotations.forEach(({ start, end }) => {
      for (let i = start; i < end; i++) map.add(i);
    });
    return map;
  }, [annotations]);

  // Render content with annotations
  const renderContent = useMemo(() => {
    return content.split("").map((char, i) => {
      const isAnnotated = annotatedMap.has(i);
      return (
        <span key={i}>
          {isAnnotated ? (
            <RoughNotation type={annotationType} color={annotationColor} show>
              {char}
            </RoughNotation>
          ) : (
            char
          )}
        </span>
      );
    });
  }, [content, annotatedMap, annotationType, annotationColor]);

  return (
    <div
      ref={whiteboardRef}
      className={`p-4 relative rounded-b-md border-gray-200 border text-md bg-white min-h-[400px] `}
      style={{
        fontFamily: "'Roboto', sans-serif",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
        color: textColor,
      }}
    >
      {renderContent}
      <IconTrash
        onClick={handleClear}
        className={`duration-300 hover:text-rose-700 absolute  bottom-4 right-4 cursor-pointer ${
          content.length > 0 ? "scale-1" : "scale-0"
        }`}
      />
    </div>
  );
};

export default WhiteBoard;
