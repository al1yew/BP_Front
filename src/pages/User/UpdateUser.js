import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {

    const { id } = useParams();

    const [updateUser, setUpdateUser] = useState({
        name: "",
        surname: "",
        userName: "",
        email: "",
        phoneNumber: ""
    });

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://bpriskassessment.azurewebsites.net/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => setUpdateUser(res.data))
            .catch(err => {
                navigate(-1)
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }, [])

    function handleChange(e) {
        const { name, value } = e.target

        setUpdateUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            id,
            email: updateUser.email,
            name: updateUser.name,
            surname: updateUser.surname,
            userName: updateUser.userName,
            phoneNumber: updateUser.phoneNumber,
        }

        axios.put(`https://bpriskassessment.azurewebsites.net/api/users/${id}`, obj, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toastr.success("Updated!");
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
        <section id="manipulateuser">
            <div className="container">
                {
                    !updateUser &&
                    <div className="loader"></div>
                }
                {
                    updateUser &&
                    <form className="row all" onSubmit={handleSubmit}>
                        <div className="col-lg-5-8 col-5-8">
                            <label htmlFor="name" className="col-lg-12 col-12">Name</label>
                            <input className="col-lg-12 col-12 form-control" name="name" id="name" type="text" required={true} onChange={handleChange} value={updateUser.name} autoFocus />
                        </div>
                        <div className="col-lg-5-8 col-5-8">
                            <label htmlFor="surname" className="col-lg-12 col-12">Surname</label>
                            <input className="col-lg-12 col-12 form-control" name="surname" id="surname" type="text" required={true} onChange={handleChange} value={updateUser.surname} />
                        </div>
                        <div className="col-lg-5-8 col-5-8">
                            <label htmlFor="userName" className="col-lg-12 col-12">Username</label>
                            <input className="col-lg-12 col-12 form-control" name="userName" id="userName" type="text" required={true} onChange={handleChange} value={updateUser.userName} />
                        </div>
                        <div className="col-lg-5-8 col-5-8">
                            <label htmlFor="email" className="col-lg-12 col-12">Email</label>
                            <input className="col-lg-12 col-12 form-control" name="email" id="email" type="email" required={true} onChange={handleChange} value={updateUser.email} />
                        </div>
                        <div className="col-lg-5-8 col-5-8">
                            <label htmlFor="phoneNumber" className="col-lg-12 col-12">Phone Number</label>
                            <input className="col-lg-12 col-12 form-control" name="phoneNumber" id="phoneNumber" type="text" onChange={handleChange} value={updateUser.phoneNumber} />
                        </div>
                        <button className="col-lg-5-8 col-5-8 btn btn-success" type="submit">Update</button>
                    </form>
                }

            </div>
        </section>
    )
}