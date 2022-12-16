import React, { useEffect, useState } from "react";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./Content.module.css";

const Content = (props) => {
  let _contentState = ContentState.createFromText(
    "Click here to show editor's tab and enter your content"
  );
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw); // ContentState RAW JS
  const contentText = contentState.blocks[0].text; // extracting content text entered by user

  // (Debouncing using useEffect)
  useEffect(() => {
    let recievedData = setTimeout(() => {
      // passing data to parent which is later passed to reducer along with title for storage
      props.getContentTextHandler(contentText);
    }, 1000);
    //Clean Up Function
    return () => {
      clearTimeout(recievedData);
    };
  }, [contentText, props]);

  return (
    <div className={styles.content}>
      <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName={styles["wrapper-content"]}
        editorClassName={styles["editor-content"]}
        toolbarClassName={styles["toolbar-content"]}
        toolbarOnFocus
        toolbar={{
          options: ["inline", "list", "textAlign", "colorPicker", "history"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
            ],
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
          },
        }}
      />
    </div>
  );
};
export default Content;
