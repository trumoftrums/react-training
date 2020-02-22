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
import About from "./About";
import ContactUs from "./ContactUs";
import Home from "./Home";
import TodoList from "./TodoList";

class RouterUrl extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/list-todo"><TodoList /></Route>
                <Route path="/about"><About /></Route>
                <Route path="/contact-us"><ContactUs /></Route>
            </Switch>
        )
    }
}

export default RouterUrl;