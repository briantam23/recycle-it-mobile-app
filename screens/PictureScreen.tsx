import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class PictureScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Picture</Text>
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
