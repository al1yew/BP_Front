import React from "react";
import ManipulateEntity from "../../components/Create/ManipulateEntity";

export default function CreateDistance() {

    return (
        <section id='createfrequencyweightdistance'>
            <div className="container">
                <ManipulateEntity
                    entity="Distance"
                    route="distances"
                    isUpdate={false}
                />
            </div>
        </section >
    );
}