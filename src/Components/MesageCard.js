import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
/* eslint react/prop-types: 0 */
export default class MesageCard extends Component {

    render() {
        return (
            <div>
                <Card body bg="dark" text="white">
                        - De: {this.props.from.stringValue}
                        - Para: {this.props.to.stringValue}

                        -{this.props.text.stringValue}
                </Card>  
            </div>
        )
    }
}