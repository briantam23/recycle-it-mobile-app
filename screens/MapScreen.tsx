import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Map from './Map';
import { connect } from 'react-redux';


const markers = [
  {
    latlng: {
      latitude: 37.78825,
      longitude: -122.4324
    },
    title: 'sample-SF1',
    description: 'sample-SanFran1'
  },
  {
    latlng: {
      latitude: 37.78825,
      longitude: -122.4369
    },
    title: 'sample-SF2',
    description: 'sample-SanFran2'
  }
]

export default class MapScreen extends Component {
  static navigationOptions = { title: 'List of Recycling Locations' };
  
  render() {
    return (
      <Map markers={ markers } />
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