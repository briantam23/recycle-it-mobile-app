import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;


export default class Map extends Component {
  static navigationOptions = { title: 'My Profile' };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        apikey={GOOGLE_MAPS_API_KEY}
        provider="google"
        initialRegion={{
          latitude: 40.705132,
          longitude: -74.009258,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
