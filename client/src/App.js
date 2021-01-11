import React, { Component } from 'react';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";

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
            curPos: null,
            userMarks: [new UserMark(
                {
                    lat: 57.2531189,
                    lng: 65.6689470
                }, 1, 1000
            )]
        }
    }

    updatePosition(newPos) {
        this.setState({curPos: newPos});
        console.log(this.state.curPos);
    }

    render() {
        return (
            <div className="App-mapBlock">
                <MapBlock curPos={this.state.curPos}/>
                <UiBlock updatePosition={(newPos) => {this.updatePosition(newPos)}} userMarks={this.state.userMarks}/>
                <AuthController />
            </div>
        );
    }
}

export default App;
