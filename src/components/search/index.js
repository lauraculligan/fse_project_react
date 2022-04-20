
import React, {useState} from "react";
import * as usersService from "../../services/users-service";
import {useNavigate} from "react-router-dom";
import SearchResults from "./search";

const Search = () => {
    const navigate = useNavigate();
    const [foundUsers, setFoundUsers] = useState({});

    const searchUsers = async (name) => {
        if (name != "") {
            await usersService.searchUserByName(name)
                .then(foundUsers => setFoundUsers(foundUsers));
        }
        else {
            setFoundUsers({});
        }
    }

    return (<>
        <h1>Search Screen</h1>

        <div className="p-2 w-100">
            <div className="row align-items-center">

                <i className="fas ps-4 fa-search position-absolute"></i>
                <div className="col-10 ttr-font-size-100pc border-2 text-primary">
                   <textarea
                       onChange={(e) =>
                           searchUsers(e.currentTarget.value)}

                       placeholder="Search Users"
                       className="w-100 ps-5 border-2 rounded-pill form-control align-center"
                   ></textarea>
                </div>
            </div>
        </div>
            <div>
                <ul className="ttr-results list-group">
                    {
                        foundUsers.map && <SearchResults users={foundUsers} />
                    }
                </ul>
            </div>
        </>
    );
};

export default Search;