import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/user";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import axios from "axios";

export default function UpdateLoggedUser() {

    const { username } = useParams();

    const [loggedUser, setLoggedUser] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        phoneNumber: "",
        id: ""
    });

    const [password, setPassword] = useState({
        password: "",
        confirmPassword: ""
    })

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://elgiz93-001-site3.htempurl.com/api/users/getbyname", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${user.token}`
            },
            params: {
                "username": username
            }
        })
            .then(res => setLoggedUser(res.data))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
                navigate("/manage")
            })
    }, [])

    function handleChange(e) {
        const { name, value } = e.target

        setLoggedUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handlePasswordChange(e) {
        const { name, value } = e.target

        setPassword(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            id: loggedUser.id,
            email: loggedUser.email,
            name: loggedUser.name,
            surname: loggedUser.surname,
            userName: loggedUser.userName,
            phoneNumber: loggedUser.phoneNumber,
        }

        axios.put(`https://elgiz93-001-site3.htempurl.com/api/users/${loggedUser.id}`, obj, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toastr.success("Updated!");

                if (localStorage.getItem("user") != null) {
                    localStorage.removeItem("user")
                }

                setUser({
                    email: "",
                    name: "",
                    surname: "",
                    userName: "",
                    token: ""
                })

                navigate("/manage/account/login");
            })
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }

    function handlePasswordForm(e) {
        e.preventDefault();

        let obj = {
            id: loggedUser.id,
            newPassword: password.password,
            confirmNewPassword: password.confirmPassword
        }

        axios.post("https://elgiz93-001-site3.htempurl.com/api/users/resetpassword", obj, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toastr.success("Password is changed!");

                if (localStorage.getItem("user") != null) {
                    localStorage.removeItem("user")
                }

                setUser({
                    email: "",
                    name: "",
                    surname: "",
                    userName: "",
                    token: ""
                })

                navigate("/manage/account/login");
            })
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }

    return (
        <section id="manipulateuser">
            <div className="container">
                {
                    !loggedUser.id.length ?
                        <div className="loader"></div>
                        :
                        <>
                            <form className="row all" onSubmit={handleSubmit}>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="name" className="col-lg-12 col-12">Name</label>
                                    <input className="col-lg-12 col-12 form-control" name="name" id="name" type="text" required={true} onChange={handleChange} value={loggedUser.name} autoFocus />
                                </div>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="surname" className="col-lg-12 col-12">Surname</label>
                                    <input className="col-lg-12 col-12 form-control" name="surname" id="surname" type="text" required={true} onChange={handleChange} value={loggedUser.surname} />
                                </div>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="userName" className="col-lg-12 col-12">Username</label>
                                    <input className="col-lg-12 col-12 form-control" name="userName" id="userName" type="text" required={true} onChange={handleChange} value={loggedUser.userName} />
                                </div>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="email" className="col-lg-12 col-12">Email</label>
                                    <input className="col-lg-12 col-12 form-control" name="email" id="email" type="email" required={true} onChange={handleChange} value={loggedUser.email} />
                                </div>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="phoneNumber" className="col-lg-12 col-12">Phone Number</label>
                                    <input className="col-lg-12 col-12 form-control" name="phoneNumber" id="phoneNumber" type="text" onChange={handleChange} value={loggedUser.phoneNumber} />
                                </div>
                                <button className="col-lg-5-8 col-5-8 btn btn-success" type="submit">Change Info</button>
                            </form>
                            <hr />
                            <form className="row passworddropdown col-lg-12 col-12" onSubmit={handlePasswordForm}>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="password" className="col-lg-12 col-12">Password</label>
                                    <input className="col-lg-12 col-12 form-control" name="password" id="password" type="password" required={true} onChange={handlePasswordChange} value={password.password} />
                                </div>
                                <div className="col-lg-5-8 col-5-8">
                                    <label htmlFor="confirmPassword" className="col-lg-12 col-12">Confirm Password</label>
                                    <input className="col-lg-12 col-12 form-control" name="confirmPassword" id="confirmPassword" type="password" required={true} onChange={handlePasswordChange} value={password.confirmPassword} />
                                </div>
                                <button className="col-lg-5-8 col-5-8 btn btn-success" type="submit">Change Password</button>
                            </form>
                        </>
                }
            </div>
        </section>
    )
}