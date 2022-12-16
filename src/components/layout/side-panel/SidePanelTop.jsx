import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";

import styles from "./SidePanelTop.module.css";

const SidePanelTop = (props) => {
  const activeStyle = styles["sidepanel-top__active"];
  const inactiveStyle = props.darkMode
    ? styles["sidepanel-top__darkmode-inactive"]
    : styles["sidepanel-top__lightmode-inactive"];

  return (
    <div className={styles["sidepanel-top"]}>
      <ul>
        <li>
          <NavLink
            to='/all'
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }>
            All
          </NavLink>
        </li>
        <NavLink
          to='/board'
          className={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
          <li>Board</li>
        </NavLink>
        <NavLink
          to='/graph'
          className={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
          <li>Graph</li>
        </NavLink>
        <NavLink
          to='/recent'
          className={({ isActive }) =>
            isActive ? activeStyle : inactiveStyle
          }>
          <li>Recent</li>
        </NavLink>
        <MoreVertIcon
          sytle={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        />
      </ul>
    </div>
  );
};
export default SidePanelTop;
