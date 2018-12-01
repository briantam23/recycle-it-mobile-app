import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import DirectionsScreen from '../screens/DirectionsScreen';
import PictureScreen from '../screens/PictureScreen';
import LocationsScreen from '../screens/LocationsScreen';


const HomeStack = createStackNavigator({ HomeScreen });
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const MapStack = createStackNavigator({ MapScreen });
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const DirectionsStack = createStackNavigator({ DirectionsScreen });
DirectionsStack.navigationOptions = {
  tabBarLabel: 'Directions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const PictureStack = createStackNavigator({ PictureScreen });
PictureStack.navigationOptions = {
  tabBarLabel: 'Photo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const LoginStack = createStackNavigator({ LoginScreen });
LoginStack.navigationOptions = {
  tabBarLabel: 'Sign Up',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const LocationsStack = createStackNavigator({ LocationsScreen });
LocationsStack.navigationOptions = {
  tabBarLabel: 'Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  LocationsStack,
  MapStack,
  DirectionsStack,
  PictureStack,
  LoginStack
});
