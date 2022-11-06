import React from "react";
import ManipulateEntity from "../../components/Create/ManipulateEntity";

export default function CreateFrequency() {

    return (
        <section id='createfrequencyweightdistance'>
            <div className="container">
                <ManipulateEntity
                    entity="Frequency"
                    route="frequencies"
                    isUpdate={false}
                />
            </div>
        </section >
    );
}