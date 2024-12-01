import React, { useState, useCallback } from "react";
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

  const handleTriggerAction = useCallback((mode, additionalParams = {}) => {
    const response = mockAIResponse(mode, additionalParams);
    setAction(response);
  }, []);

  const handleBoardDataChange = useCallback((key, value) => {
    setBoardData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAnnotationApplyClick = useCallback(
    (text) => {
      handleTriggerAction("CUSTOM_ANNOTATE", { regex: text, index: 0 });
    },
    [handleTriggerAction]
  );

  return (
    <main className={theme} style={{ height: "100vh" }}>
      <Navbar />
      <div className="bg-[#f9f9f9] dark:bg-slate-900 dark:text-gray-100 h-full">
        <Sidebar
          onBoardDataChange={handleBoardDataChange}
          onAnnotationApplyClick={handleAnnotationApplyClick}
          boardData={boardData}
        />
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <ActionButtons
            onWrite={() => handleTriggerAction("WRITE")}
            onAppend={() => handleTriggerAction("APPEND")}
            onAnnotate={() =>
              handleTriggerAction("ANNOTATE", {
                regex: "Lorem Ipsum",
                index: 0,
              })
            }
          />
          <WhiteBoard action={action} boardData={boardData} />
        </div>
      </div>
    </main>
  );
};

export default App;
