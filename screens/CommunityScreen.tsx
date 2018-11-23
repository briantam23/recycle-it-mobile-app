import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

// import Community from '../components/Community';

export default class CommunityScreen extends Component {
  static navigationOptions = { title: 'Community' };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Community/> */}
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
