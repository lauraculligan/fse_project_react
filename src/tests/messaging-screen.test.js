import Message from "../components/messages";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {getMessagesISent, getMessagesSentToMe} from "../services/message-service";
import axios from "axios";

const MESSAGE = [{sentOn: new Date("01-01-2022"), message: 'message'}]

test('message list renders static message', () => {
    render(
        <HashRouter>
            <Message message={MESSAGE[0]} right={true}/>
        </HashRouter>);
    const linkElement = screen.getByText(/message/i);
    expect(linkElement).toBeInTheDocument();

});

test('tuit list renders async', async () => {
    const messages = await getMessagesISent("62408d017366153f0b764b43");
    const message = messages[0]
    render(
        <HashRouter>
            <Message message={message} right={true}/>
        </HashRouter>);
    const linkElement = screen.getByText(/1/i);
    expect(linkElement).toBeInTheDocument();
})

test('message list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({ data: {messages: MESSAGE} }));
    const response = await getMessagesISent("62408d017366153f0b764b43");
    const MESSAGES = response.messages;
    render(
        <HashRouter>
            <Message message={MESSAGES[0]} right={true}/>
        </HashRouter>);
    const linkElement = screen.getByText(/message/i);
    expect(linkElement).toBeInTheDocument();
    mock.mockRestore();
});