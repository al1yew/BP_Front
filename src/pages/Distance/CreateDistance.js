import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import CreateEntity from "../../components/Create/CreateEntity";

export default function CreateDistance() {

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

        axios.post("http://localhost:37234/api/distances", formData)
            .then(res => {
                toastr.success("Created!");
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
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
            });

        toastr.options = {
            hideDuration: 300,
            timeOut: 2500,
            positionClass: "toast-bottom-right"
        }
    }

    return (
        <section id='createfrequencyweightdistance'>
            <div className="container">
                <CreateEntity
                    entity="Distance"
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    value={formData.name}
                />
            </div>
        </section >
    );
}