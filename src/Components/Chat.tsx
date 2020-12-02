import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import styles from "./Chat.module.css";
import noAvatar from "../images/no-avatar.jpg";

// import PropTypes from 'prop-types'

const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const handlerMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setMessages([...messages, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };
  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [messages]);

  const renderMessages = messages.map((message, i) => (
    <div key={i} className={`${styles.chatMessage} ${i % 2 === 0 ? styles.chatMessageRight : ""}`}>
      <span className={`${styles.chatAvatar} ${i % 2 === 0 ? styles.chatAvatarRight : ""}`}>
        <img src={noAvatar} alt="avatar" className={styles.chatAvatarImg} />
      </span>
      <p className={`${styles.chatText} ${i % 2 === 0 ? styles.chatTextRight : ""}`}>{message}</p>
    </div>
  ));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.chatName}>Nome Conversazione</div>
        <div className={styles.chatIcon}>
          <FontAwesomeIcon icon={faWindowMinimize} size="sm" />
        </div>
        <div className={styles.chatIcon}>
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </div>
      </div>
      <div className={styles.messagesWrapper}>
        <div className={styles.messages}>
          {renderMessages}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <input
          className={styles.inputText}
          type="text"
          name="message"
          autoComplete="off"
          placeholder="Write something..."
          onKeyPress={(e) => handlerMessage(e)}
        />
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
