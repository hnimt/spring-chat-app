import React, { useEffect, useState } from "react";
import "./style.css";

const ChatForm = (props) => {
  const { userProp, curUsername, messProp } = props;

  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if(user === "") {
      setUser(curUsername);
    }
  }, [curUsername]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.handleSendMessage(message, user);
    setMessage("");
  };

  return (
    <div id="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Minh Global Chat Box</h2>
        </div>
        <div>
          {userProp.map((username) => <div style={{textAlign:"center"}}>{`${username} joinded`}</div>)}
        </div>
        <ul id="messageArea">
          {messProp.map(mess => <li>{`${mess.sender}: ${mess.content}`}</li>)}
        </ul>
        <form
          id="messageForm"
          name="messageForm"
          nameform="messageForm"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="form-group">
            <div className="input-group clearfix">
              <input
                type="text"
                id="message"
                placeholder="Type a message..."
                autoComplete="off"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="primary">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
