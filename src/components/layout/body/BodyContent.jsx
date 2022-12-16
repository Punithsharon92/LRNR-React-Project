import React, { useContext, useState } from "react";
import Content from "./Content";
import Title from "./Title";

import styles from "./BodyContent.module.css";
import { Route, Routes } from "react-router-dom";
import NoContentDisplay from "./NoContentDisplay";
import SidePanelContext from "../../store/sidepanel-context";

const BodyContent = () => {
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const [allIds, setAllIds] = useState();
  const panelCtx = useContext(SidePanelContext);

  // geting the title data entered and storing it in respective state variable
  const getTitleHandler = (title, params) => {
    setTitle(title);
    setAllIds(params);
  };

  //dispatching title and content text data entered by user to reducer
  const addLeafContentHandler = () => {
    alert("Your Data is Saved");
    panelCtx.addLeafContents({
      name: "leaf-content",
      allIds: allIds,
      content: {
        id: Math.random(),
        title: title,
        contentText: contentText,
      },
    });
  };

  // geting the content text data entered and storing it in respective state variable
  const getContentTextHandler = (contentText) => {
    setContentText(contentText);
  };

  return (
    <div className={styles["body-content"]}>
      {/* wysiwyg-rendering Title and Content */}
      <Routes>
        <Route
          path='all/:id/:parentId/:ancestorId'
          element={
            <div>
              <Title getTitleHandler={getTitleHandler} />
              <Content getContentTextHandler={getContentTextHandler} />
              <button onClick={addLeafContentHandler}>save</button>
            </div>
          }
        />
        <Route
          path='/*'
          element={
            <div>
              <NoContentDisplay />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default BodyContent;
