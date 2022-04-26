import React from "react";
import Message from "./message";
import * as securityService from "../../services/security-service";
import * as messageService from "../../services/message-service";
import {useEffect, useState} from "react"
import {useNavigate, useLocation} from "react-router-dom";
import {findUserById} from "../../services/users-service";


const Messages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [curUser, setUser] = useState({});
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [receiveUser, setReceiveUser] = useState({});
    const [toUsername] = useState("");
    let endOfPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    let toUser = curUser._id;
    if (endOfPath != "messages") {
        toUser = endOfPath;
    }

    const findMessages = async () =>
        await messageService.getMessagesBetweenUsers(curUser._id, toUser)
            .then(messages => setMessages(messages));
    const sendMessage = async () => {
        let messageToSend = {fromUser: curUser._id,
            toUser: toUser,
            message: message,
            sentOn: new Date()}

        await messageService.sendMessage(messageToSend).then(findMessages);
        setMessage('');
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
            const user = await findUserById(toUser);
            setReceiveUser(user);
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
            <h2 style={{ color: 'blue', lineHeight : 1, padding: 2, border: '3px outset #9bb5de'}}>{receiveUser.username}</h2>
            
            <div className={"fsep-messageScroller"}>
            {
                messages.map && messages.map(msg =>
                    <Message message={msg}
                             right={msg.fromUser === curUser._id}/>)
            }
            </div>
            <div className="p-2 w-100">
                <div className="row align-items-center">
                    <div className="col-10 ttr-font-size-100pc border-2 text-primary">
                   <textarea
                       onChange={(e) =>
                           setMessage(e.target.value)}
                       placeholder="Enter Message..."
                       value = {message}
                       className="w-100 border-2 rounded-pill ps-4"
                   ></textarea>
                    </div>
                    <div className="col-2">
                        <button onClick={sendMessage}
                                className={`btn btn-primary rounded-pill fa-pull-left
                                fw-bold mb-2 ps-4 pe-4`}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Messages;