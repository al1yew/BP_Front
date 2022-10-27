import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";

export default function Assessment() {

    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

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

    console.log(data)

    return (
        <section id='dropdownkeeper'>
            <div className="container">
                <div className="row all">
                    <p>Select your options from the dropdowns below in order to decide whether take an assessment or not.</p>
                    <form method='post' className='row all col-lg-12 col-12'>
                        <Dropdown />
                        <Dropdown />
                        <Dropdown />
                        <button type="submit" className='col-lg-4 col-5-8 btn btn-primary'>Need to Assess</button>
                        <button type="submit" className='col-lg-4 col-5-8 btn btn-danger'>No Need to Assess</button>
                    </form>
                </div>
            </div>
        </section >
    );
}