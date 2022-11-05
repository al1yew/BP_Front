import React from "react";

export default function CreateEntity(props) {

    return (
        <div className="row all">
            <p className="col-lg-12 col-12">Write down the name of {props.entity} that you want to create. It will be displayed in the table.</p>
            <form onSubmit={props.handleSubmit} className='col-lg-5 col-10'>
                <input type="text" required={true} onChange={props.handleChange} value={props.value} name="name" className="col-lg-8 col-8" />
                <button type="submit" id="submitBtn" className="btn btn-success col-3-5 col-lg-3-5">Create</button>
            </form>
        </div>
    );
}