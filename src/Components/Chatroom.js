import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import {Container, Row, Card, Col, InputGroup, FormControl, Button} from "react-bootstrap";
import {myFirestore} from './Firebase';
import { print } from "graphql";
import gql from "graphql-tag";

class Chatroom extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: ""
        };
        this.listMessage = []
        this.removeListener = null
    }

    componentDidMount() {
        if(this.props.jwt===""){
            this.props.history.push('/home');
        }
        this.getMessages();
    }

    getMessages = async () => {
        if (this.removeListener) {
            this.removeListener()
        }
        var listMessage = []
        this.removeListener = myFirestore.collection('chat').orderBy('date').onSnapshot(
            snapshot =>{
                snapshot.docChanges().forEach(change => {
                    if(change.type === "added"){
                        listMessage.push(change.doc.data().text);
                        // eslint-disable-next-line no-useless-concat
                        console.log(change.doc.data().text);
                        this.renderMessages(listMessage);
                    } 
                })
            }
        );
        
        this.renderMessages();
    }

    renderMessages(listMessage){
        //console.log(listMessage)
        this.setState({
            listMessage: listMessage
        })
        //console.log(this.listMessage)
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

    handleSubmit = (e) => {
        e.preventDefault();
        var todayDate = new Date().toISOString().slice(0,10);
        var todayDate2 = new Date();
        todayDate2.setHours(todayDate2.getHours() - 5);
        var todayDate3 = todayDate2.toISOString().toString();
        console.log(todayDate);
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
        url: "http://54.39.98.125:5000/graphql",
        data: {
            query: print(CREATE_CHAT_MSG),
            variables: {
            emisor: this.props.user.id,
            mensaje: this.state.message,
            fecha: todayDate3
            }
        }
    }).then(res =>{
        console.log(res.data.data.createChat.mensaje);
        axios({
            method: "POST",
            url: "http://54.39.98.125:5000/graphql",
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
            <div>
                {}
                <Container>
                    <Row>
                    <Col>
                            <Card body bg="dark" text="white">
                                <Card body bg="dark" text="white">
                                    {this.props.user.username}
                                </Card>
                                <Card body bg="dark" text="white">
                                    Desarrollo
                                </Card>
                                <Card body bg="dark" text="white">
                                    --------
                                </Card>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card body bg="dark" text="white">
                            <InputGroup>
                                <FormControl onChange={this.handleChange} as="textarea" aria-label="With textarea" />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={this.handleSubmit}>Enviar</Button>
                                    <Button variant="outline-secondary" onClick={this.debug}>Debug</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
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