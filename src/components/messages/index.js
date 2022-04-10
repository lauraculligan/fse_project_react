import React from "react";
import Message from "./message";
import * as securityService from "../../services/security-service";
import * as messageService from "../../services/message-service";
import {useEffect, useState} from "react"
import { useNavigate} from "react-router-dom";


const Messages = () => {

    const navigate = useNavigate();
    const [curUser, setUser] = useState({});
    const [messages, setMessages] = useState({});
    useEffect(async () => {
        try {
            const user = await securityService.profile();
            setUser(user);
        } catch (e) {
            navigate('/login');
        }
    }, []);
    useEffect(async () => {
        try {
            const msgs = await messageService.getMessagesBetweenUsers(curUser._id, "624f8ae7341bee73a9bb71a2");

            setMessages(msgs);
        } catch (e) {
            navigate('/login');
        }
    },[curUser])
  return(<>
        <h1>Messages Screen</h1>

          {
              messages.map && messages.map(msg =>
                                         <Message message={msg}
                                         right={msg.fromUser === curUser._id}/>)
          }
      </>

  );
};
export default Messages;