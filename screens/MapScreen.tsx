import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import Map from '../components/Map';
import { connect } from 'react-redux';

interface Props {
  markers: any;
}
interface State {}
class MapScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Recycling Locations',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: 'white',
  };

  render() {
    const { markers } = this.props;
    return <Map markers={markers} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = ({ where }) => {
  return { markers: where };
};

export default connect(mapStateToProps)(MapScreen);
