import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/sticker.jpg";

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="row all">
                        <div className="welcome_message_header col-lg-4 col-6">
                            Welcome, dear user!
                        </div>
                        <Link to="/manage" className="col-lg-0-8 col-1-5">
                            <img className="img-fluid" src={logo} alt="" />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}