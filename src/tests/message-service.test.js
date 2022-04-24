/**
 * @jest-environment node
 */

import {
    getMessagesISent, getMessagesSentToMe,
    sendMessage, getMessagesBetweenUsers
} from "../services/message-service";

import {createUser, deleteUsersByUsername} from "../services/users-service";

describe('can send message with REST API', () => {
    const sender = {
        username: 'sender',
        password: 'sender',
        email: 'sender@hotmail.com'
    };
    const receiver = {
        username: 'receiver',
        password: 'receiver',
        email: 'receiver@hotmail.com'
    };

    // setup test before running test
    beforeAll( () => {
        // remove any/all users to make sure we create it in the test
        deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    // clean up after test runs
    afterAll( () => {
        // remove any data we created
        deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    test('can send a message with REST API', async () => {
        // insert new users in the database
        const newSender  = await createUser(sender);
        const newReceiver = await createUser(receiver);
        // send message between users
        const messageToSend = {
            fromUser: newSender._id,
            toUser: newReceiver._id,
            message: "hi",
            sentOn: new Date()
        };
        const sentMessage = await sendMessage(messageToSend);
        // verify message properties match parameter message
        expect(sentMessage.message).toEqual(messageToSend.message);
    });
});


describe('can get messages I received with REST API', () => {
    const sender = {
        username: 'sender',
        password: 'sender',
        email: 'sender@hotmail.com'
    };
    const receiver = {
        username: 'receiver',
        password: 'receiver',
        email: 'receiver@hotmail.com'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    test('can get messages I received with REST API', async () => {
        // insert new users in the database
        const newSender  = await createUser(sender);
        const newReceiver = await createUser(receiver);
        // send message between users
        const messageToSend = {
            fromUser: newSender._id,
            toUser: newReceiver._id,
            message: "hi",
            sentOn: new Date()
        };
        const sentMessage = await sendMessage(messageToSend);
        // get messages sent to receiver
        const receivedMessages = await getMessagesSentToMe(newReceiver._id);
        // verify message properties match parameter message
        expect(receivedMessages.length).toBeGreaterThanOrEqual(1);
        expect(receivedMessages[0].message).toEqual(messageToSend.message);
    });
});

describe('can get messages I sent with REST API', () => {
    const sender = {
        username: 'sender',
        password: 'sender',
        email: 'sender@hotmail.com'
    };
    const receiver = {
        username: 'receiver',
        password: 'receiver',
        email: 'receiver@hotmail.com'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    test('can get messages I sent with REST API', async () => {
        // insert new users in the database
        const newSender  = await createUser(sender);
        const newReceiver = await createUser(receiver);
        // send message between users
        const messageToSend = {
            fromUser: newSender._id,
            toUser: newReceiver._id,
            message: "hi",
            sentOn: new Date()
        };
        const sentMessage = await sendMessage(messageToSend);
        // get messages sent to receiver
        const receivedMessages = await getMessagesISent(newSender._id);
        // verify message properties match parameter message
        expect(receivedMessages.length).toBeGreaterThanOrEqual(1);
        expect(receivedMessages[0].message).toEqual(sentMessage.message);
    });
});

describe('can get messages sent between users with REST API', () => {
    const sender = {
        username: 'sender',
        password: 'sender',
        email: 'sender@hotmail.com'
    };
    const receiver = {
        username: 'receiver',
        password: 'receiver',
        email: 'receiver@hotmail.com'
    };

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    // clean up after test runs
    afterAll(async () => {
        // remove any data we created
        await deleteUsersByUsername(sender.username);
        return deleteUsersByUsername(receiver.username);
    })

    test('can get messages sent between users with REST API', async () => {
        // insert new users in the database
        const newSender  = await createUser(sender);
        const newReceiver = await createUser(receiver);
        // send message between users
        const messageToSend = {
            fromUser: newSender._id,
            toUser: newReceiver._id,
            message: "hi",
            sentOn: new Date()
        };
        const sentMessage = await sendMessage(messageToSend);
        // get messages sent to receiver
        const receivedMessages = await getMessagesBetweenUsers(newSender._id, newReceiver._id);
        // verify message properties match parameter message
        expect(receivedMessages.length).toBeGreaterThanOrEqual(1);
        expect(receivedMessages[0].message).toEqual(sentMessage.message );
    });
});