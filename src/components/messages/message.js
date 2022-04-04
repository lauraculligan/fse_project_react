const Message = ({message, right}) => {
    let date = message.sentOn
    let dateString = date.toDateString().substring(0,date.toDateString().length-4)
    dateString +=  " " + date.getHours().toString()
    dateString +=  ":" + date.getMinutes().toString()
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
        <div className={`${messageClass}`}>
            {message.message}
            <span className={`${dateClass}`}>{dateString}</span>

        </div>
    );
};
export default Message;