import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Table from "../../components/Table";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";
export default function Distances() {

    const [distances, setDistances] = useState([]);

    const { user } = useContext(UserContext);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    useEffect(() => {
        axios.get("https://bpriskassessment.azurewebsites.net/api/distances/", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => setDistances(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`https://bpriskassessment.azurewebsites.net/api/distances/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {
                setDistances(res.data);
                toastr.success("Deleted!");
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
            <div className="container">
                <Table
                    entity="Distances"
                    data={distances}
                    deleteFunc={handleDelete}
                />
            </div>
        </div>
    );
}