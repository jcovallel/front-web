import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import RouterIndex from './Routes/RouterIndex';
import Container from "react-bootstrap/Container";
/* eslint react/prop-types: 0 */
export default class Landing extends React.Component {

    render(){
        return (
              <div className={"Background"}>
                  <br></br>
                  <Router>
                      <Container bsPrefix={"Homee"}>
                          <RouterIndex/>
                      </Container>
                  </Router>
              </div>
        );
    }

}
Landing.defaultProps = {};
/* eslint react/prop-types: 0 */