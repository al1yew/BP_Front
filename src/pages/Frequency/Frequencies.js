import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";
export default function Frequencies() {

    const [frequencies, setFrequencies] = useState([]);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get("https://bpriskassessment.azurewebsites.net/api/frequencies/", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => setFrequencies(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`https://bpriskassessment.azurewebsites.net/api/frequencies/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                setFrequencies(res.data);
                toastr.success("Deleted!")
            })
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
                !frequencies.length &&
                <div className="loader"></div>
            }
            <div className="container">
                <Table
                    entity="Frequencies"
                    data={frequencies}
                    deleteFunc={handleDelete}
                />
            </div>
        </div>
    );
}