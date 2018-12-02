import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import Map from './Map';
import { connect } from 'react-redux';


const markers = [
  {
    latlng: {
      latitude: 40.7484,
      longitude: -73.9857
    },
    title: 'Empire State Building',
    description: 'Very Tall Building!',
    distance: '.5 mile',
    curbside: 'Yes',
    municipal: 'Yes'
  },
  {
    latlng: {
      latitude: 40.7056,
      longitude: -74.0027
    },
    title: 'South Street Seaport',
    description: 'Lots of Fish!!',
    distance: '.75 mile',
    curbside: 'No',
    municipal: 'No',
  }
]

export default class MapScreen extends Component {
  static navigationOptions = { title: 'List of Recycling Locations' };
  
  render() {
    return (
      <Map markers={ markers } /> //onMarkerPress
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