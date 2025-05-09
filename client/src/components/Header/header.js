// header.js
import React from "react";
import './header.css';

function Header({ title }) {
    return (
        <header className="page-header">
            <img src='/pulse-logo.png' alt="Header Icon" className="header-image" />
            <h1>{title}</h1>
        </header>
    );
}

export default Header;
