import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ManipulateEntity from "../../components/Create/ManipulateEntity";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";

export default function UpdateDistance() {

    const { id } = useParams();

    const { user } = useContext(UserContext);

    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://elgiz93-001-site3.htempurl.comdistances/${id}`, {
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
                !name ?
                    <div className="loader"></div>
                    :
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