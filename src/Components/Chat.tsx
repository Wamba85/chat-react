import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";
import styles from "./Chat.module.css";
import noAvatar from "../images/no-avatar.jpg";
import { stringify } from "querystring";

// import PropTypes from 'prop-types'
type chatProps = {
  user: string;
  left: string;
};

type message = {
  user: string;
  text: string;
};

const Chat = ({ user, left }: chatProps) => {
  const [messages, setMessages] = useState<message[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:6969");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    return () => {
      ws?.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const message = { user: data.user, text: data.text };
      setMessages((messages) => [...messages, message]);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handlerMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const msg = {
        type: "message",
        text: e.currentTarget.value,
        user: user,
        date: Date.now(),
      };
      ws.current?.send(stringify(msg));
      e.currentTarget.value = "";
    }
  };
  const scrollToBottom = () => {
    console.log(`bottom ${user} ${messagesEndRef?.current?.id}`);
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [messages, user]);

  const renderMessages = messages.map((message, i) => (
    <div key={i} className={`${styles.chatMessage} ${user === message.user ? styles.chatMessageRight : ""}`}>
      <span className={`${styles.chatAvatar} ${user === message.user ? styles.chatAvatarRight : ""}`}>
        <img src={noAvatar} alt="avatar" className={styles.chatAvatarImg} />
      </span>
      <p className={`${styles.chatText} ${user === message.user ? styles.chatTextRight : ""}`}>
        {message.user}: {message.text}
      </p>
    </div>
  ));
  return (
    <div className={styles.container} style={{ right: left }}>
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
          <div id={user} ref={messagesEndRef} />
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
