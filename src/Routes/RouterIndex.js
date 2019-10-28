import React, { Component } from 'react';
import Home from '../Components/Home.js';
import { Route } from "react-router-dom";

/* eslint react/prop-types: 0 */
export default class RouterIndex extends Component {


    render(){
        return (
            <div>
                <Route path="/" exact component={Home}/>
                <Route path="/catalog" exact component={Home}/>

            </div>
        );
    }
}
/* eslint react/prop-types: 0 */