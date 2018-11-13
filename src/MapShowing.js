import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import axios from "axios"
import Geocode from "react-geocode";

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: 12.9716, lng: 77.5946 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.shelter}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class Maping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],

      selectedMarker: false
    }
  }
  componentDidMount() {
    axios.get(`https://interviewapikloc.herokuapp.com/stores.json`).then(res => {
      Geocode.setApiKey("API_KEY");
      Geocode.enableDebug();
      res.data.forEach(value => {
        // console.log(value)
        let obj = {}
        Geocode.fromAddress(value.location).then(
          response => {
            // const { lat, lng } = response.results[0].geometry.location;
            obj.lat = response.results[0].geometry.location.lat
            obj.lng = response.results[0].geometry.location.lng
            this.state.shelters.push(obj)
            this.setState({ shelters: this.state.shelters })
            // console.log(obj)
          },
          error => {
            console.error(error);
          }
        );
      })
      // console.log(res.data)
    })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    return (
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}
