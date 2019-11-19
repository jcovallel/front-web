import React, {Component} from 'react';
import './Register.css';
import axios from 'axios';
import {connect} from "react-redux"
import {saveusername} from "../Redux/ActionCreators";
import { print } from "graphql";
import gql from "graphql-tag";


class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
        };
    }

    handleUsernameChange = (e) => {
        e.preventDefault();
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    handleEmailChange = (e) => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const CREATE_USER_USERS = gql`
        mutation createUser(
            $username: String!
            $password: String!
            $mail: String!
            $verification: Boolean!
            $active: Boolean!
            $password_confirmation: String!
        ) {
          createUser(
            user: {
              username: $username
              password: $password
              mail: $mail
              verification: $verification
              active: $active
              password_confirmation: $password_confirmation
            }
          ){
              username
           }
          }
        `;
        const CREATE_USER_AUTH = gql`
        mutation createAuthUser(
            $userName: String!
            $password: String!
        ){
            createAuthUser(
                user:{
                    userName: $userName
                    password: $password
                }
            )
         }
        `;
        axios({
            method: "POST",
            url: "http://54.39.98.125:5000/graphql",
            data: {
              query: print(CREATE_USER_USERS),
              variables: {
              username: this.state.username,
              password: this.state.password,
              mail: this.state.email,
              verification: true,
              active: true,
              password_confirmation: this.state.password,
              }
            }
        }).then(res =>{
            console.log(res.data.data.createUser.username);
            this.props.saveusername(res.data.data.createUser.username);
        });
        axios({
            method: "POST",
            url: "http://54.39.98.125:5000/graphql",
            data:{
                query: print(CREATE_USER_AUTH),
                variables: {
                    userName: this.state.username,
                    password: this.state.password
                }
            }
        }).then(res=>{
            this.props.history.push('/home');
        })
    }


    render(){
        return(
            <header className="SP-header">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                        <h1>Sign Up</h1>
                        <fieldset style={{marginTop:'20px'}}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" id="username" className="form-control input-lg" placeholder="Please enter an username" onChange={this.handleUsernameChange}/>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" id="email" className="form-control input-lg" placeholder="Please enter your email address" onChange={this.handleEmailChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Please enter a password" onChange={this.handlePasswordChange}/>
                            </div>
                            <div className="row" style={{marginLeft: '30%',marginRight: '30%', marginTop:'30px'}}>
                                <input onClick={this.handleSubmit} type="submit" className="bthis.state.username,
                password: this.state.passwordtn btn-lg btn-primary btn-block" value="Sign Up"/>
                            </div>
                        </fieldset>
                    </div>
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3" style={{textAlign:'center'}}>
                    <img width={250} height={250} src='https://image.flaticon.com/icons/svg/1820/1820881.svg' className="App-logo" alt="logo" />
                        <p>
                            ¡Crea tu usuario!
                        </p>
                    </div>
                </div>
            </div>
        </header>
        )
    }

}

const mapStateToProps = () =>{
    return{
        
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        saveusername(username){
            dispatch(saveusername(username))
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Register);