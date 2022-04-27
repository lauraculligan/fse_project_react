/**
 * @jest-environment node
 */



import {createUser, deleteUsersByUsername, searchUserByName} from "../services/users-service";

describe('can search for user that is/isnt there', () => {
    const searchedFor = {
        username: 'findme',
        password: 'findme',
        email: 'findme@hotmail.com'
    };


    // setup test before running test
    beforeAll( () => {
        // remove any/all users to make sure we create it in the test
        return deleteUsersByUsername(searchedFor.username);

    })

    // clean up after test runs
    afterAll( () => {
        // remove any data we created
        return deleteUsersByUsername(searchedFor.username);
    })

    test('can send a search and find noone with that name REST API', async () => {


        const searchedlist = await searchUserByName(searchedFor.username);

        //check that filtered list of users has find me user and noone else
        expect(searchedlist.filter(user => user.username === "findme").length).toEqual(0);
    });

    test('can send a search and find with exact name with REST API', async () => {
        // insert new users in the database
        const newUser  = await createUser(searchedFor);

        const searchedlist = await searchUserByName(searchedFor.username);

        //check that filtered list of users has find me user and noone else
        expect(searchedlist.filter(user => user.username === "findme").length).toEqual(1);
    });
    test('can send a search and find with partial name with REST API', async () => {
        // insert new users in the database

        const searchedlist = await searchUserByName("find");

        //check that filtered list of users has find me user and noone else
        expect(searchedlist.filter(user => user.username === "findme").length).toEqual(1);
    });

});

