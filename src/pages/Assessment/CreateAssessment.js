import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function CreateAssessment() {
    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    const [submitValues, setSubmitValues] = useState({
        distanceId: 0,
        frequencyId: 0,
        weightId: 0,
        needToAssess: false
    });

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    useEffect(() => {
        axios.get("http://localhost:37234/api/assessments/getalldata")
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

    function handleSpanClick(needToAssess) {
        let obj = {
            distanceId: submitValues.distanceId,
            frequencyId: submitValues.frequencyId,
            weightId: submitValues.weightId,
            needToAssess: needToAssess
        }

        toastr.clear()

        axios.post('http://localhost:37234/api/assessments', obj)
            .then(res => toastr.success("Created!"))
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

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-12">Select your options from the dropdowns below in order to decide whether take an assessment or not. <br />
                        Information will be passed to database and will be used in User side.</p>
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

                        <span className='col-lg-4 col-5-8 btn btn-primary' onClick={() => handleSpanClick(true)}>Need to Assess</span>
                        <span className='col-lg-4 col-5-8 btn btn-danger' onClick={() => handleSpanClick(false)}>No Need to Assess</span>
                    </div>
                </div>
            </div>
        </section >
    );
}