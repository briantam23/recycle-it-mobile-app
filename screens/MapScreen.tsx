import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Map from './Map';
import { connect } from 'react-redux';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const region = {
  latitude: 21.3069,
  longitude:  157.8583,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default class MapScreen extends Component {
  static navigationOptions = { title: 'List of Recycling Locations' };
  
  render() {
    return (
      <Map /* region={ region } *//>
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

/* const mapStateToProps = ({ where }) => { 
  let region = {};
  return {
    where: region 
  }
}

connect(mapStateToProps)(Map); */