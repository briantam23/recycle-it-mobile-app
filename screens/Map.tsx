import React, { Component } from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

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
        //onPress = { () => }
      >
      {
        this.props.markers.map((marker, idx) => {
          const { latlng, title, distance, curbside, municipal } = marker;
          description = marker.description + '\n' + 
                        'Distance: ' + distance + '\n' +
                        //'Curbside: ' + curbside + '\n' +
                        //'Municipal: ' + municipal + '\n' +
                        'LONG PRESS FOR DIRECTIONS' 
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
