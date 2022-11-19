import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {

    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target

        setNewUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:37234/api/users`, newUser, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toastr.success("Created!");
                setTimeout(() => {
                    navigate(-1);
                }, 200);
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
        <section id="createuser">
            <div className="container">
                <form className="row all" onSubmit={handleSubmit}>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="name" className="col-lg-12 col-12">Name</label>
                        <input className="col-lg-12 col-12 form-control" name="name" id="name" type="text" required={true} onChange={handleChange} value={newUser.name} autoFocus />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="surname" className="col-lg-12 col-12">Surname</label>
                        <input className="col-lg-12 col-12 form-control" name="surname" id="surname" type="text" required={true} onChange={handleChange} value={newUser.surname} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="username" className="col-lg-12 col-12">Username</label>
                        <input className="col-lg-12 col-12 form-control" name="username" id="username" type="text" required={true} onChange={handleChange} value={newUser.username} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="email" className="col-lg-12 col-12">Email</label>
                        <input className="col-lg-12 col-12 form-control" name="email" id="email" type="email" required={true} onChange={handleChange} value={newUser.email} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="phoneNumber" className="col-lg-12 col-12">Phone Number</label>
                        <input className="col-lg-12 col-12 form-control" name="phoneNumber" id="phoneNumber" type="text" onChange={handleChange} value={newUser.phoneNumber} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="password" className="col-lg-12 col-12">Password</label>
                        <input className="col-lg-12 col-12 form-control" name="password" id="password" type="password" required={true} onChange={handleChange} value={newUser.password} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="confirmPassword" className="col-lg-12 col-12">Confirm Password</label>
                        <input className="col-lg-12 col-12 form-control" name="confirmPassword" id="confirmPassword" type="password" required={true} onChange={handleChange} value={newUser.confirmPassword} />
                    </div>
                    <button className="col-lg-5-8 col-5-8 btn btn-success" type="submit">Create</button>
                </form>
            </div>
        </section>
    )
}