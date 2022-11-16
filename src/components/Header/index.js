import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user';
import logo from "../../images/sticker.jpg";
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';

export default function Header() {

    const { user } = useContext(UserContext);

    const [dropdown, setDropdown] = useState(false);

    function handleDropdown() {
        setDropdown(prevValue => !prevValue)
    }

    return (
        <header className="header">
            <div className="container">
                <div className="row all">
                    <div className="welcome_message_header col-lg-4 col-8">
                        Welcome, {user.name ? user.name : "user"}!
                    </div>
                    <div className="col-lg-1 col-2-8 papaclickmenu">
                        <Link to={user.token ? "/manage" : "/"} className="col-lg-7 col-7">
                            <img className="img-fluid" src={logo} alt="" />
                        </Link>
                        <span className={`col-lg-2 col-2 ${dropdown ? "spanisopen" : ""}`} onClick={handleDropdown}>
                            <Icon path={mdiChevronDown} size='25px' />
                        </span>
                        <div className={`clickmenu ${dropdown && "openclickmenu"}`}>
                            <Link to="/account/login" className="col-lg-12 col-12">
                                Account
                            </Link>
                            <Link to="/logout" className="col-lg-12 col-12">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}