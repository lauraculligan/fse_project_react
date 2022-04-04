import React from "react";
import Message from "./message";
const Messages = () => {
    let sampleMessage = {fromUser: "bob",
        toUser: "carl",
        message: "A message body that was sent",
        sentOn: new Date()}
    let sampleMessage2 = {fromUser: "bob",
        toUser: "carl",
        message: "A message body that was sent back",
        sentOn: new Date()}

  return(<>
        <h1>Messages Screen</h1>
        <Message message={sampleMessage}
        right ={true}
        />
          <Message message={sampleMessage2}
                   right ={false}
          />

      </>

  );
};
export default Messages;