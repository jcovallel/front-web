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
        // For first render, it's not go through componentWillReceiveProps
        this.getMessages();
    }

    componentWillUnmount() {
        if (this.removeListener) {
            this.removeListener()
        }
    }

     getMessages = async () => {
        if (this.removeListener) {
            this.removeListener()
        }
        this.removeListener = myFirestore.collection('chat').orderBy('date').onSnapshot(
            snapshot =>{
                snapshot.docChanges().forEach(change => {
                    if(change.type === "added"){
                        this.listMessage.push(change.doc.data().text);
                        // eslint-disable-next-line no-useless-concat
                        console.log("Remitente: " + change.doc.data().from +  "  " + "Mensaje: "+change.doc.data().text);
                    } 
                })
            }
        );
        this.renderMessages();
    }

    renderMessages= async () => {
        await this.getMessages;
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
          $receptor: Int!
          $mensaje: String!
          $fecha: String!
        ) {
          createChat(
            Chat: {
                emisor: $emisor
                receptor: $receptor
                mensaje: $mensaje
                fecha: $fecha
            }
          ){
              mensaje
          }
        }
      `;
    axios({
        method: "POST",
        url: "http://localhost:5000/graphql",
        data: {
            query: print(CREATE_CHAT_MSG),
            variables: {
            emisor: this.props.user.id,
            receptor: this.props.user2.id,
            mensaje: this.state.message,
            fecha: todayDate3
            }
        }
    }).then(res =>{
        console.log(res.data.data.createChat);
    });
    
    myFirestore.collection('chat').add({
        'text': this.state.message,
        'from': this.props.user.username,
        'to': this.props.user2.username,
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
                                    En 
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