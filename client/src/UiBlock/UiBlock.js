import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './UiBlock.css';

export class UiBlock extends Component {
    render() {
        return (
            <div className="App-uiBlock">
                <Button variant="contained" color="primary">
                    Primary
                </Button>
            </div>
        );
    }
}

export default UiBlock;