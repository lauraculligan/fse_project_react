import Message from "../components/messages";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {getMessagesISent, getMessagesSentToMe} from "../services/message-service";
import axios from "axios";
import Search from "../components/search";
import SearchResults from "../components/search/search";
import {searchUserByName} from "../services/users-service";


const MESSAGE = [{sentOn: new Date("01-01-2022"), message: 'message'}]

const USERS = [{
    username: 'findme',
    password: 'findme',
    email: 'email@hotmail.com'
}];
test('searchRenders static Search', () => {
    render(
        <HashRouter>
            <SearchResults users={USERS} />
        </HashRouter>);
    const linkElement = screen.getByText(/@findme/i);
    expect(linkElement).toBeInTheDocument();

});

test('tuit list renders async', async () => {
    const users = await searchUserByName("cow");

    render(
        <HashRouter>
            <SearchResults users={users} />
        </HashRouter>);
    const linkElement = screen.getByText(/@cow/i);
    expect(linkElement).toBeInTheDocument();
})
