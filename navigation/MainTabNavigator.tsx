import * as React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
/* import LoginScreen from '../screens/LoginScreen'; */
import MapScreen from '../screens/MapScreen';
import LocationsScreen from '../screens/LocationsScreen';

const HomeStack = createStackNavigator(
  { HomeScreen },
  {
    headerLayoutPreset: 'center',
  }
);
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const MapStack = createStackNavigator(
  { MapScreen },
  {
    headerLayoutPreset: 'center',
  }
);
MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
    />
  ),
};

/* const LoginStack = createStackNavigator(
  { LoginScreen },
  {
    headerLayoutPreset: 'center',
  }
);
LoginStack.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
}; */

const LocationsStack = createStackNavigator(
  { LocationsScreen },
  {
    headerLayoutPreset: 'center',
  }
);
LocationsStack.navigationOptions = {
  tabBarLabel: 'Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LocationsStack,
  MapStack,
  //LoginStack,
});
