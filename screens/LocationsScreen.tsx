import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { getLocationDetails } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';

interface Props {
  navigation: any;
  where: any;
  description?: any;
};

class LocationsScreen extends Component<Props> {
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
        <RecPlacesCard />
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
