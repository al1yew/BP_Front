import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../../components/Table";

export default function Frequencies() {

    //#region states and navigation

    const [frequencies, setFrequencies] = useState([]);

    const [errorObj, setErrorObj] = useState("");

    //#endregion states and navigation

    //#region effects

    useEffect(() => {
        axios.get("http://localhost:37234/api/frequencies/")
            .then(res => setFrequencies(res.data))
    }, [])

    //#endregion effects

    //#region CRUD

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/frequencies/${id}`)
            .then(res => setFrequencies(res.data))
            .catch(err => setErrorObj(err.response.data))
    }

    //#endregion CRUD

    return (
        <div className="p-3">
            <section id="tablecontainer">
                <div className="container">
                    <Table
                        entity="Frequencies"
                        data={frequencies}
                        errorObject={errorObj}
                        deleteFunc={handleDelete}
                    />
                </div>
            </section>
        </div>
    );
}