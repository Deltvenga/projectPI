import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Circle} from 'google-maps-react';
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: props,
            activeMarker: null,
            showingInfoWindow: true,
        }
        this.mapClickHandler = this.mapClickHandler.bind(this);

    }

    componentDidMount() {

    }

    styles = {
        infoWindow: {
            height: 100,
            width: 100,
            color: 'red'
        }
    }

    types = {
        1:'Домашние расходы',
        2:'Развлечения',
        3:'Здоровье'
    }

    getMarkCaption(value) {
        return this.types[value.type] + " " + value.value
    }

    id = 1;

    mapClickHandler(event, map, coord) {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.props.setCurrentClickCoords({lat, lng});
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
                onClick = { this.mapClickHandler }
            >
                {this.props.userMarks && this.props.userMarks.length > 0 && this.props.userMarks.map((mark, index)=> {
                    return (
                        <Marker
                            title={this.getMarkCaption(mark)}
                            key={index}
                            position={ {lat: mark.location.lat, lng: mark.location.lng} }
                            radius={100}
                            options={{
                                strokeColor: "#66009a",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: `#66009a`,
                                fillOpacity: 0.35,
                                zIndex: 1
                            }}
                        />
                    )
                })}
                <Marker
                    title={'Ваше местоположение'}
                    name={'curPos'}
                    id={0}
                    position={this.props.curPos || {
                        lat: 57.2531122,
                        lng: 65.6689453
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
    apiKey: 'AIzaSyDo16grl0dpu53GduSWbyIX5vVzo-kMx1I'
})(MapContainer);
