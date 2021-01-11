import React, { Component } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow, Circle} from 'google-maps-react';
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

class UserMark {
    constructor(markLocation, markType, markValue) {
        this.location = markLocation;
        this.type = markType;
        this.value = markValue;
    }
}

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: props,
            activeMarker: null,
            showingInfoWindow: true,
            userMarks: [new UserMark(
                {
                    lat: 57.2531,
                    lng: 65.6689
                }, 1, 1000
            )]
        }

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

    types = {
        1:'Домашние расходы',
        2:'Развлечения',
        3:'Здоровье'
    }

    getMarkCaption(value) {
        return this.types[value.type] + " " + value.value
    }

    id = 1;

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
                {this.state.userMarks.map((mark, index)=> {
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
    apiKey: process.env.MAP_API_KEY
})(MapContainer);
