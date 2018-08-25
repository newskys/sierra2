import React, {Component} from 'react';
import {convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import '../../../../resources/static/react-draft-wysiwyg.css';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from "react-redux";
import {compose} from "redux";
import axios from 'axios';

const getDataAjaxFetch = url => (
    fetch(url).then(res => res.text())
);

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        });
    }

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <input type="text"/>
                <Editor
                    toolbar={{
                        options: ['inline', 'link', 'embedded', 'image', 'emoji'],
                        inline: {
                            options: ['bold', 'underline', 'strikethrough']
                        },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: {
                                present: true,
                                mandatory: true
                            }
                        },
                    }}
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    localization={{
                        locale: 'ko',
                    }}
                />
                <button
                    onClick={this.submit("newskys", `${draftToHtml(convertToRaw(editorState.getCurrentContent()))}`)}>submit
                </button>
            </div>
        );
    }

    submit(userId, contents) {
        return () => {
            contents = encodeURIComponent(contents);
            console.log(contents);
            const config = {
                url: `http://localhost:8080/docs/save?userId=${userId}&contents=${contents}`,
                method: "get",
                timeout: "1000",
                onUploadProgress: null,
                headers: {Authorization: this.props.user.token}
            };
            axios.request(config)
                .then(data => console.log(data))
                .catch(err => console.error(err));

            // getDataAjaxFetch(`http://localhost:8080/docs/save?userId=${userId}&contents=${contents}`, "get").then(data => {
            //     // for(let key in data) { // 받아온 json 데이터의 키와 값의 쌍을 모두 출력.
            //     // if(data.hasOwnProperty(key))
            //     //     console.log(`${key}: ${data[key]}`);
            //     // }
            //     console.log(data);
            // }).catch(err => console.error(err));
        }
    }
}

function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );
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
)(Write);