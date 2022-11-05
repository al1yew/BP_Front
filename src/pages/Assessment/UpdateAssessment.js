import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAssessment() {
    const { id } = useParams();

    const [data, setData] = useState(undefined);

    toastr.options = {
        hideDuration: 300,
        timeOut: 2500,
        positionClass: "toast-bottom-right"
    }

    const navigate = useNavigate();

    const [assessment, setAssessment] = useState({
        distanceId: 0,
        frequencyId: 0,
        weightId: 0,
        needToAssess: false
    });

    useEffect(() => {
        axios.get(`http://localhost:37234/api/assessments/${id}`)
            .then(res => setAssessment(res.data))
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
                navigate(-1)
            })

        axios.get("http://localhost:37234/api/assessments/getalldata")
            .then(res => setData(res.data))
    }, []);

    function handleSubmitValues(id, entity) {
        id >= 0 && entity.length &&
            setAssessment(prevValue => {
                return {
                    ...prevValue,
                    [entity.toLowerCase().concat('Id')]: id
                }
            })
    }

    function handleSpanClick(needToAssess) {
        let obj = {
            distanceId: assessment.distanceId,
            frequencyId: assessment.frequencyId,
            weightId: assessment.weightId,
            needToAssess: needToAssess,
            id: id
        }

        toastr.clear()

        axios.put(`http://localhost:37234/api/assessments/${id}`, obj)
            .then(res => {
                toastr.success("Updated!");
                setTimeout(() => {
                    navigate(-1)
                }, 1500);
            })
            .catch(err => {
                if (err?.response?.data?.errors) {
                    Object.values(err?.response?.data?.errors).forEach(er => {
                        toastr.warning(er)
                    })
                }
                else {
                    toastr.error(err?.response?.data)
                }
            });
    }

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p className="col-lg-12 col-12">Select your options from the dropdowns below in order to update selected assessment<br />
                        Information will be passed to database and will be used in User side.</p>
                    {
                        data != undefined ?
                            (<div className="cont col-lg-12 col-12">
                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Weights</label>
                                    <Dropdown query={data?.weights} selectedId={assessment.weightId} name={"Weight"} isItUpdatePage={true} setValues={handleSubmitValues} />
                                </div>
                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Distances</label>
                                    <Dropdown query={data?.distances} selectedId={assessment.distanceId} name={"Distance"} isItUpdatePage={true} setValues={handleSubmitValues} />
                                </div>
                                <div className="col-lg-3-8 col-3-8 allkeeper">
                                    <label>Frequencies</label>
                                    <Dropdown query={data?.frequencies} selectedId={assessment.frequencyId} name={"Frequency"} isItUpdatePage={true} setValues={handleSubmitValues} />
                                </div>

                                <span className='col-lg-4 col-5-8 btn btn-primary' onClick={() => handleSpanClick(true)}>Need to Assess</span>
                                <span className='col-lg-4 col-5-8 btn btn-danger' onClick={() => handleSpanClick(false)}>No Need to Assess</span>
                            </div>)
                            :
                            (<div className='preloader'>
                                LOADING...
                            </div>)
                    }
                </div>
            </div>
        </section>
    );
}