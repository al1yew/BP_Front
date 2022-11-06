import React from "react";
import ManipulateEntity from "../../components/Create/ManipulateEntity";

export default function CreateWeight() {

    return (
        <section id='createfrequencyweightdistance'>
            <div className="container">
                <ManipulateEntity
                    entity="Weight"
                    route="weights"
                    isUpdate={false}
                />
            </div>
        </section >
    );
}