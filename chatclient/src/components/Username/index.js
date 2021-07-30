import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const Username = (props) => {

  const [username, setUsername] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(username);
    history.push("/chat");
  };

  return (
    <div
      background={process.env.PUBLIC_URL + "/18.jpeg"}
      style={{
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div id="username-page">
        <div className="username-page-container">
          <h1 className="title">Type your username</h1>
          <form id="usernameForm" name="usernameForm" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autoComplete="off"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="accent username-submit">
                Start Chatting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
