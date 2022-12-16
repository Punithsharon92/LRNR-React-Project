import { useContext, useState } from "react";
import SidePanelContext from "../../store/sidepanel-context";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";

import styles from "./SidePanelContent.module.css";
import { NavLink } from "react-router-dom";

// *******************************
// Recursive rendering
// *******************************

const SidePanelContent = (props) => {
  return (
    <div className={styles["side-panel-content"]}>
      <ul>
        {props.data.map((data) => {
          return (
            <SidePanelChildren
              darkMode={props.darkMode}
              node={data}
              key={data.key}
            />
          );
        })}
      </ul>
    </div>
  );
};

const SidePanelChildren = (props) => {
  // accessing context api store
  const panelCtx = useContext(SidePanelContext);

  const [isChildVisible, setIsChildVisible] = useState(true);
  const hasChild = props.node.children ? true : false;

  const activeStyle = styles["side-panel__name-active"];

  const inactiveStyle = props.darkMode
    ? styles.sidepanellight
    : styles.sidepaneldark;

  const isChildVisibleHandler = () => {
    return setIsChildVisible((prevState) => !prevState);
  };

  // This function accesses addSubContainer() from context Api and creates new sub container
  const addSubContainerHandler = (parentId) => {
    panelCtx.addSubContainer({
      name: "sub-container",
      level: 2,
      parentId: parentId,
      id: Math.random(),
      key: Math.random(),
      title: "sub",
      children: [],
    });
    setIsChildVisible(true);
  };

  // This function accesses addLeaf() from context Api and creates new leaf
  const addLeafNodeHandler = (parentId, ancestorId) => {
    panelCtx.addLeaf({
      name: "leaf",
      level: 3,
      parentId: parentId,
      ancestorId: ancestorId,
      id: Math.random(),
      key: Math.random(),
      title: "leaf",
      content: [],
    });

    setIsChildVisible(true);
  };

  // *******************************
  //Recursive rendering continuation
  // *******************************
  return (
    <li className={styles["side-panel-child"]}>
      <span>
        {hasChild && props.node.children.length !== 0 && (
          <span>
            <KeyboardArrowRightIcon
              onClick={isChildVisibleHandler}
              style={{
                transform: isChildVisible && "rotate(45deg)",
              }}
              className={styles["side-panel-child__arrowIcon"]}
            />
          </span>
        )}

        <span
          className={styles["side-panel__name"]}
          onClick={isChildVisibleHandler}>
          {/* Shows Active leaf/containers */}
          <NavLink
            to={
              "/all/" +
              props.node.id +
              "/" +
              props.node.parentId +
              "/" +
              props.node.ancestorId
            }
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }>
            {props.node.name}
          </NavLink>
        </span>
        {hasChild && (
          <span className={styles["side-panel-child__addIcon"]}>
            <AddIcon
              onClick={
                props.node.level === 1
                  ? addSubContainerHandler.bind("", props.node.id)
                  : addLeafNodeHandler.bind(
                      "",
                      props.node.id,
                      props.node.parentId
                    )
              }
            />
          </span>
        )}
      </span>
      {hasChild && isChildVisible && (
        <div>
          <ul>
            <SidePanelContent data={props.node.children} />
          </ul>
        </div>
      )}
    </li>
  );
};

export default SidePanelContent;
