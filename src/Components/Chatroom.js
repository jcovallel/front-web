import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux"
import {saveuser2} from "../Redux/ActionCreators";
import {Container, Row, Column, Card} from "react-bootstrap";
import {myFirestore, myStorage} from './Firebase'
import MesageCard from './MesageCard.js';

class Chatroom extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
        this.listMessage = [];
        this.removeListener = null
    }

    componentDidMount() {
        // For first render, it's not go through componentWillReceiveProps
        let doc = myFirestore.collection('chat').orderBy('date');

        let observer = doc.onSnapshot(docSnapshot => {
            console.log(docSnapshot)
        for(var i= 0; i< docSnapshot._snapshot.docChanges.length; i++){
            console.log("Usuario: "+ docSnapshot._snapshot.docChanges[i].doc.proto.fields.from.stringValue + " Mensaje: " + docSnapshot._snapshot.docChanges[i].doc.proto.fields.text.stringValue);
            this.listMessage[i] = docSnapshot._snapshot.docChanges[i].doc.proto;
        }
        // ...
        }, err => {
        console.log(`Encountered error: ${err}`);
        });

        console.log("Los mensajes que ojalá hayan :,v ")
        console.log(this.listMessage)

    }

    render(){

        let MesageCards = this.listMessage.map(fields =>{
            return(
                <div>
                    <MesageCard fields={fields}>

                    </MesageCard>
                </div>
            )
        })

        return(
            <div>
                
                {MesageCards}
            </div>
        )
    }

    hashString = str => {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    }

}

const mapStateToProps = (state) =>{
    return{
        user: state.user,
        user2: state.user2,
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        saveuser2(user){
            dispatch(saveuser2(user))
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Chatroom);