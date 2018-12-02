import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
  Button,
} from 'react-native';

import RecPlacesCard from '../components/RecPlacesCard';

const where = [
  {
    latlng: {
      latitude: 40.7484,
      longitude: -73.9857
    },
    title: 'Empire State Building',
    description: 'Very Tall Building!',
    curbside: 'Yes',
    municipal: 'Yes',
    location_id: 1,
    distance: '.5 mile',
    latitude: 40.7484,
    longitude: -73.9857,
    avatar_url: 'https://pbs.twimg.com/profile_images/378800000703449332/e0dc3e28cd8e4edca330ddcfab4690b0.jpeg'
  },
  {
    latlng: {
      latitude: 40.7056,
      longitude: -74.0027
    },
    title: 'South Street Seaport',
    description: 'Lots of Fish!!',
    curbside: 'No',
    municipal: 'No',
    location_id: 2,
    distance: '.75 mile',
    latitude: 40.7056,
    longitude: -74.0027,
    avatar_url: 'https://pbs.twimg.com/profile_images/378800000703449332/e0dc3e28cd8e4edca330ddcfab4690b0.jpeg'
  }
]

class LocationsScreen extends Component {
  static navigationOptions = {
    title: 'Places to Recycle ___ Near Me',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <RecPlacesCard where={ where } />
        <Button
          title="Go to the Map"
          onPress={() => navigate('MapScreen')}
        />
      </View>
    )
  }
};

const mapStateToProps = ({ where }) => {
  console.log(where)
  return {
    where
  }
}

export default connect(mapStateToProps)(LocationsScreen);
