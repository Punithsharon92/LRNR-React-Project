import { useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import SidePanelContent from "./SidePanelContent";

import styles from "./SidePanelMain.module.css";
import SidePanelContext from "../../store/sidepanel-context";
import SidePanelGraphView from "./SidePanelGraphView";
import { Route, Routes } from "react-router-dom";

// const sidePanelData = [
//   {
//     key: "0",
//     label: "Documents",
//     icon: "fa fa-folder",
//     title: "Documents Folder",
//     children: [
//       {
//         key: "0-0",
//         label: "Document 1-1",
//         icon: "fa fa-folder",
//         title: "Documents Folder",
//         children: [
//           {
//             key: "0-1-1",
//             label: "Document-0-1.doc",
//             icon: "fa fa-file",
//             title: "Documents Folder",
//           },
//           {
//             key: "0-1-2",
//             label: "Document-0-2.doc",
//             icon: "fa fa-file",
//             title: "Documents Folder",
//           },
//           {
//             key: "0-1-3",
//             label: "Document-0-3.doc",
//             icon: "fa fa-file",
//             title: "Documents Folder",
//           },
//           {
//             key: "0-1-4",
//             label: "Document-0-4.doc",
//             icon: "fa fa-file",
//             title: "Documents Folder",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: "1",
//     label: "Desktop",
//     icon: "fa fa-desktop",
//     title: "Desktop Folder",
//     children: [
//       {
//         key: "1-0",
//         label: "document1.doc",
//         icon: "fa fa-file",
//         title: "Documents Folder",
//       },
//       {
//         key: "0-0",
//         label: "documennt-2.doc",
//         icon: "fa fa-file",
//         title: "Documents Folder",
//       },
//     ],
//   },
//   {
//     key: "2",
//     label: "Downloads",
//     icon: "fa fa-download",
//     title: "Downloads Folder",
//     children: [],
//   },
// ];

const SidePanelMain = (props) => {
  // accessing context api store
  const panelCtx = useContext(SidePanelContext);

  // This function accesses addContainer() from context Api and creates new main container
  const addMainContainerHandler = () => {
    panelCtx.addContainer({
      name: "main-container",
      level: 1,
      id: Math.random(),
      key: Math.random(),
      title: "main-container",
      children: [],
    });
  };

  return (
    // side panel container layout amd rendering content
    <div className={styles.sidepanel}>
      <div className={styles["sidepanel-main__wrapper"]}>
        <div className={styles["sidepanel-main__menu-options"]}>
          {/* Controls to add containers */}
          <ul>
            <li>
              <AddIcon
                style={{ color: "rgb(240, 0, 0)" }}
                onClick={addMainContainerHandler}
              />
            </li>
            <li>
              <OpenInFullIcon />
            </li>
            <li onClick={props.toggleSidePanelHandler}>
              <KeyboardDoubleArrowLeftIcon />
            </li>
          </ul>
        </div>

        <div className={styles["sidepanel-main__content"]}>
          {/* Nested Routes to Navigate inside Side Panel */}
          <Routes>
            <Route
              path='all/*'
              element={
                <SidePanelContent
                  darkMode={props.darkMode}
                  data={panelCtx.items.items}
                />
              }
            />
            <Route
              path='board'
              element={
                <span style={{ padding: "30%" }}>No Content to Show</span>
              }
            />
            <Route
              path='graph'
              element={
                <div>
                  <SidePanelGraphView />
                </div>
              }
            />
            <Route
              path='recent'
              element={
                <span style={{ padding: "30%" }}>No Content to Show</span>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SidePanelMain;
