import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "../../components/Dropdown";

export default function Create() {

    //#region explanation
    // 1. state for getting data from backend
    // 2. state for listening the docuemnt to catch selected values each time user clicks on options of dropdowns
    // 3. state that i created because of 7. When user clicks on the need to asses, or on no need to assess, the previous function:
    // -------look below to previous two functions and explanation for 3. point

    /*
    function handleSpanClick(needToAssess) {
        setSubmitValues(prevValue => {
            return {
                ...prevValue,
                NeedToAssess: needToAssess
            }
        });

        submitToApi();
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        The thing is, state updates when user clicks on blue or red button, and sets true or false to NeedToAssess property, 
        but because of calling submitToApi() inside of same function, it catches the previous state, where NeedToAssess is not updated. 
        Thats why value of button is always late for 1 step. I think it happens due to asynchronous functionality of React. I glanced at 
        some stackOverFlow posts, people found solution by making callback, but idk how to implement it. I also think the problem is in 
        the way i call function in onClick attribute of html elements: i call them with arrow function, i think it is called callback:
        () => handleSpanClick(true) etc, same thing happens in DropDown component. I noticed that if the values are sent in hooks, the 
        arrow function is necessary. 

        1. I am not sure that creating state Render and SetRender is needed, but i do not how to render page after handleSpanClick function and 
        call submitToAPi function. 
        2. I do not know how callback can help me in mentioned situation
        3. I am not sure that () => handleSpanClick(true) is necessary, maybe there is another way. If i write multiple console.log(submitValues)
        insite of both functions, and in global, the global call shows changed state, but clg in functions show previous state, where NeedToAsses
        is not updated.
        ////////////////////////////////////////////////////////////////////////////////////////////

    }

    console.log(submitValues) ------ shows updated state

    function submitToApi() {
        setErrorObj(null)

        -------------- if i call console.log(submitValues) here, it shows previus state with non-updated NeedToAsses value.

        axios.post('http://localhost:37234/api/assessment', submitValues)
            .catch(err => setErrorObj(err?.response?.data))
    }
    
    */

    //4. state to catch error from backend, it can send array of errors from FluentValidation, or just one error. so i handled it in 
    // conditional rendering in html 
    //5. getting data from backend 
    //6. Function that handles values of selected options for 2. point, and sets them by concatting Id string to Entity name. I send this 
    // function in Dropdown component, and i catch it there in function handleChange(forPlaceholder, id, entity). 
    //7. handleSpanClick function gets value of needToAsses span on click, sets value in state, and then i set render state to vice versa one, 
    // to rerender page, and due to dependency on this state, useEffect in 8. point does it's work. 
    //8. Post values to backend. I know that it is necessary to validate both in front and backend, but there is no need to validate it front.
    // so i just catch error form backend and set to errorState. 

    //#endregion explanation

    //1
    const [data, setData] = useState({
        distances: [],
        frequencies: [],
        weights: []
    });

    //2
    const [submitValues, setSubmitValues] = useState({
        DistanceId: 0,
        FrequencyId: 0,
        WeightId: 0,
        NeedToAssess: false
    });

    //3
    const [render, setRender] = useState(false);

    //4
    const [errorObj, setErrorObj] = useState();

    //5
    useEffect(() => {
        axios.get("http://localhost:37234/api/assessments/getalldata")
            .then(res => setData(res.data))
    }, []);

    //6
    function handleSubmitValues(id, entity) {
        id >= 0 && entity.length &&
            setSubmitValues(prevValue => {
                return {
                    ...prevValue,
                    [entity.concat('Id')]: id
                }
            })
    }

    // //7
    // function handleSpanClick(needToAssess) {
    //     setSubmitValues(prevValue => {
    //         return {
    //             ...prevValue,
    //             NeedToAssess: needToAssess
    //         }
    //     });

    //     setRender(prevValue => !prevValue)
    // }

    // //8
    // useEffect(() => {
    //     setErrorObj(null)

    //     axios.post('http://localhost:37234/api/assessment', submitValues)
    //         .catch(err => setErrorObj(err?.response?.data))
    // }, [render])

    function handleSpanClick(needToAssess) {
        setSubmitValues(prevValue => {
            return {
                ...prevValue,
                NeedToAssess: needToAssess
            }
        });

        submitToApi();
    }

    function submitToApi() {
        // setErrorObj(null)

        console.log(submitValues)

        // axios.post('http://localhost:37234/api/assessment', submitValues)
        // .catch(err => setErrorObj(err?.response?.data))
    }
    //9
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
                            <p className="errorObj thirderr col-lg-12 col-12">{errorObj?.errors?.WeightId}</p>
                        </div>
                        <div className="col-lg-3-8 col-3-8 allkeeper">
                            <label>Distances</label>
                            <Dropdown query={data.distances} name={"Distance"} setValues={handleSubmitValues} />
                            <p className="errorObj firsterr col-lg-12 col-12">{errorObj?.errors?.DistanceId}</p>
                        </div>
                        <div className="col-lg-3-8 col-3-8 allkeeper">
                            <label>Frequencies</label>
                            <Dropdown query={data.frequencies} name={"Frequency"} setValues={handleSubmitValues} />
                            <p className="errorObj seconderr col-lg-12 col-12">{errorObj?.errors?.FrequencyId}</p>
                        </div>

                        {errorObj && <p className="errorizservisa col-lg-12 col-12">{!errorObj.errors && errorObj}</p>}

                        <span className='col-lg-4 col-5-8 btn btn-primary' onClick={() => handleSpanClick(true)}>Need to Assess</span>
                        <span className='col-lg-4 col-5-8 btn btn-danger' onClick={() => handleSpanClick(false)}>No Need to Assess</span>
                    </div>
                </div>
            </div>
        </section >
    );
}