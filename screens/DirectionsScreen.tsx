import React, { Component } from 'react';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class DirectionsScreen extends Component {
 _callShowDirections = () => {
    const startPoint = {
      longitude: -8.945406,
      latitude: 38.575078
    } 

    const endPoint = {
      longitude: -8.9454275,
      latitude: 38.5722429
    }

		const transportPlan = 'w';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Show direction between two random points!</Text>
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
