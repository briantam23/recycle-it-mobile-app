import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { View, Button } from 'react-native';

import { getLocationDetails } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';
import { ObjectLiteralElement } from 'typescript';

interface Props {
  navigation: any;
  where: any;
  description?: any;
};

class LocationsScreen extends Component<Props> {

  const where = [
  {
    latlng: {
      latitude: 40.7484,
      longitude: -73.9857
    },
    title: 'Empire State Building',
    description: 'Very Tall Building!',
    curbside: 'Yes',
    municipal: 'Yes',
    location_id: 1,
    distance: '.5 mile',
    latitude: 40.7484,
    longitude: -73.9857,
    avatar_url: 'https://pbs.twimg.com/profile_images/378800000703449332/e0dc3e28cd8e4edca330ddcfab4690b0.jpeg'
  },
  {
    latlng: {
      latitude: 40.7056,
      longitude: -74.0027
    },
    title: 'South Street Seaport',
    description: 'Lots of Fish!!',
    curbside: 'No',
    municipal: 'No',
    location_id: 2,
    distance: '.75 mile',
    latitude: 40.7056,
    longitude: -74.0027,
    avatar_url: 'https://pbs.twimg.com/profile_images/378800000703449332/e0dc3e28cd8e4edca330ddcfab4690b0.jpeg'
  }
]

interface LocationsScreenProps {
  navigation: Function;
}

class LocationsScreen extends Component <LocationsScreenProps> {
  static navigationOptions = {
    title: `Places to Recycle Near Me`,
    headerStyle: {
      backgroundColor: '#518e30',
    },
    headerTintColor: "white",
  };

  public render() {
    return (
      <View>
        {
          this.props.where.length >= 1 ? <Button
            title="Go back"
            color='#30518e'
            onPress={() => this.props.navigation.navigate('HomeScreen')} />
            :
            <View style={styles.heartContainer}>
              <Image
                style={styles.heartLogo}
                source={require('../images/recycle_heart_logo.png')}
              />
            </View>
        }
//         <RecPlacesCard />
//         <RecPlacesCard where={ where } />
//         <Button
//           title="View Map"
//           onPress={() => navigate('MapScreen')}
//         />
      </View>
    )
  }
};

const mapStateToProps = ({ where, materials }) => {
  console.log('THIS IS FROM THE LOCATIONS SCREEN', where, materials.materialDetails.description)
  const description = materials.materialDetails.description || '';

  return {
    where,
    description,
  };
};

const mapDispatchToProps = dispatch => ({
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
});

const styles = StyleSheet.create({
  heartContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  heartLogo: {
    width: 175,
    height: 156,
    margin: 10,
    padding: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LocationsScreen));
