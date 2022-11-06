import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
export default function Distances() {

    const [distances, setDistances] = useState([]);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    useEffect(() => {
        axios.get("http://localhost:37234/api/distances/")
            .then(res => setDistances(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/distances/${id}`)
            .then(res => setDistances(res.data))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.error(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }

    return (
        <div id="tablecontainer">
            {
                !distances.length &&
                <div className="preloader">
                    LOADING...
                </div>
            }
            {
                distances.length &&
                <div className="container">
                    <Table
                        entity="Distances"
                        data={distances}
                        deleteFunc={handleDelete}
                    />
                </div>
            }
        </div>
    );
}