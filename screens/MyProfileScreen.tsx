import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

// import MyProfile from '../components/MyProfile';

export default class MyProfileScreen extends Component {
  static navigationOptions = { title: 'My Profile' };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <MyProfile/> */}
      </ScrollView>
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
