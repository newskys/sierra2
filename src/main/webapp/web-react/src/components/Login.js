import React, {Component} from 'react';
import axios from 'axios';
import {compose} from "redux";
import {connect} from "react-redux";
import {setUserInfo} from "../reducers/user";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: ""
        }
    }

    render() {
        if (this.props.user.token === "") {
            return (
                <div>
                    <form name="login" onSubmit={event => this.handleSubmit(event)}>
                        <input type="text" id="userId" name="userId" onChange={event => this.updateInputValue(event)} />
                        <input type="password" id="password" name="password" onChange={event => this.updateInputValue(event)} />
                        <button type="submit" name="login">submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    Log on!
                </div>
            );
        }
    }

    handleSubmit(event) {
        const body = new FormData(event.target);
        console.log(body);
        event.preventDefault();
        const config = {
            url: "http://localhost:8080/api/login",
            headers: {'Content-Type': 'multipart/form-data'},
            method: "post",
            data: body
        };
        axios.request(config)
            .then(data => {
                console.log("login succeed");
                const userInfo = {
                    userId: this.state.userId,
                    token: data.data
                };
                this.props.setUserInfo(userInfo);
            }).catch(err => {
                if (!!err && !!err.response && err.response.status === "406") {
                    alert("유효하지 않은 정보입니다.");
                }
            });
      }

    updateInputValue(event) {
        const name = event.target.name;
        const value = event.target.value;
      this.setState({
        [name]: event.target.value
      });
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setUserInfo: userInfo => dispatch(setUserInfo(userInfo))
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Login);