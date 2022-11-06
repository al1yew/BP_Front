import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function ManipulateEntity(props) {

    const [entity, setEntity] = useState({
        name: props?.entityName?.length ? props.entityName : ""
    });

    const navigate = useNavigate();

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    function handleChange(e) {
        const { name, value } = e.target

        setEntity(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            name: entity.name,
            id: props.id
        }

        props.isUpdate
            ?
            axios.put(`http://vasyaaliyev-001-site1.ftempurl.com/api/${props?.route}/${props?.id}`, obj)
                .then(res => {
                    toastr.success("Updated!");
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
                })
            :
            axios.post(`http://vasyaaliyev-001-site1.ftempurl.com/api/${props?.route}`, entity)
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
                })
    }

    return (
        <div className="row all">
            <p className="col-lg-12 col-12">Write down the name of {props?.entity} that you want to {props.isUpdate ? "update" : "create"}. It will be displayed in the table.</p>
            <form onSubmit={handleSubmit} className='col-lg-5 col-10'>
                <input
                    type="text"
                    required={true}
                    onChange={handleChange}
                    value={entity.name}
                    name="name"
                    className="col-lg-8 col-8"
                />
                <button
                    type="submit"
                    id="submitBtn"
                    className="btn btn-success col-3-5 col-lg-3-5">
                    {props.isUpdate ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
}