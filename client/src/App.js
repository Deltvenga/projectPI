import React, { Component } from 'react';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";
import axios from "axios";

class UserMark {
    constructor(markLocation, markType, markValue) {
        this.location = markLocation;
        this.type = markType;
        this.value = markValue;
    }
}

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPos: {
                lat: 56.2531189,
                lng: 64.6689470
            },
            userInfo: {}
        }
    }

    updatePosition(newPos) {
        this.setState({curPos: {
                lat: 56.25313,
                lng: 64.66893
            }});
        console.log(this.state.curPos);
    }

    componentDidMount() {
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

    render() {
        return (
            <div className="App-mapBlock">
                <MapBlock
                    userMarks={this.state.userInfo.marks || []}
                    curPos={this.state.curPos}
                />
                <UiBlock
                    updatePosition={(newPos) => {this.updatePosition(newPos)}}
                    userMarks={this.state.userInfo.marks || []}
                />
                <AuthController />
            </div>
        );
    }
}

export default App;
