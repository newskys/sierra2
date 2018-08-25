import React, {Component} from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from 'react-router-dom';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: {}
        }

        axios.request({
            url: `http://localhost:8080/docs/read`,
            method: "get",
            timeout: 1000,
            onUploadProgress: null,
            headers: {Authorization: this.props.user.token}
        })
            .then(data => data.data)
            .then(res => {
                console.log(res);
                this.setState({
                    contents: res
                })
            }).catch(res => {
                if (res.response.status === 500) {
                    this.props.history.push("/Login");
                }
            });
    }


    render() {
        return (
            <div>
                <textarea readOnly value={this.state.contents}></textarea>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
    , withRouter
)(View);