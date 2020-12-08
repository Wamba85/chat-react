import React from "react";

import styles from "./Conversation.module.css";
import noAvatar from "../images/no-avatar.jpg";

const Conversation = () => {
  return (
    <div className={styles.container}>
      <span className={styles.conversationAvatar}>
        <img src={noAvatar} alt="avatar" className={styles.conversationAvatarImg} />
      </span>
      <p className={styles.conversationName}>Nome</p>
    </div>
  );
};

export default Conversation;
