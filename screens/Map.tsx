import * as React from 'react';
import { Component } from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface MapProps {
  markers: Array<object>;
}

interface MapState {
  region: object;
}

export default class Map extends Component <MapProps, MapState> {
  static navigationOptions = { title: 'List of Recycling Locations' };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7308,
        longitude: -73.9973,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  
  _callShowDirections = coordinate => {
    const startPoint = navigator.geolocation.getCurrentPosition(
      position => JSON.stringify(position),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const { latitude, longitude } = coordinate;
    const endPoint = { latitude, longitude };

    const transportPlan = 'd';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }

  render() {
    return (
      <MapView
        style = {{ flex: 1 }}
        apikey = { GOOGLE_MAPS_API_KEY }
        provider = "google"
        region = { this.state.region }
        showsUserLocation = { true }
        followsUserLocation = { true }
        showsMyLocationButton = { true }
        onLongPress = { (e) => this._callShowDirections(e.nativeEvent.coordinate) }
      >
      {
        this.props.markers.map((marker, idx) => {
          const { latlng, title, distance, curbside, municipal } = marker;
          description = marker.description + '\n' + 
                        'Distance: ' + distance + '\n' +
                        //'Curbside: ' + curbside + '\n' +
                        //'Municipal: ' + municipal + '\n' +
                        'LONG PRESS AT THE BOTTOM OF THE PIN FOR DIRECTIONS' 
          return(
            <Marker
                key={ idx }
                coordinate={ latlng }
                title={ title }
                description={ description }
            />
          )
        })
      }
      </MapView>
    )
  }
}
