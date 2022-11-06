import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
export default function Weights() {

    const [weights, setWeights] = useState([]);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    useEffect(() => {
        axios.get("http://vasyaaliyev-001-site1.ftempurl.com/api/weights/")
            .then(res => setWeights(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`http://vasyaaliyev-001-site1.ftempurl.com/api/weights/${id}`)
            .then(res => setWeights(res.data))
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
                !weights.length &&
                <div className="preloader">
                    LOADING...
                </div>
            }
            {
                weights.length &&
                <div className="container">
                    <Table
                        entity="Weights"
                        data={weights}
                        deleteFunc={handleDelete}
                    />
                </div>
            }
        </div>
    );
}