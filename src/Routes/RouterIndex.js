import React, { Component } from 'react';
import Home from '../Components/Home.js';
import Register from '../Components/Register.js';
import Chats from '../Components/Chats.js';
import Chatroom from '../Components/Chatroom.js';
import { Route } from "react-router-dom";

/* eslint react/prop-types: 0 */
export default class RouterIndex extends Component {


    render(){
        return (
            <div style={{height : '100vh'}}>
                <Route path="/" exact component={Home}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/chats" exact component={Chats}/>
                <Route path="/chatroom" exact component ={Chatroom}/>
            </div>
        );
    }
}
/* eslint react/prop-types: 0 */