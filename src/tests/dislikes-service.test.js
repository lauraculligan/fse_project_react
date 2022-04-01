/**
 * @jest-environment node
 */
import {createTuit, deleteTuit, findTuitById} from "../services/tuits-service";
import {createUser, deleteUsersByUsername} from "../services/users-service";
import {findAllTuitsDislikedByUser, userDislikesTuit} from "../services/dislikes-service";

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

const ripleyTuit = {
    tuit: 'test'
}

describe('dislike tuit',  () => {
    // sample user we want to retrieve

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll( async () => {
        // remove any data we created
        await userDislikesTuit(newUser._id, ripleyTuit);
        await deleteTuit(newTuit._id);
        return deleteUsersByUsername(ripley.username);
    })


    test('can dislike a tuit', async () => {
        // insert the user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit);
        // verify inserted user's properties match parameter user
        const dislike = await userDislikesTuit(newUser._id, newTuit._id);
        return dislike == "OK";
    });
});


describe('findDislikesList',  () => {
    // sample user we want to retrieve
    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(ripley.username);
    })

    // clean up after test runs
    afterAll( async () => {
        // remove any data we created
        await userDislikesTuit(newUser._id, ripleyTuit);
        await deleteTuit(newTuit._id);
        return deleteUsersByUsername(ripley.username);
    })


    test('can dislike a tuit', async () => {
        // insert the user in the database
        const newUser = await createUser(ripley);
        const newTuit = await createTuit(newUser._id, ripleyTuit);
        // verify inserted user's properties match parameter user
        await userDislikesTuit(newUser._id, newTuit._id);
        const list = await findAllTuitsDislikedByUser(newUser._id);
        const retrievedTuit = await findTuitById(newTuit._id);
        expect(list[0].tuit).toEqual(retrievedTuit.tuit);
    });
});
