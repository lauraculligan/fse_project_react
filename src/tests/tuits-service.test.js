/**
 * @jest-environment node
 */
import {
    createTuit,
    findTuitByUser, findAllTuits,
    findTuitById, updateTuit, deleteTuit
} from "../services/tuits-service";

import {createUser, deleteUsersByUsername, findUserById} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const ripleyTuit = {
        tuit: 'test'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteUsersByUsername(ripley.username);
    })

    test('can insert new tuits with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit)
        // verify inserted user's properties match parameter user
        expect(newTuit.tuit).toEqual(ripleyTuit.tuit);
        await deleteTuit(newTuit._id);
    });
});

describe('can delete tuit wtih REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const ripleyTuit = {
        tuit: 'test'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        //deleteTuit(ripleyTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        //deleteTuit(ripleyTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    test('can insert new tuits with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit)
        // verify inserted user's properties match parameter user

        const status = await deleteTuit(newTuit._id);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const ripleyTuit = {
        tuit: 'test'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        //deleteTuit(ripleyTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        //deleteTuit(ripleyTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    test('can get new tuits with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit);
        const retrievedTuit = await findTuitById(newTuit._id);
        // verify inserted tuit
        expect(retrievedTuit.tuit).toEqual(ripleyTuit.tuit);
        await deleteTuit(newTuit._id);
    });
});

describe('can retrieve all tuits with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const ripleyTuit1 = {
        tuit: 'test1'
    }
    const ripleyTuit2 = {
        tuit: 'test2'
    }

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        //deleteTuit(ripleyTuit._id);
        return deleteUsersByUsername(ripley.username);
    })

    test('can get new tuits with REST API', async () => {
        // insert new user in the database
        const newUser = await createUser(ripley);
        const newTuit1 = await createTuit(newUser._id, ripleyTuit1)
        const newTuit2 = await createTuit(newUser._id, ripleyTuit2)
        const retrievedTuits = await findAllTuits()
        expect(retrievedTuits.length).toBeGreaterThanOrEqual(2);

        const retrievedTuit1 = await findTuitById(newTuit1._id)
        // verify inserted tuit
        expect(retrievedTuit1.tuit).toEqual(ripleyTuit1.tuit);
        const retrievedTuit2 = await findTuitById(newTuit2._id)
        // verify inserted tuit
        expect(retrievedTuit2.tuit).toEqual(ripleyTuit2.tuit);


        await deleteTuit(newTuit1._id);
        await deleteTuit(newTuit2._id);
    });
});