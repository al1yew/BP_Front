import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function Assessments() {

    //#region states and navigation
    const [assessments, setAssessments] = useState([]);

    const [formData, setFormData] = useState({
        weightId: 0,
        distanceId: 0,
        frequencyId: 0,
        needToAssess: 0,
        // showCount: 5
    });

    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    const navigate = useNavigate();

    //#endregion states and navigation

    //#region effects

    useEffect(() => {
        axios.get("http://localhost:37234/api/assessments/")
            .then(res => setAssessments(res.data))

        axios.get("http://localhost:37234/api/assessments/getalldata")
            .then(res => setData(res.data))
    }, [])

    //#endregion effects

    //#region CRUD

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/assessments/${id}`)
            .then(res => setAssessments(res.data))
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

        toastr.options = {
            hideDuration: 300,
            timeOut: 3000,
        }
    }

    function handleSort(e) {
        axios.get(`http://localhost:37234/api/assessments/`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                params: {
                    "weightId": e.target.name == "weightId" ? e.target.value : formData.weightId,
                    "distanceId": e.target.name == "distanceId" ? e.target.value : formData.distanceId,
                    "frequencyId": e.target.name == "frequencyId" ? e.target.value : formData.frequencyId,
                    "needToAssess": e.target.name == "needToAssess" ? e.target.value : formData.needToAssess,
                }
            })
            .then(res => setAssessments(res.data))
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

        setFormData(prevValue => {
            const { name, value } = e.target
            return {
                ...prevValue,
                [name]: parseInt(value)
            }
        })
    }
    //#endregion CRUD

    return (
        <div className="p-3">
            <section id="tablecontainer">
                <div className="container">
                    <div className="row all">
                        <div className="top col-lg-12 col-12">

                            <div className="col-lg-2 col-3 left">
                                Assessments
                            </div>

                            <div className="col-lg-7 col-7 middle">

                                <select value={formData?.weightId} id="weightId" name="weightId" className="col-lg-2-2 col-2-2" onChange={handleSort}>
                                    <option value="0">Weights</option>
                                    {data?.weights?.length && data?.weights?.map((entity, index) => {
                                        return <option key={index} value={entity.id} >{entity.name}</option>
                                    })}
                                </select>

                                <select value={formData?.distanceId} id="distanceId" name="distanceId" className="col-lg-2-2 col-2-2" onChange={handleSort}>
                                    <option value="0">Distances</option>
                                    {data?.distances?.length && data?.distances?.map((entity, index) => {
                                        return <option key={index} value={entity.id} >{entity.name}</option>
                                    })}
                                </select>

                                <select value={formData?.frequencyId} id="frequencyId" name="frequencyId" className="col-lg-2-2 col-2-2" onChange={handleSort}>
                                    <option value="0">Frequencies</option>
                                    {data?.frequencies?.length && data?.frequencies?.map((entity, index) => {
                                        return <option key={index} value={entity.id} >{entity.name}</option>
                                    })}
                                </select>

                                <select value={formData?.needToAssess} id="needToAssess" name="needToAssess" className="col-lg-2-2 col-2-2" onChange={handleSort}>
                                    <option value="0">All</option>
                                    <option value="1">Assess</option>
                                    <option value="2">No Assess</option>
                                </select>

                                {/* <select value={formData.showCount} id="showCount" name="showCount" className="col-lg-2-2 col-2-2" onChange={handleSort}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                </select> */}

                            </div>

                            <div className="col-lg-1 col-1 text-end">
                                <Link to="/manage/assessments/create" className="btn btn-primary">
                                    Create
                                </Link>
                            </div>

                            {/* {errorObj && <p className="col-lg-12 col-12">{!errorObj?.errors && errorObj}</p>} */}

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
                                            <tr key={data?.id}>
                                                <th scope="row" className="text-center">{index + 1}</th>
                                                <td className="text-center">{data?.weight?.name}</td>
                                                <td className="text-center">{data?.distance?.name}</td>
                                                <td className="text-center">{data?.frequency?.name}</td>
                                                <td className={data?.needToAssess ? "text-success text-center" : "text-danger text-center"}>
                                                    {data?.needToAssess ? "Yes" : "No"}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning"
                                                        onClick={() => navigate(`/manage/assessments/update/${data?.id}`)}
                                                    >
                                                        Update
                                                    </button>
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(data?.id)}
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