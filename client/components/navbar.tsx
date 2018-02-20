import * as React from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-b box-shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Dodge This!</a >
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/play">Play</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/options">Options</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}