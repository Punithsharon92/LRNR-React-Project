import React, { useEffect, useState } from "react";
import { ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./Title.module.css";
import { useParams } from "react-router-dom";

// Have segregated Title and content for better management and undeerstanding

const Title = (props) => {
  const params = useParams(); // captures the id of the node clicked

  // ****************
  // wysiwyg draft
  // ****************
  let _contentState = ContentState.createFromText("Title");
  const raw = convertToRaw(_contentState);

  const [contentState, setContentState] = useState(raw); // ContentState RAW JS
  const title = contentState.blocks[0].text; // extracting title text entered by user

  // (Debouncing using useEffect)
  useEffect(() => {
    let recievedData = setTimeout(() => {
      // passing data to parent which is later passed to reducer along with contenttext for storage
      props.getTitleHandler(title, params);
    }, 1000);
    //Clean Up Function
    return () => {
      clearTimeout(recievedData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className={styles.title}>
      {/* adds editor and it's "components" as per your needs */}
      <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName={styles["wrapper-title"]}
        editorClassName={styles["editor-title"]}
        toolbarClassName={styles["toolbar-title"]}
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

export default Title;
