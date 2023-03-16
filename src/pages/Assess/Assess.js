import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { useNavigate } from "react-router-dom";

export default function Assess() {

    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    const [submitValues, setSubmitValues] = useState({
        distanceId: 0,
        frequencyId: 0,
        weightId: 0
    });

    const [result, setResult] = useState(2);

    const navigate = useNavigate();

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    useEffect(() => {
        axios.get("https://elgiz93-001-site3.htempurl.com/api/assessments/getalldata")
            .then(res => setData(res.data))
    }, []);

    function handleSubmitValues(id, entity) {
        id >= 0 && entity.length &&
            setSubmitValues(prevValue => {
                return {
                    ...prevValue,
                    [entity.toLowerCase().concat('Id')]: id
                }
            })
    }

    function handleSpanClick() {
        toastr.clear()

        axios.post('https://elgiz93-001-site3.htempurl.com/api/assessments/makeassessment', submitValues)
            .then(res => setResult(res.data))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            })
    }

    function handleNavigate() {
        navigate("/makeassessment");
    }

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-12">Select your options from the dropdowns below in order to decide whether take an assessment or not.</p>
                    {
                        !data.weights.length ?
                            <div className="loader"></div>
                            :
                            <div className="cont col-lg-12 col-12">

                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Weights</label>
                                    <Dropdown query={data.weights} name={"Weight"} setValues={handleSubmitValues} />
                                </div>
                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Distances</label>
                                    <Dropdown query={data.distances} name={"Distance"} setValues={handleSubmitValues} />
                                </div>
                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Frequencies</label>
                                    <Dropdown query={data.frequencies} name={"Frequency"} setValues={handleSubmitValues} />
                                </div>

                                <div className="col-lg-12 col-12 resultkeeper">
                                    <span className='col-lg-4 col-12 btn btn-success' onClick={handleSpanClick}>Find out!</span>
                                    {
                                        result == 1 &&
                                        <span className='col-lg-6 col-12 resultspantrue btn btn-danger' onClick={handleNavigate}>You need to take an assessment. Click here.</span>
                                    }
                                    {
                                        result == 0 &&
                                        <span className='col-lg-6 col-12 resultspanfalse'>You DO NOT need to take an assessment.</span>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        </section >
    )
}