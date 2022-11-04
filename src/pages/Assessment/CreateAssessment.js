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
    //osmotris eshe raz po assessment, i backend zaglani, prover vse, i razberis s responsivlik, izbavsa ot errorObj vo vsex entity
    const [submitValues, setSubmitValues] = useState({
        DistanceId: 0,
        FrequencyId: 0,
        WeightId: 0,
        NeedToAssess: false
    });

    useEffect(() => {
        //get all data returns frequencies distances and weights from backend in one object to set them to dropdowns
        axios.get("http://localhost:37234/api/assessments/getalldata")
            .then(res => setData(res.data))
    }, []);

    function handleSubmitValues(id, entity) {
        id >= 0 && entity.length &&
            setSubmitValues(prevValue => {
                return {
                    ...prevValue,
                    [entity.concat('Id')]: id
                }
            })
    }

    function handleSpanClick(needToAssess) {
        let obj = {
            DistanceId: submitValues.DistanceId,
            FrequencyId: submitValues.FrequencyId,
            WeightId: submitValues.WeightId,
            NeedToAssess: needToAssess
        }

        toastr.clear()

        axios.post('http://localhost:37234/api/assessments', obj)
            .then(res => toastr.success("Created!"))
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

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p>Select your options from the dropdowns below in order to decide whether take an assessment or not. <br />
                        Information will be passed to database and will be used in User side.</p>
                    <div className='row all col-lg-12 col-12'>
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