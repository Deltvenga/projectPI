import React, { Component } from 'react';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";

export class App extends Component {
    render() {
        return (
            <div className="App-mapBlock">
                <MapBlock />
                <UiBlock />
                <AuthController />
            </div>
        );
    }
}

export default App;
