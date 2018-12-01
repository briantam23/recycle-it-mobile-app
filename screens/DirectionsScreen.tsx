import * as React from 'react';
import { Component } from 'react';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class DirectionsScreen extends Component {
  _callShowDirections = () => {
    const startPoint = navigator.geolocation.getCurrentPosition(
      position => JSON.stringify(position),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    const endPoint = {
      latitude: 40.7484,
      longitude: -73.9857
    }

    const transportPlan = 'd';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Show directions from your current location!</Text>
        <Button
          onPress={() => { this._callShowDirections() }}
          title="Open map"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
