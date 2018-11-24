import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface MapProps {

}
interface MapState {
  region: object;
}

export default class Map extends Component <MapProps, MapState> {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  static navigationOptions = { title: 'List of Recycling Locations' };

  getInitialState() {
    return {
      region: {
        latitude: 40.705132,
        longitude: -74.009258,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  
  render() {
    console.log(this.props, 'test')
    return (
      <MapView
        style={{ flex: 1 }}
        apikey={ GOOGLE_MAPS_API_KEY }
        provider="google"
        region={ this.state.region }
        /* onRegionChange={ this.onRegionChange } */
      />
    );
  }
};
