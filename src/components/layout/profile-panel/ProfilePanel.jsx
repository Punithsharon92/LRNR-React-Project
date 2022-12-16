import styles from "./ProfilePanel.module.css";
import Switch from "@mui/material/Switch";

const ProfilePanel = (props) => {
  console.log(props.darkMode);
  return (
    <div
      className={styles["profile-panel"]}
      style={{
        backgroundColor: props.darkMode ? "grey" : "white",
        color: props.darkMode ? "white" : "black",
      }}>
      {/*setting background color for profile panel based on dark/Light mode */}
      <ul>
        <li>
          Dark Mode{" "}
          <span>
            <Switch
              inputProps={{ "aria-label": "Color switch demo" }}
              checked={props.darkMode && "defaultChecked"}
              onChange={props.darkModeHandler}
            />
          </span>
        </li>
        <li>Profile</li>
        <hr />
        <li>What's new</li>
        <li>Help</li>
        <li>Send feedback</li>
        <li> Hints and shortcuts</li>
        <hr />
        <li>Log out</li>
      </ul>
    </div>
  );
};

export default ProfilePanel;
