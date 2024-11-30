import React, { useState, useRef, useEffect } from "react";
import { RoughNotation } from "react-rough-notation";

const WhiteBoard = ({ action, boardData }) => {
  const [content, setContent] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const { annotationColor, textColor, annotationType } = boardData;

  const whiteboardRef = useRef(null);

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
    console.log(matches);
    if (matches.length > index) {
      const match = matches[index];
      console.log(match, match.index);
      const start = match.index;
      const end = start + match[0].length;
      console.log(start, end);
      setAnnotations((prev) => [...prev, { start, end }]);
    }
  };

  const handleCustomAnnotate = (regex, index) => {
    const matches = [...content.matchAll(new RegExp(regex, "g"))];
    console.log(matches);
    if (matches.length > index) {
      const match = matches[index];
      console.log(match, match.index);
      const start = match.index;
      const end = start + match[0].length;
      console.log(start, end);
      setAnnotations((prev) => [...prev, { start, end }]);
    }
  };

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
          handleCustomAnnotate(regex, index);
          break;
      }
    }
  }, [action]);

  return (
    <div
      ref={whiteboardRef}
      className={`p-4 relative rounded-b-md border-gray-200 border  text-md bg-white min-h-[400px] `}
      style={{
        fontFamily: "'Roboto', sans-serif",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
        color: textColor,
      }}
    >
      {content.split("").map((char, i) => {
        const isAnnotated = annotations.some(
          (ann) => i >= ann.start && i < ann.end
        );
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
      })}
    </div>
  );
};

export default WhiteBoard;
