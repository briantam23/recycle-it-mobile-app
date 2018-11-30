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

class LocationsScreen extends Component {
  static navigationOptions = {
    title: 'Places to Recycle ___ Near Me',
  };

  render() {
    return (
      <View>
        <RecPlacesCard />
        <Button
          title="Go to the Map"
          onPress={() => this.props.navigation.navigate('MapScreen')}
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
