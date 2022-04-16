import React from "react";
import {useNavigate, Link} from "react-router-dom";

const SearchResults = ({users}) => {
    return(
        <div className="list-group">
            {
                users.map(user => {
                    return (
                        <div>
                        <h4 className="fw-bolder pb-0 mb-0">
                            {user.username}<i className="fa fa-badge-check text-primary"></i>
                        </h4>
                    <h6 className="pt-0">@{user.username}</h6>
                        {/*  Add button here to select user  */}
                        </div>
                    )
                })
            }
        </div>
    );
}
export default SearchResults;