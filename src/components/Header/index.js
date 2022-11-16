import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import logo from "../../images/sticker.jpg";
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

export default function Header() {

    const { user, setUser } = useContext(UserContext);

    const [dropdown, setDropdown] = useState(false);

    const refDropdown = useRef();

    const navigate = useNavigate();

    function handleDropdown() {
        setDropdown(prevValue => !prevValue)
    }

    function handleLogout() {
        setDropdown(false);

        if (localStorage.getItem("user") != null) {
            localStorage.removeItem("user")
        }

        setUser({
            email: "",
            name: "",
            surname: "",
            username: "",
            token: ""
        })

        navigate("/");
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };

    }, [refDropdown]);

    const handleOutsideClicks = (e) => {
        if (!dropdown && refDropdown.current && !refDropdown.current.contains(e.target)) {
            setDropdown(false);
        };
    };

    return (
        <header className="header">
            <div className="container">
                <div className="row all">
                    <div className="welcome_message_header col-lg-4 col-8">
                        Welcome, {user.name ? user.name : "user"}!
                    </div>
                    <div className="col-lg-1 col-2-8 papaclickmenu" ref={refDropdown}>
                        <Link to={user.token ? "/manage" : "/"} className="col-lg-7 col-7">
                            <img className="img-fluid" src={logo} alt="" />
                        </Link>
                        <span className={`clickdrop col-lg-2 col-2 ${dropdown ? "spanisopen" : ""}`} onClick={handleDropdown}>
                            <Icon path={mdiChevronDown} size='25px' />
                        </span>
                        <div className={`clickmenu ${dropdown && "openclickmenu"}`}>
                            {
                                !user.token &&
                                <Link to="/manage/account/login" className="col-lg-12 col-12" onClick={() => setDropdown(false)}>
                                    Account
                                </Link>
                            }
                            {
                                user.token &&
                                <span className="col-lg-12 col-12" onClick={handleLogout}>
                                    Logout
                                </span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}