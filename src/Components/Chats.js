import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import {deleteuser, deleteusername, saveuser2} from "../Redux/ActionCreators";
import UserCard from './UserCard';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class Chats extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        axios({
            url: "http://localhost:5000/graphql",
            method: "POST",
            data:{
                query: `
                query allUsers{
                    username
                }
                `
            }
        })
        axios({
            url: "http://localhost:4002/users/index",
            method: "GET",
        }).then(res =>{
            console.log(res);
            this.setState({
                users: res.data
            })
        })
    }

    logout = (e) => {
        e.preventDefault();
        this.props.deleteuser();
        this.props.deleteusername();
        this.props.history.push('/home');
    }

    gotoChat= (e) => {
        e.preventDefault();
        axios({
            method: "GET",
            url: "http://172.17.0.1:4002/users/"+e.target.id,
        }).then(res=>{
            console.log(res.data);
            this.props.saveuser2(res.data);
        })
        this.props.history.push("/chatroom/"+e.target.id);
    }

    render(){

        let UserCards = this.state.users.map(user=>{
            return(
                <div>
                    <UserCard user={user}></UserCard>
                    <ButtonToolbar>
                        <Button block={true} variant={"dark"} onClick={this.gotoChat} id={user.id}>Hablar</Button>
                    </ButtonToolbar>
                    <br/>
                </div>
            )
        })

        return(
            <div>
                {UserCards}
                <Button variant="dark" onClick={this.logout}>Logout</Button>
            </div>
            
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        user: state.user,
        username: state.username
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        saveuser2(user){
            dispatch(saveuser2(user));
        },
        deleteuser(){
            dispatch(deleteuser());
        },
        deleteusername(){
            dispatch(deleteusername());
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Chats);