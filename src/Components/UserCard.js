import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
/* eslint react/prop-types: 0 */
export default class UserCard extends Component {

    render() {
        return (
            <div>
                <Card body bg="dark" text="white">
                    <img width={40} height={40} src='https://image.flaticon.com/icons/svg/1820/1820881.svg' alt="logo"/>
                        -{this.props.user.username}.
                </Card>  
            </div>
        )
    }
}
