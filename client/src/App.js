import React, { Component } from 'react';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curPos: null
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
                <UiBlock updatePosition={(newPos) => {this.updatePosition(newPos)}}/>
                <AuthController />
            </div>
        );
    }
}

export default App;
