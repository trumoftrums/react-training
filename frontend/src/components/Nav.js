/**
 * Created by Bao Nghiem on 2/22/2020.
 */
import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Nav extends Component {
    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">ReactJs Training</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/list-todo">List Todo</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact-us">Contact</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-user"/> Sign Up</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-log-in"/> Login</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Nav;