import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import MapBlock from "./MapBlock/MapBlock";
import UiBlock from "./UiBlock/UiBlock";
import AuthController from "./AuthController/AuthController";

export class App extends Component {
    constructor(props) {
        super(props);
    }

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