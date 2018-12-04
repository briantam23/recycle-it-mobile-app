import * as React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Outcome from '../components/Outcome';
import CameraComp from '../components/CameraComp';

let proTips = ['Why did a chicken carrying a tin can cross the road? The recycling bin was on the other side.',
      'Scientists discovered a way to generate light using only scrap metal. It was an aluminating experience.',
      'What do you get when you have a glass bottle, some tin foil, and an old notebook? Recycling.',
      'Flip it over! Check it out before you chuck it out!',
      'Save the Earth! Its the only planet with Chocolate. So far…. (edited)',
      'Don’t be trashy! Recycle!', 'It’s easy being green- Reduce, Reuse, Recycle.',
      'Recycling plastic feels fantastic!', 'You will produce about 127, 604 pounds of garbage in your lifetime. Recycle.',
      'Have you hugged your recycling bin today?']

const randoNum = () => {
  return Math.floor((Math.random() * 10) + 1);
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
    headerTintColor: "white",
    headerTitleStyle: {
      fontSize: 35,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <CameraComp />
          </View>
          <View>
            <Outcome />
          </View>
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>{randomProTip}</Text>
        </View>
      </View>
    );
  };
};

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
    fontSize: 17,
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
