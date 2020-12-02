import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import styles from "./Chat.module.css";

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

  const renderMessages = messages.map((message, i) => <div key={i}>{message}</div>);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.chatName}>nome</div>
        <div className={styles.chatIcons}>
          <FontAwesomeIcon icon={faWindowMinimize} size="xs" />
          <FontAwesomeIcon icon={faTimes} size="xs" />
        </div>
      </div>
      <div className={styles.messages}>
        {renderMessages}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.message}>
        <input type="text" name="message" onKeyPress={(e) => handlerMessage(e)} />
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
