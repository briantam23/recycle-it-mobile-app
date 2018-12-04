import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { getLocationDetails } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';
import { ObjectLiteralElement } from 'typescript';

interface LocationsScreenProps {
  navigation: any;
  where: any;
  description?: any;
}

class LocationsScreen extends Component<LocationsScreenProps> {
  static navigationOptions = {
    title: `Places to Recycle Near Me`,
    headerStyle: {
      backgroundColor: '#518e30',
    },
    headerTintColor: 'white',
  };

  public render() {
    const { where, navigation } = this.props;
    const { heartContainer, heartLogo, homeButton } = styles;
    return (
      <View>
        {where.length >= 1 ? (
          <View>
            <Button
              title="Go Back"
              color="#30518e"
              onPress={() => navigation.navigate('HomeScreen')}
            />
            <RecPlacesCard />
            <Button
              title="View Map"
              onPress={() => navigation.navigate('MapScreen')}
            />
          </View>
        ) : (
          <View style={heartContainer}>
            {/* <Button
                title = "Find something to Recycle!"
                style = { home }
                onPress = { () => navigation.navigate('HomeScreen') } /> */}
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={homeButton}>Find something to Recycle!</Text>
            </TouchableOpacity>
            <Image
              style={heartLogo}
              source={require('../images/recycle_heart_logo.png')}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ where, materials }) => {
  console.log(
    'THIS IS FROM THE LOCATIONS SCREEN',
    where,
    materials.materialDetails.description
  );
  const description = materials.materialDetails.description || '';
  return {
    where,
    description,
  };
};

/* const mapDispatchToProps = dispatch => ({
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
}); */
const mapDispatchToProps = { getLocationDetails };

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
  homeButton: {
    backgroundColor: '#30518e',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 4,
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginBottom: 45,
    height: 140,
    width: 330,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(LocationsScreen));
