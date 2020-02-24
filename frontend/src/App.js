import React, {Component} from 'react';
import './App.css';
import './../node_modules/sweetalert/dist/sweetalert.css';
import Nav from "./components/Nav";
import {BrowserRouter as Router} from "react-router-dom";
import RouterUrl from "./components/RouterUrl";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="main">
                    <Nav/>
                    <div className="container">
                        <RouterUrl/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
