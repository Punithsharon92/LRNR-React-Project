import Modal from "../../ui/Modal";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";

import styles from "./TeamInvites.module.css";

const TeamInvites = (props) => {
  return (
    <Modal>
      <div className={styles["team-invite"]}>
        <h4>
          Invite more team members for collaboration via WhatApp, Email or
          Message.
        </h4>

        <div>
          <a href='https://web.whatsapp.com/' target='_blank' rel='noreferrer'>
            <WhatsAppIcon style={{ fontSize: "3em" }} />
          </a>
          <a href='mailto:' target='_blank' rel='noreferrer'>
            <EmailIcon style={{ fontSize: "3em" }} />
          </a>
          <a
            href='https://www.messenger.com/desktop'
            target='_blank'
            rel='noreferrer'>
            <MessageIcon style={{ fontSize: "3em" }} />
          </a>
        </div>
        <button onClick={props.toggleInviteModelOpenHandler}>
          <h3>Close</h3>
        </button>
      </div>
    </Modal>
  );
};

export default TeamInvites;
