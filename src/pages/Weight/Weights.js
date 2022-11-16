import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";
export default function Weights() {

    const [weights, setWeights] = useState([]);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get("http://localhost:37234/api/weights/", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => setWeights(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/weights/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
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
                <div className="loader"></div>
            }
            <div className="container">
                <Table
                    entity="Weights"
                    data={weights}
                    deleteFunc={handleDelete}
                />
            </div>
        </div>
    );
}