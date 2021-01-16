import React, { Component } from 'react';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";
import axios from "axios";
import { useCookies } from 'react-cookie';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPos: {
                lat: 56.2531189,
                lng: 64.6689470
            },
            curClickPos: {},
            userInfo: {},
            userId: '',
            isAuth: false
        }
    }

    updatePosition(newPos) {
        this.setState({curPos: {
                lat: 56.25313,
                lng: 64.66893
            }});
        console.log(this.state.curPos);
    }

    componentWillMount() {

        axios.post('http://localhost:3001/getUserInfo', null, {
            params: {
                userId: '5fd78c514fb6173abed4d1be',
            }
        }).then((data) => {
            var resultArr = [];
            data.data[0].marks.forEach((value) => {
                resultArr.push(JSON.parse(value));
            })
            data.data[0].marks = resultArr;
            this.setState({userInfo: data.data[0]});
        })
    }

    setUserInfo(data) {
        this.setState({userInfo: data});
    }

    addUserMark(newMark) {
        var newUserInfoState = this.state.userInfo;
        newUserInfoState.marks.push(newMark)
        this.setState({userInfo: Object.assign({}, newUserInfoState)});
    }

    render() {
        return (
            <div className="App-mapBlock">
                <MapBlock
                    userMarks={this.state.userInfo.marks || []}
                    curPos={this.state.curPos}
                    setCurrentClickCoords={(pos) => {this.setState({curClickPos: pos})}}
                />
                <UiBlock
                    updatePosition={(newPos) => {this.updatePosition(newPos)}}
                    addUserMark={(newMark) => {this.addUserMark(newMark)}}
                    userMarks={this.state.userInfo.marks}
                    curClickCoords={this.state.curClickPos}
                />
                <AuthController
                    isAuth={this.state.isAuth}
                    setUserInfo={this.setUserInfo.bind(this)}
                />
            </div>
        );
    }
}

export default App;
