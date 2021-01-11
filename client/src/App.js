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
            userMarks: [new UserMark(
                {
                    lat: 57.2531189,
                    lng: 65.6689470
                }, 1, 1000
            )]
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
            this.setState({userMarks: resultArr});
        })
    }

    render() {
        return (
            <div className="App-mapBlock">
                <MapBlock userMarks={this.state.userMarks} curPos={this.state.curPos}/>
                <UiBlock updatePosition={(newPos) => {this.updatePosition(newPos)}} userMarks={this.state.userMarks}/>
                <AuthController />
            </div>
        );
    }
}

export default App;
