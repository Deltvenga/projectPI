import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

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
    styles = {
        infoWindow: {
            height: 100,
            width: 100,
            color: 'red'
        }
    }

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
                    title={'Ваше местоположение'}
                    name={'curPos'}
                    id={1}
                    position={this.props.curPos || {
                        lat: 57.2531181,
                        lng: 65.6689476
                    }}
                >
                    <InfoWindow
                        visible={true}

                        style={this.styles.infoWindow}
                    >
                        <div>
                            <p>Click on the map or drag the marker to select location where the incident occurred</p>
                        </div>
                    </InfoWindow>
                </Marker>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.MAP_API_KEY
})(MapContainer);
