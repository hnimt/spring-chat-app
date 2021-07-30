import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ChatForm from "./components/ChatForm";
import Username from "./components/Username";

let stompClient;
let sock;

function App() {
  const [curUsername, setCurUsername] = useState("");
  const [userState, setUserState] = useState([]);
  const [messState, setMessState] = useState([]);

  const handleSubmit = (username) => {

    sock = new SockJS("http://localhost:8080/chatapp");
    stompClient = Stomp.over(sock);

    stompClient.connect({}, () => onConnected(username));
  };

  const onConnected = (username) => {
    // Subscribe to the Public Topic
    stompClient.subscribe("/topic/public", onMessageReceived);
    // Tell your username to the server
    stompClient.send(
      "/app/chat.register",
      {},
      JSON.stringify({ sender: username, type: "JOIN" })
    );
  };

  const onMessageReceived = async (payload) => {
    let message = await JSON.parse(payload.body);
    console.log(stompClient);

    if (message.type === "JOIN") {
      setUserState((userState) => [...userState, message.sender]);
      setCurUsername(message.sender);
    } else {
      setMessState((messState) => [...messState, message]);
    }
  };

  const handleSendMessage = (message, username) => {
    console.log(message);
    if (message) {
      console.log("test");
      let chatMessage = {
        sender: username,
        content: message,
        type: "CHAT",
      };
      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Route
          exact
          path="/username"
          render={(props) => (
            <Username {...props} handleSubmit={handleSubmit} />
          )}
        />

        <Route
          exact
          path="/chat"
          render={(props) => (
            <ChatForm
              {...props}
              userProp={userState}
              curUsername={curUsername}
              messProp={messState}
              handleSendMessage={handleSendMessage}
            />
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
