import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li onClick={props.toggleSidePanelHandler}>
          <MenuIcon /> {/* Hamburger-Menu bar icon */}
        </li>

        <li className={styles.navbar__search}>
          <SearchIcon />
          <input type='text' name='search' id='search' placeholder='dfin' />
        </li>

        <li onClick={props.toggleInviteModelOpenHandler}>
          <PersonAddIcon /> {/* Invite Team Member icon */}
          <span>Invite Team Member</span>
        </li>

        <li>
          <NotificationsNoneIcon />
        </li>

        <li onClick={props.toggleProfilePanelHandler}>
          <AccountCircleIcon /> {/* ProfilePanel icon */}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
