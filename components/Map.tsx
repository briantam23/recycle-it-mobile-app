import * as React from 'react';
import { Component } from 'react';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { OpenMapDirections } from 'react-native-navigation-directions';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const startPoint = navigator.geolocation.getCurrentPosition(
  position => JSON.stringify(position),
  error => alert(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);

interface MapProps {
  markers: Array<object>;
}

interface MapState {
  region: object;
}

export default class Map extends Component<MapProps, MapState> {
  static navigationOptions = {
    title: 'List of Recycling Locations',
    headerStyle: {
      backgroundColor: 'green',
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 35,
    },
  };
  
  constructor(props) {
    super(props);
    this.state = {
      latitude: 40.7308,
      longitude: -73.9973,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  };
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _callShowDirections = coordinate => {
    const transportPlan = 'd';
    OpenMapDirections(this.state, coordinate, transportPlan)
      .then(res => console.log(res));
  };

  render() {
    const { markers } = this.props;
    const { state, _callShowDirections } = this;
    return (
      <MapView
        style = {{ flex: 1 }}
        apikey = { GOOGLE_MAPS_API_KEY }
        provider = "google"
        region = { state }
        showsUserLocation = { true }
        followsUserLocation = { true }
        showsMyLocationButton = { true }
        onLongPress = { (e) => _callShowDirections(e.nativeEvent.coordinate) }
      >
      {
        markers.map((marker, idx) => {
          const { latitude, longitude, distance, curbside, municipal } = marker;
          const title = marker.description;
          description = 'Distance: ' + distance + '\n' +
                        //'Curbside: ' + curbside + '\n' +
                        //'Municipal: ' + municipal + '\n' +
                        'LONG PRESS at the bottom of the pin FOR DIRECTIONS!' 
          return(
            <Marker
                key={ idx }
                coordinate={{ latitude, longitude }}
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
