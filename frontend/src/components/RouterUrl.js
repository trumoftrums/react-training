/**
 * Created by Bao Nghiem on 2/22/2020.
 */
import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import About from "./About";
import ContactUs from "./ContactUs";
import Home from "./Home";
import TodoList from "./todolist/list";

class RouterUrl extends Component {
    render() {
        return(
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/list-todo" component={TodoList}/>
                <Route path="/about" component={About}/>
                <Route path="/contact-us" component={ContactUs}/>
            </Switch>
        )
    }
}

export default RouterUrl;