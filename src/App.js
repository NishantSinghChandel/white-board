import React, { useEffect, useState } from "react";
import WhiteBoard from "./components/WhiteBoard";
import ActionButtons from "./components/ActionButtons";
import { mockAIResponse } from "./services/mockApi";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
const App = () => {
  const [action, setAction] = useState(null);
  const [boardData, setBoardData] = useState({
    annotationType: "underline",
    annotationColor: "orange",
    textColor: "black",
    annotationText: "Lorem Ipsum",
  });
  const theme = useSelector((state) => state.common.theme);

  const triggerWrite = () => {
    const response = mockAIResponse("WRITE");
    setAction(response);
  };

  const triggerAppend = () => {
    const response = mockAIResponse("APPEND");
    setAction(response);
  };

  const triggerAnnotate = () => {
    const response = mockAIResponse("ANNOTATE", {
      regex: "Lorem Ipsum",
      index: 0,
    });
    setAction(response);
  };

  const triggerCustomAnnotation = (text) => {
    const response = mockAIResponse("CUSTOM_ANNOTATE", {
      regex: text,
      index: 0,
    });
    setAction(response);
  };

  const handleBoardDataChange = (key, value) => {
    setBoardData({ ...boardData, [key]: value });
  };

  const handleAnnotationApplyClick = (text) => {
    triggerCustomAnnotation(text);
  };

  return (
    <main className={theme} style={{ height: "100vh" }}>
      <Navbar />
      <div className="bg-[#f9f9f9] dark:bg-slate-900 dark:text-gray-100 h-full">
        <Sidebar
          onBoardDataChange={handleBoardDataChange}
          onAnnotationApplyClick={handleAnnotationApplyClick}
          boardData={boardData}
        />
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
          <ActionButtons
            onWrite={triggerWrite}
            onAppend={triggerAppend}
            onAnnotate={triggerAnnotate}
          />
          <WhiteBoard action={action} boardData={boardData} />
        </div>
      </div>
    </main>
  );
};

export default App;
