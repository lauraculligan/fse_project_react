const Message = ({message, right}) => {
    let dateString = ""
    try {
        let date = message.sentOn
        dateString = date.toDateString().substring(0,date.toDateString().length-4)
        dateString +=  " " + date.getHours().toString()
        dateString +=  ":" + date.getMinutes().toString() + " "
    } catch (e){
        dateString = message.sentOn.substring(11,16)
    }


    let messageClass = "fsep-messageCont"
    let dateClass = "fsep-messageDate"
    if (right) {
        messageClass += " right"
        dateClass += " right"
    } else {
        messageClass += " left"
        dateClass += " left"
    }
    return(
        <div className={"row"}>
        <div className={`${messageClass}`}>
            <span>{message.message}</span>
            <span className={`${dateClass}`}>{dateString}</span>

        </div>
        </div>
    );
};
export default Message;