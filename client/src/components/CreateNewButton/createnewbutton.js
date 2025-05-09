// createnewbutton.js
// it will contain the link to page which contains the form
// will be used for new workout and exercise buttons
//the differences between the two different buttons will be defined in the corresponding pages.js files

import React from "react";
import { Link } from "react-router-dom";
import './createnewbutton.css'

function CreateNewButton({ to, label }) {
    return (
        <Link to={to}>
            <button className="create-new-button">
                {label}
            </button>
        </Link>
    );
}


export default CreateNewButton;
