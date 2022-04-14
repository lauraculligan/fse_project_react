import React from "react";
import Message from "./message";
import Search from "../search/index.js"
import * as securityService from "../../services/security-service";
import * as messageService from "../../services/message-service";
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";

const Messages = () => {

    const navigate = useNavigate();
    const [curUser, setUser] = useState({});
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    let toUser = "624f8ae7341bee73a9bb71a2";

    const findMessages = async () =>
        await messageService.getMessagesBetweenUsers(curUser._id, toUser)
            .then(messages => setMessages(messages));
    const sendMessage = async () => {
        let messageToSend = {fromUser: curUser._id,
            toUser: toUser,
            message: message,
            sentOn: new Date()}

        await messageService.sendMessage(messageToSend).then(findMessages);
    }

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
            const msgs = await messageService.getMessagesBetweenUsers(curUser._id, toUser);

            setMessages(msgs);
        } catch (e) {
            navigate('/login');
        }
    },[curUser])

    return(<>
            <h1>Messages Screen</h1>

            <Search/>

            {
                messages.map && messages.map(msg =>
                    <Message message={msg}
                             right={msg.fromUser === curUser._id}/>)
            }

            <div className="p-2 w-100">
                <div className="row align-items-center">
                    <div className="col-10 ttr-font-size-100pc border-2 text-primary">
                   <textarea
                       onChange={(e) =>
                           setMessage(e.target.value)}
                       placeholder="Enter Message..."
                       className="w-100 border-2"
                   ></textarea>
                    </div>
                    <div className="col-2">
                        <button onClick={sendMessage}
                                className={`btn btn-primary rounded-pill fa-pull-left
                                fw-bold ps-4 pe-4`}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Messages;