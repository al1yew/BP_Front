import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManipulateEntity from "../../components/Create/ManipulateEntity";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";

export default function UpdateWeight() {

    const { id } = useParams();

    const [name, setName] = useState("");

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:37234/api/weights/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
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
                !name &&
                <div className="loader"></div>
            }
            {
                name &&
                <div className="container">
                    <ManipulateEntity
                        entity="Weight"
                        route="weights"
                        isUpdate={true}
                        id={id}
                        entityName={name}
                    />
                </div>
            }
        </section >
    );
}