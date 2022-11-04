import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";

export default function Distances() {

    //#region states and navigation

    const [distances, setDistances] = useState([]);

    const [errorObj, setErrorObj] = useState("");

    //#endregion states and navigation

    //#region effects

    useEffect(() => {
        axios.get("http://localhost:37234/api/distances/")
            .then(res => setDistances(res.data))
    }, [])

    //#endregion effects

    //#region CRUD

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/distances/${id}`)
            .then(res => setDistances(res.data))
            .catch(err => setErrorObj(err.response.data))
    }

    //#endregion CRUD

    return (
        <div className="p-3">
            <section id="tablecontainer">
                <div className="container">
                    <Table
                        entity="Distances"
                        data={distances}
                        errorObject={errorObj}
                        deleteFunc={handleDelete}
                    />
                </div>
            </section>
        </div>
    );
}