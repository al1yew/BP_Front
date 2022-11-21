import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";

export default function ResetPassword() {

    const { id } = useParams();

    const [reset, setReset] = useState({
        newPassword: "",
        confirmNewPassword: ""
    })

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    function handleChange(e) {
        const { name, value } = e.target

        setReset(prevValue => {
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
            newPassword: reset.newPassword,
            confirmNewPassword: reset.confirmNewPassword
        }

        axios.post("http://localhost:37234/api/users/resetpassword", obj, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                toastr.success("Password is changed!");
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
        <section id="resetpassword">
            <div className="container">
                <form className="row all" onSubmit={handleSubmit}>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="newPassword" className="col-lg-12 col-12">New Password</label>
                        <input className="col-lg-12 col-12 form-control" name="newPassword" id="newPassword" type="password" onChange={handleChange} value={reset.newPassword} />
                    </div>
                    <div className="col-lg-5-8 col-5-8">
                        <label htmlFor="confirmNewPassword" className="col-lg-12 col-12">Confirm Password</label>
                        <input className="col-lg-12 col-12 form-control" name="confirmNewPassword" id="confirmNewPassword" type="password" onChange={handleChange} value={reset.confirmNewPassword} />
                    </div>
                    <button className="col-lg-5-8 col-5-8 btn btn-success" type="submit">Reset</button>
                </form>
            </div>
        </section>
    )
}