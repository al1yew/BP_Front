import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function CreateFrequency() {

    //#region states

    const [formData, setFormData] = useState({
        name: ""
    });

    const navigate = useNavigate();

    //#endregion states

    function handleChange(e) {
        const { name, value } = e.target

        setFormData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:37234/api/frequencies", formData)
            .then(res => toastr.success("Created!"))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.error(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            });

        setTimeout(() => {
            navigate(-1);
        }, 1000);
    }

    return (
        <section id='createfrequencyweightdistance'>
            <div className="container">
                <div className="row all">
                    <p>Write down the name of Frequency that you want to create. It will be displayed in frequencies' table.</p>
                    <form onSubmit={handleSubmit} className='row all col-lg-4 col-5'>
                        <input type="text" required={true} onChange={handleChange} value={formData.name} name="name" className="col-lg-8 col-8 form-control" />
                        <button type="submit" id="submitBtn" className="btn btn-success col-3-5 col-lg-3-5">Create</button>
                    </form>
                </div>
            </div>
        </section >
    );
}