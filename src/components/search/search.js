import React from "react";
import {useNavigate, Link} from "react-router-dom";

const SearchResults = ({users}) => {
    return(
        <div className="list-group">
            {
                users.map(user => {
                    return (
                        <div>

                        <h4 className="col-10 fw-bolder pb-0 mb-0">
                            {user.username}<i className="fa fa-badge-check text-primary"></i>
                        </h4>

                    <h6 className="pt-0">@{user.username}</h6>
                            <Link to={`/messages/${user._id}`}>
                                    <button
                                        className={`col-30 btn btn-primary rounded-pill fa-pull-left
                                                        fw-bold ps-4 pe-4`}>
                                        Message
                                    </button>
                            </Link>
                        </div>


                    )
                })
            }
        </div>
    );
}
export default SearchResults;