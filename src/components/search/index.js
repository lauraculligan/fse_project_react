
import React, {useState} from "react";
import * as usersService from "../../services/users-service";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [foundUsers, setFoundUsers] = useState({});

    const searchUsers = async () => {
        await usersService.searchUserByName(username)
            .then(foundUsers => setFoundUsers(foundUsers));
        console.log(foundUsers);
    }

    return (<>
        <h1>Search Screen</h1>

            {
                JSON.stringify(foundUsers)
            }

        <div className="p-2 w-100">
            <div className="row align-items-center">
                <div className="col-10 ttr-font-size-100pc border-2 text-primary">
                   <textarea
                       onChange={(e) =>
                           setUsername(e.target.value)}
                       placeholder="Search Users"
                       className="w-100 border-2"
                   ></textarea>
                </div>
                <div className="col-2">
                    <button onClick={searchUsers}
                            className={`btn btn-primary rounded-pill fa-pull-left
                                fw-bold ps-4 pe-4`}>
                        Search
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default Search;