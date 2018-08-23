import React, {Component} from 'react';

const getDataAjaxFetch = (url, method, body) => 
    (
    fetch(url, {mode: "cors", method, body})
    .then(res => res.text())
    )
;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: ""
        }
    }

    render() {
        return (
            <div>
                <form name="login" onSubmit={event => this.handleSubmit(event)}>
                <input type="text" id="userId" name="userId" onChange={event => this.updateInputValue(event)} />
                <input type="password" id="password" name="password" onChange={event => this.updateInputValue(event)} />
                <button type="submit" name="login">submit</button>
                </form>
            </div>
        );
    }

    handleSubmit(event) {
        const body = new FormData(event.target);
        console.log(body);
        event.preventDefault();
        getDataAjaxFetch(`http://localhost:8080/api/login`, "post", body).then(data => {
            // getDataAjaxFetch(`http://localhost:8080/login/submit?${_csrf.parameterName}=${_csrf.token}`, "post").then(data => {
            for(let key in data) { // 받아온 json 데이터의 키와 값의 쌍을 모두 출력.
            // if(data.hasOwnProperty(key))
                // console.log(`${key}: ${data[key]}`);
            }
            console.log(data);
        }).catch(err => console.error(err));
      }

    updateInputValue(event) {
        const name = event.target.name;
        const value = event.target.value;
      this.setState({
        [name]: event.target.value
      });
    }
}

export default Login;