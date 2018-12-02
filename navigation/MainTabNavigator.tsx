import * as React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import PictureScreen from '../screens/PictureScreen';
import LocationsScreen from '../screens/LocationsScreen';


const HomeStack = createStackNavigator({ HomeScreen }, {
  headerLayoutPreset: 'center',
});
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const MapStack = createStackNavigator({ MapScreen }, {
  headerLayoutPreset: 'center',
});
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

const DirectionsStack = createStackNavigator({ DirectionsScreen }, {
  headerLayoutPreset: 'center',
});
DirectionsStack.navigationOptions = {
  tabBarLabel: 'Directions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const PictureStack = createStackNavigator({ PictureScreen }, {
  headerLayoutPreset: 'center',
});
PictureStack.navigationOptions = {
  tabBarLabel: 'Photo',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const LoginStack = createStackNavigator({ LoginScreen }, {
  headerLayoutPreset: 'center',
});
LoginStack.navigationOptions = {
  tabBarLabel: 'MyProfile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const LocationsStack = createStackNavigator({ LocationsScreen }, {
  headerLayoutPreset: 'center',
});
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
  MapStack,
  LocationsStack,
  PictureStack,
  LoginStack
});
