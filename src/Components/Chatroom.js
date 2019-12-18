import React, {Component} from 'react';
import './Chatroom.css';
import axios from 'axios';
import {connect} from "react-redux"
import {myFirestore} from './Firebase';
import { print } from "graphql";
import gql from "graphql-tag";

class Chatroom extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: '97275'+this.props.user.username + ' se ha unido al chat!',
            dateini: null
        };
        this.listMessage = []
        this.removeListener = null
        this.usuario = []
    }

    componentDidMount() {
        if(this.props.jwt===""){
            this.props.history.push('/home');
        }
        document.getElementById("mybut").click();
        this.getMessages();
        this.setupBeforeUnloadListener();
    }

    getMessages = async () => {
        if (this.removeListener) {
            this.removeListener()
        }
        var listMessage = null
        this.removeListener = myFirestore.collection('chat').orderBy('date').onSnapshot(
            snapshot =>{
                snapshot.docChanges().forEach(change => {
                    if(change.type === "added"){
                        if(change.doc.data().date>=this.state.dateini){
                            listMessage = (change.doc.data().text);
                            this.usuario = change.doc.data().from;
                            // eslint-disable-next-line no-useless-concat
                            this.renderMessages(listMessage);
                        }
                    } 
                })
            }
        );
    }

    renderMessages(listMessage){
        var messageArea = document.querySelector('#messageArea');
        var messageElement = document.createElement('li');
        if(listMessage.slice(0,5)==='97275'){
            listMessage=listMessage.slice(5);
            messageElement.classList.add('event-message');
        }else{
            messageElement.classList.add('chat-message');
            var avatarElement = document.createElement('i');
            var avatarText = document.createTextNode(this.usuario[0]);
            avatarElement.appendChild(avatarText);
            avatarElement.style['background-color'] = this.getAvatarColor();
            messageElement.appendChild(avatarElement);
            var usernameElement = document.createElement('span');
            var usernameText = document.createTextNode(this.usuario);
            usernameElement.appendChild(usernameText);
            messageElement.appendChild(usernameElement);
        }
        var textElement = document.createElement('p');
        var messageText = document.createTextNode(listMessage);
        textElement.appendChild(messageText);
        messageElement.appendChild(textElement);
        messageArea.appendChild(messageElement);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    getAvatarColor() {
        var hash = 0;
        for (var i = 0; i < this.usuario.length; i++) {
            hash = 31 * hash + this.usuario.charCodeAt(i);
        }
        var colors = [
            '#2196F3', '#32c787', '#00BCD4', '#ff5652',
            '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
        ];
        var index = Math.abs(hash % colors.length);
        return colors[index];
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            message: e.target.value
        })
        var todayDate2 = new Date();
        todayDate2.setHours(todayDate2.getHours() - 5);
        var todayDate3 = todayDate2.toISOString().toString();
        console.log(todayDate3);
    }

    debug = (e) => {
        console.log(this.props.user.mail)
        console.log(this.state.listMessage)
    }

    doSomethingBeforeUnload = () => {
        // Do something
        this.setState({
            message: '97275'+this.props.user.username + ' ha abandonado el chat!'
        });
        document.getElementById("mybut").click();
    }

    setupBeforeUnloadListener = () => {
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return this.doSomethingBeforeUnload();
        });
    };

    handleSubmit = (e) => {
        document.getElementById('message').value = '';
        e.preventDefault();
        //var todayDate = new Date().toISOString().slice(0,10);
        var todayDate2 = new Date();
        todayDate2.setHours(todayDate2.getHours() - 5);
        var todayDate3 = todayDate2.toISOString().toString();
        this.setState({
            dateini: todayDate3
        })
        const CREATE_CHAT_MSG = gql`
        mutation createChat(
          $emisor: Int!
          $mensaje: String!
          $fecha: String!
        ) {
          createChat(
            Chat: {
                emisor: $emisor
                mensaje: $mensaje
                fecha: $fecha
            }
          ){
              mensaje
          }
        }
      `;
        const CREATE_NOTIFICATION = gql`
        mutation createNotification(
            $message: String!
            $sender_id: Int!
            $chat_id: Int!
            $users: [Int!]
        ){
            createNotification(
                notification: {
                    message: $message
                    sender_id: $sender_id
                    chat_id: $chat_id
                    users: $users
                }
            ){
                message
            }
        }
        `
    axios({
        method: "POST",
        url: "http://34.68.231.167:8080/graphql",
        data: {
            query: print(CREATE_CHAT_MSG),
            variables: {
            emisor: this.props.user.id,
            mensaje: this.state.message,
            fecha: todayDate3
            }
        }
    }).then(res =>{
        axios({
            method: "POST",
            url: "http://34.68.231.167:8080/graphql",
            data: {
                query: print(CREATE_NOTIFICATION),
                variables: {
                    message: this.state.message,
                    sender_id: this.props.user.id,
                    chat_id: 1,
                    users: [1]
                }
            }
        })
    });
    myFirestore.collection('chat').add({
        'text': this.state.message,
        'from': this.props.user.username,
        'date': todayDate3
    })
    }



    render(){
        return(
            <div id="chat-page" className="hidden">
                <br/>
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Bienvenido a PugChat</h2>
                    </div>
                    <ul id="messageArea">

                    </ul>
                    <form id="messageForm" name="messageForm">
                        <div className="form-group">
                            <div className="input-group clearfix">
                                <input onChange={this.handleChange} type="text" id="message" placeholder="Type a message..." autoComplete="off"
                                       className="form-control"/>
                                <button type="submit" id="mybut" className="primary" onClick={this.handleSubmit}>Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        user: state.user,
        user2: state.user2,
    };
};

const mapDispatchToProps = () =>{
    return{
        
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Chatroom);