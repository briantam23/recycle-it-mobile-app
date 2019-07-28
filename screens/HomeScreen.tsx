import * as React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, } from 'react-native';

import Outcome from '../components/Outcome';
import CameraComp from '../components/CameraComp';

let proTips = [
  'Pro Tip #1: Flip it over! Check it out before you chuck it out!',
  'Pro Tip #2: Save the Earth! Its the only planet with Chocolate. So far…. (edited)',
  'Pro Tip #3: It’s easy being green- Reduce, Reuse, Recycle.',
  'Pro Tip #4: Flip it over! Check it out before you chuck it out!',
  'Pro Tip #5: Save the Earth! Its the only planet with Chocolate. So far…. (edited)',
  'Pro Tip #6: Don’t be trashy! Recycle!', 
  'Pro Tip #7: Recycling plastic feels fantastic!', 
  'Pro Tip #8: It’s easy being green- Reduce, Reuse, Recycle.',
  'Pro Tip #9: You will produce about 127, 604 pounds of garbage in your lifetime. Recycle.',
  'Pro Tip #10: Have you hugged your recycling bin today?']

const randoNum = () => {
  return Math.floor((Math.random() * 10));
}

let num = randoNum();

const randomProTip = proTips[num];



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Recycle It!',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: 28,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.flex}>

            <View>
              <CameraComp />
            </View>
            <View>
              <Outcome />
            </View>
          </View>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>

          <Text style={styles.tabBarInfoText}>
            {randomProTip}
          </Text>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
  },
  contentContainer: {
    paddingTop: 0,
  },
  flex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#8e3051',
    paddingVertical: 10,
  },
  tabBarInfoText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginLeft: 2.5,
    marginRight: 2.5
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
