import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManipulateEntity from "../../components/Create/ManipulateEntity";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function UpdateDistance() {

    const { id } = useParams();

    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:37234/api/frequencies/${id}`)
            .then(res => setName(res?.data?.name))
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

    return (
        <section id='createfrequencyweightdistance'>
            {
                name &&
                <div className="container">
                    <ManipulateEntity
                        entity="Distance"
                        route="distances"
                        isUpdate={true}
                        id={id}
                        entityName={name}
                    />
                </div>
            }
        </section >
    );
}