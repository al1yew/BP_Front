import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { UserContext } from "../../contexts/user";

export default function Assessments() {

    const [assessments, setAssessments] = useState({
        query: [],
        totalCount: 0
    });

    //vezde sdelat krasiviy preloader, razobratsa s http i https netlify, xochet sertifikat
    //esli ni odnogo weight assessment distance ili frequency net, toqda vsa stranica zastrevayet v loadinge, i knopka create toje
    //izuchit jwt auth and react, Claim shto takoe toje posmotret, kak eto s etim rabotayet
    //vse ravno loading v update assessment rabotayet tak sebe, s pervogo raza vseqda ne zagrujayet vidimo perviy raz sorgu gedmir shtoli
    // imenno koqda tolko tolko otkril proekt, nado posmotret 
    //smeni routing ved Header imeet ssilku v adminku, a tak bit ne doljno. Posmotri esli shto vidosi narqiz
    //vooobshe poxodu routing doljen bit ne v app, a v index.js
    //proverit vsu programmu, vse crudi v adminke, vsu adminku
    //header na telefone ujasen ispravit nado ego sprava fotku i dropdown, mojno voobshe sment ix mestami tupo
    const [formData, setFormData] = useState({
        weightId: 0,
        distanceId: 0,
        frequencyId: 0,
        needToAssess: 0,
        showCount: 10,
        page: 1
    })

    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    const { user } = useContext(UserContext);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:37234/api/assessments/",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                params: formData
            })
            .then(res => setAssessments(res.data))

        axios.get("http://localhost:37234/api/assessments/getalldata", {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => setData(res.data))
    }, [])

    function handleDelete(id) {
        axios.delete(`http://localhost:37234/api/assessments/${id}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                params: formData
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
    }

    function handleSort(e) {
        axios.get(`http://localhost:37234/api/assessments/`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                params: {
                    "weightId": e.target.name == "weightId" ? e.target.value : formData.weightId,
                    "distanceId": e.target.name == "distanceId" ? e.target.value : formData.distanceId,
                    "frequencyId": e.target.name == "frequencyId" ? e.target.value : formData.frequencyId,
                    "needToAssess": e.target.name == "needToAssess" ? e.target.value : formData.needToAssess,
                    "showCount": e.target.name == "showCount" ? e.target.value : formData.showCount,
                    "page": e.target.name == "page" ? e.target.value : 1
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
            });

        setFormData(prevValue => {
            const { name, value } = e.target

            console.log(name);

            return {
                ...prevValue,
                [name]: parseInt(value),
                page: [name] == "page" ? e.target.value : 1
            }
        })
    }

    return (
        <div className="">
            <section id="tablecontainer">
                <div className="container">
                    {
                        !assessments.query.length &&
                        <div className="preloader">
                            LOADING...
                        </div>
                    }
                    {
                        assessments.query.length &&
                        <div className="row all">
                            <div className="top col-lg-12 col-12">

                                <div className="col-lg-2 col-6 left">
                                    Assessments
                                </div>

                                <div className="col-lg-7 col-12 middle">

                                    <select value={formData?.weightId} id="weightId" name="weightId" className="col-lg-2-2 col-5-8" onChange={handleSort}>
                                        <option value="0">Weights</option>
                                        {data?.weights?.length && data?.weights?.map((entity, index) => {
                                            return <option key={index} value={entity.id} >{entity.name}</option>
                                        })}
                                    </select>

                                    <select value={formData?.distanceId} id="distanceId" name="distanceId" className="col-lg-2-2 col-5-8" onChange={handleSort}>
                                        <option value="0">Distances</option>
                                        {data?.distances?.length && data?.distances?.map((entity, index) => {
                                            return <option key={index} value={entity.id} >{entity.name}</option>
                                        })}
                                    </select>

                                    <select value={formData?.frequencyId} id="frequencyId" name="frequencyId" className="col-lg-2-2 col-5-8" onChange={handleSort}>
                                        <option value="0">Frequencies</option>
                                        {data?.frequencies?.length && data?.frequencies?.map((entity, index) => {
                                            return <option key={index} value={entity.id} >{entity.name}</option>
                                        })}
                                    </select>

                                    <select value={formData?.needToAssess} id="needToAssess" name="needToAssess" className="col-lg-2-2 col-3" onChange={handleSort}>
                                        <option value="0">All</option>
                                        <option value="1">Assess</option>
                                        <option value="2">No Assess</option>
                                    </select>

                                    <select value={formData.showCount} id="showCount" name="showCount" className="col-lg-2-2 col-2-5" onChange={handleSort}>
                                        {/* <option value="5">5</option> ne zabud smenit v backende toje esli zaxocesh pokazivat po 5 */}
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select>

                                </div>

                                <div className="col-lg-1 col-3 text-end right">
                                    <Link to="/assessments/create" className="btn btn-primary">
                                        Create
                                    </Link>
                                </div>
                            </div>

                            <div className="tablecontainer col-lg-12 col-12">
                                <table className="table table-striped table-bordered ">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center">No</th>
                                            <th scope="col" className="text-center">Weight kg.</th>
                                            <th scope="col" className="text-center">Distance mt.</th>
                                            <th scope="col" className="text-center">Frequency t/hour</th>
                                            <th scope="col" className="text-center">Assess?</th>
                                            <th scope="col" className="text-center">Update</th>
                                            <th scope="col" className="text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assessments && assessments.query.map((data, index) => {
                                            return (
                                                <tr key={data?.id}>
                                                    <th scope="row" className="text-center">{(formData.page * formData.showCount - formData.showCount) + index + 1}</th>
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
                                                            onClick={() => navigate(`/assessments/update/${data?.id}`)}
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

                            <div className="pagination col-lg-12 col-12">
                                <ul className="pagination pagination-md">
                                    {
                                        assessments.query.length &&
                                        [...Array(Math.ceil(assessments.totalCount / formData.showCount))].map((data, index) => {
                                            return (
                                                <li key={index} className="page-item">
                                                    <label className="page-link" htmlFor={`pagination` + (index + 1)}>{index + 1}</label>
                                                    <input type="radio" id={`pagination` + (index + 1)} name="page" value={index + 1} onChange={handleSort} checked={formData.page == (index + 1)} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}