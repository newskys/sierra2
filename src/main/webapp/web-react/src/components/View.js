import React, {Component} from 'react';
import axios from 'axios';

class View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: {}
        }

        axios.get(`http://localhost:8080/docs/read`)
        .then(data => data.data)
        .then(res => {
            console.log(res);
            this.setState({
                contents: res
            })
        }).catch(res => console.log(res));
    }

    
    render() {
        return (
            <div>
                <textarea readOnly value={this.state.contents}></textarea>
            </div>
        );
    }
}

export default View;