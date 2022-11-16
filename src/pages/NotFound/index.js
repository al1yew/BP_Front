import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user";

export default function NotFound() {

    const { user } = useContext(UserContext);

    return (
        <section id="notfound">
            <div className="container">
                <div className="row all">
                    <p>PAGE IS NOT FOUND!</p>
                    <Link to={user.token ? "/manage" : "/"}>Go to First Page</Link>
                    {
                        !user.token &&
                        <>
                            <span>OR</span>
                            <Link to="/manage/account/login">Login to visit Admin page</Link>
                        </>
                    }
                </div>
            </div>
        </section>
    );
}