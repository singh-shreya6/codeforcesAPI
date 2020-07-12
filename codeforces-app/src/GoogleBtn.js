import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { get } from 'lodash/get';


const CLIENT_ID = '<your Client ID>';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.isLogin ?
                    <GoogleLogout
                        clientId={"731609512723-cqtautsrvi47bp5eiipfh004jc0gp019.apps.googleusercontent.com"}
                        buttonText='Logout'
                        onLogoutSuccess={this.props.logout}
                        onFailure={this.props.handleLogoutFailure}
                    >
                    </GoogleLogout> : <GoogleLogin
                        clientId={"731609512723-cqtautsrvi47bp5eiipfh004jc0gp019.apps.googleusercontent.com"}
                        buttonText='Login'
                        onSuccess={this.props.login}
                        onFailure={this.props.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                        isSignedIn={true}
                    />
                }

            </div>
        )
    }
}

export default GoogleBtn;