import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import photo from '../../images/bp_logo_login.png';

export default function Login() {

    const [isFocused, setIsFocused] = useState({
        login: false,
        password: false
    });

    const [formData, setFormData] = useState({
        login: "",
        password: ""
    })

    const navigate = useNavigate();

    const refInput = useRef();

    function handleFocus(whoIs) {
        whoIs == 1
            ?
            setIsFocused(prevValue => {
                return {
                    ...prevValue,
                    login: !prevValue.login
                }
            })
            :
            setIsFocused(prevValue => {
                return {
                    ...prevValue,
                    password: !prevValue.password
                }
            })
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClicks);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClicks);
        };

    }, [refInput]);

    const handleOutsideClicks = (e) => {
        if (refInput.current && !refInput.current.contains(e.target)) {
            setIsFocused({
                login: false,   
                password: false
            });
        };
    };

    return (
        <section id="loginSection">
            <div className="container">
                <div className="row all">
                    <div className="col-lg-2 col-4">
                        <img className="img-fluid" src={photo} alt="" />
                    </div>
                    <form className="col-lg-4 col-12 loginDiv">
                        <p className="col-lg-12 col-12">Welcome dear Admin! Sign in to continue!</p>

                        <div className="col-lg-12 col-12">
                            <input
                                required={true}
                                value={formData.login}
                                onChange={handleChange}
                                ref={refInput}
                                onClick={() => handleFocus(1)}
                                type="text"
                                id="login"
                                name="login"
                                className="col-lg-12 col-12 "
                            />
                            <label
                                htmlFor="login"
                                className={isFocused.login ? "moveLabelUp" : ""}
                            >
                                {formData.login ? "" : "Email or Username"}
                            </label>
                        </div>

                        <div className="col-lg-12 col-12">
                            <input
                                required={true}
                                value={formData.password}
                                onChange={handleChange}
                                ref={refInput}
                                onClick={() => handleFocus(2)}
                                type="password"
                                id="password"
                                name="password"
                                className="col-lg-12 col-12"
                            />
                            <label
                                htmlFor="password"
                                className={isFocused.password ? "moveLabelUp" : ""}
                            >
                                {formData.password ? "" : "Your Password"}
                            </label>
                        </div>

                        <button className="btn btn-success">Log in</button>
                    </form>
                </div>
            </div>
        </section>
    )
}