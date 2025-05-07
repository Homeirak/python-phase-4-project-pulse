// header.js
import React from "react";
import './header.css';

function Header({ title }) {
    return (
        <header className="page-header">
            <h1>{title}</h1>
        </header>
    );
}

export default Header;
