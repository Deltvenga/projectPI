import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: props,
            activeMarker: null,
            showingInfoWindow: true
        }
    }
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    render() {

        return (
            <Map
                google={window.google}
                zoom={14}
                initialCenter={
                    {
                        lat: 57.1531181,
                        lng: 65.5689476
                    }
                }
            >
                <Marker
                    position={{ lat: 57.1531181, lng: 65.5689476 }}
                >
                    <div>test</div>
                </Marker>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.MAP_API_KEY
})(MapContainer);
