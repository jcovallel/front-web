/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import './All.css';
import './Login.css';
import axios from 'axios';
import {connect} from "react-redux"
import {saveuser, savejwt} from "../Redux/ActionCreators";
import { print } from "graphql";
import gql from "graphql-tag";


class Home extends Component {

        constructor(props){
            super(props);
            this.state = {
                username: null,
                password: null
            };
        }

    handleSubmit = (e) => {
        e.preventDefault();
        const LOG_USER_AUTH = gql`
        query signin(
          $userName: String!
          $password: String!
        ) {
          signin(
            user: {
              userName: $userName
              password: $password
            }
          )
        }
      `;
        const GET_USER = gql`
        query userByUsername(
            $username: String!
        ){
            userByUsername(
                username: $username
            ){
                id
                username
                mail
            }
        }
        `
        axios({
            method: "POST",
            url: "http://34.68.231.167:8080/graphql",
            data: {
              query: print(LOG_USER_AUTH),
              variables: {
                userName: this.state.username,
                password: this.state.password
              }
            }
        }).then(res => {
            console.log("Breeee")
            this.props.savejwt(res.data.data.signin);
            axios({
                method: "POST",
                url: "http://34.68.231.167:8080/graphql",
                data:{
                    query: print(GET_USER),
                    variables:{
                        username: this.state.username
                    }
                }
            }).then(res=>{
                console.log("Bree")
                this.props.saveuser(res.data.data.userByUsername);
                this.props.history.push('/chatroom');
            })
        }).catch(res =>{
            console.log(res);
            this.props.history.push('/register');
        });
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

    render(){
        return(
            <div className="App">
            <header className="App-header">
                <img width={250} height={250} src='https://image.flaticon.com/icons/svg/1820/1820881.svg' className="App-logo" alt="logo" />
                <div className="container">
                <div className="row" style={{marginTop: '20px'}}>
                    <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3" style={{border:'1px solid #cecece',marginLeft:'25%'}}>
                    <form role="form">
                        <fieldset>
                        <h2>Please Sign In</h2>
                        <hr className="colorgraph"/>
                        <div className="form-group">
                            <input type="username" name="username" id="username" className="form-control input-lg" placeholder="Username" onChange={this.handleUsernameChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" onChange={this.handlePasswordChange}/>
                        </div>
                        <hr className="colorgraph"/>
                        <div className="row" style={{marginLeft: '3%',marginRight: '3%'}}>
                            <input  type="submit" className="btn btn-lg btn-primary btn-block" value="Sign In" onClick={this.handleSubmit}/>
                        </div>
                        <span className="forgot-pass">
                            <a href={"/register"} className="btn btn-link pull-right">Don't have an account? Sign up</a>
                        </span>
                        </fieldset>
                    </form>
                    </div>
                </div>
                </div>
            </header>
            </div>
        );
    }
    signUp() {
        
    };
    signIn() {
        
    }
}

const mapStateToProps = () =>{
    return{
        
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        saveuser(user){
            dispatch(saveuser(user))
        },
        savejwt(jwt){
            dispatch(savejwt(jwt))
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Home);

/* eslint react/prop-types: 0 */