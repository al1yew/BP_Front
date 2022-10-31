import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

export default function Assessment() {

    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    const [submitValues, setSubmitValues] = useState({
        DistanceId: 0,
        FrequencyId: 0,
        WeightId: 0,
        NeedToAssess: false
    });

    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:37234/api/distances")
            .then(res => setData(prevValue => {
                return {
                    ...prevValue,
                    distances: res.data
                }
            }))

        axios.get("http://localhost:37234/api/frequencies")
            .then(res => setData(prevValue => {
                return {
                    ...prevValue,
                    frequencies: res.data
                }
            }))

        axios.get("http://localhost:37234/api/weights")
            .then(res => setData(prevValue => {
                return {
                    ...prevValue,
                    weights: res.data
                }
            }))
    }, []);

    function handleSubmitValues(id, entity) {
        id != 0 && entity.length &&
            setSubmitValues(prevValue => {
                return {
                    ...prevValue,
                    [entity.toString().concat('Id')]: id
                }
            })
    }

    function handleButtonClick(needToAssess) {
        setSubmitValues(prevValue => {
            return {
                ...prevValue,
                NeedToAssess: needToAssess
            }
        })

        submitToApi();
    }

    function submitToApi() {
        axios.post('http://localhost:37234/api/assessment', submitValues)
            // .then(res => setError(res))
            .catch(err => setError(err))
    }

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p>Select your options from the dropdowns below in order to decide whether take an assessment or not.</p>
                    <div className='row all col-lg-12 col-12'>
                        <Dropdown query={data.distances} name={"Distance"} setValues={handleSubmitValues} />
                        <Dropdown query={data.frequencies} name={"Frequency"} setValues={handleSubmitValues} />
                        <Dropdown query={data.weights} name={"Weight"} setValues={handleSubmitValues} />
                        <button type="button" className='col-lg-4 col-5-8 btn btn-primary' onClick={() => handleButtonClick(true)}>Need to Assess</button>
                        <button type="button" className='col-lg-4 col-5-8 btn btn-danger' onClick={() => handleButtonClick(false)}>No Need to Assess</button>
                    </div>
                    <p className="error">{error?.response?.data}</p>
                </div>
            </div>
        </section >
    );
}