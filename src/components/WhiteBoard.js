import { IconTrash } from "@tabler/icons-react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { RoughNotation } from "react-rough-notation";

const WhiteBoard = ({ action, boardData }) => {
  const [content, setContent] = useState("");
  const [text, setText] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const { annotationColor, textColor, annotationType } = boardData;
  const [annotateList, setAnnotateList] = useState([]);

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

  const handleWrite = (data, i = 0) => {
    let index = i;
    const interval = setInterval(() => {
      if (index <= data.length) {
        setContent(data.slice(0, index));
        let textData = text;
        textData.push({
          text: data[index],
          isAnnotate: false,
          color: textColor,
        })
        setText([...textData]);
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
      let data = matches[0][0];
      setAnnotateList([...annotateList, data]);
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

  // const getWord = () => {
  //   let result = [];
  //   let word = "";
  //   content.split("").forEach((char, i) => {
  //     const isAnnotated = annotatedMap.has(i);
  //     if (isAnnotated) {
  //       word += char;
  //     } else {
  //       if (word.length > 1) {
  //         result.push(word);
  //         word = "";
  //       }
  //       result.push(char);
  //     }
  //     return "";
  //   });
  //   return result;
  // };

  const getWord2 = () => {
    let result = [];
    let word = "";
    text.forEach(( data , i) => {
      const isAnnotated = annotatedMap.has(i);
      const char = data.text;
      if (isAnnotated) {
        word += char;
      } else {
        if (word.length > 1) {
          result.push({ ...data, text: word, isAnnotate:true });
          word = "";
        }
        result.push({ ...data, text: char });
      }
      return "";
    });
    return result;
  };

  // Render content with annotations
  // const renderContent = useMemo(() => {
  //   let result = getWord();
  //   let color = textColor;

  //   return result.map((char, i) => {
  //     const isAnnotated = annotateList.includes(char);

  //     return (
  //       <span key={i} style={{ color }}>
  //         {isAnnotated ? (
  //           <RoughNotation type={annotationType} color={annotationColor} show>
  //             {char}
  //           </RoughNotation>
  //         ) : (
  //           char
  //         )}
  //       </span>
  //     );
  //   });
  // }, [content, annotatedMap, annotationType, annotationColor]);

  const newRenderText = useMemo(() => {
    let result = getWord2();

    return result.map(({ text, color, isAnnotate }, i) => {
      const char = text;
      // const isAnnotated = annotateList.includes(char);

      return (
        <span key={i} style={{ color }}>
          {isAnnotate ? (
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
        // color: textColor,
      }}
    >
      {newRenderText}
      <IconTrash
        onClick={handleClear}
        className={`duration-300 text-black hover:text-rose-700 absolute  bottom-4 right-4 cursor-pointer ${
          text.length > 0 ? "scale-1" : "scale-0"
        }`}
      />
    </div>
  );
};

export default WhiteBoard;
