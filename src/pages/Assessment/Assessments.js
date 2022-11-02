import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Assessments() {

    const [assessments, setAssessments] = useState([]);

    const [errorObj, setErrorObj] = useState("");

    useEffect(() => {
        axios.get("http://localhost:37234/api/assessments")
            .then(res => setAssessments(res.data))
    }, [])

    function handleUpdate(id) {
        console.log(id);
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/assessments/${id}`)
            .then(res => setAssessments(res.data))
            .catch(err => setErrorObj(err.response.data))
    }

    return (
        <div className="p-3">
            <section id="tablecontainer">
                <div className="container">
                    <div className="row all">
                        <div className="top col-lg-12 col-12">
                            <div className="col-lg-2 col-3 left">
                                Assessments
                            </div>
                            <div className="col-lg-6 col-6">
                                <select>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <select>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <select>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="col-lg-2 col-2 text-end">
                                <Link to="/assessments/create" className="btn btn-primary">
                                    Create
                                </Link>
                            </div>
                        </div>

                        {!assessments.length &&
                            <h1 className="preloader">
                                <span className="let1">l</span>
                                <span className="let2">o</span>
                                <span className="let3">a</span>
                                <span className="let4">d</span>
                                <span className="let5">i</span>
                                <span className="let6">n</span>
                                <span className="let7">g</span>
                            </h1>
                        }

                        <div className="tablecontainer col-lg-12 col-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">No</th>
                                        <th scope="col" className="text-center">Weights</th>
                                        <th scope="col" className="text-center">Distances</th>
                                        <th scope="col" className="text-center">Frequencies</th>
                                        <th scope="col" className="text-center">Need to assess</th>
                                        <th scope="col" className="text-center">Update</th>
                                        <th scope="col" className="text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assessments && assessments.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <th scope="row" className="text-center">{index + 1}</th>
                                                <td className="text-center">{data.weight.name}</td>
                                                <td className="text-center">{data.distance.name}</td>
                                                <td className="text-center">{data.frequency.name}</td>
                                                <td className={data.needToAssess ? "text-success text-center" : "text-danger text-center"}>
                                                    {data.needToAssess ? "Yes" : "No"}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => handleUpdate(data.id)}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(data.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}