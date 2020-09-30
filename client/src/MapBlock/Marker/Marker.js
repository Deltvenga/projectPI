import React, {Component} from 'react';
import './Marker.css';

export class Marker extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="marker"
                 style={{backgroundColor: 'red', cursor: 'pointer'}}
                 title={this.props.name}
            />
        );
    }
}

export default Marker;