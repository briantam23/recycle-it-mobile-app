import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/Map';
import { connect } from 'react-redux';


class MapScreen extends Component {
  static navigationOptions = {
    title: 'List of Recycling Locations',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: "white",
  };

  render() {
    const { markers } = this.props;
    return (
      <Map markers={markers} />
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

const mapStateToProps = ({ where }) => {
  return { markers: where };
}

export default connect(mapStateToProps)(MapScreen);
