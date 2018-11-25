import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
} from 'react-native';

const api_key = process.env.EARTH_911_API_KEY;
import { findPlacesToRecycle, getLocationDetails } from '../store/where';
import RecPlacesCard from '../components/RecPlacesCard';

class PlacesToRecycle extends Component {
  constructor(props) {
    super(props)
      this.state = {
        geoLocation: {
          latitude: '',
          longitude: ''
        }
      }
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        geoLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })
    })
  }

  render() {
    const { findPlacesToRecycle, placesMap } = this.props;
    const { geoLocation } = this.state;

    return (
      <View style={styles.container}>

        <Button
          onPress={() => findPlacesToRecycle(api_key, geoLocation, 'battery')
          }
          title="Search"
          color={Platform.OS === 'ios' ? 'tomato' : 'tomato'}
        />

        <Text style={styles.text}>
          Search: battery
      </Text>

        {
          placesMap ?
            <FlatList
              data={placesMap}
              renderItem={({ item }) => <Text style={styles.item}>{item ? item.key : null}</Text>}
            /> :
            null
        }

      </View>
    )
  };
};

const mapStateToProps = ({ where }) => {
  console.log('@#$@#$@#$@$#!', where)
  const places = where ? where.map(place => place.description) : null;
  console.log(places)
  const placesMap = places ? places.map(place => Object.assign({ key: place })) : null;

  return {
    where,
    placesMap,
  };
};

const mapDispatchToProps = dispatch => ({
  findPlacesToRecycle: (api_key, geolocation, productInfo) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo)),
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
});

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesToRecycle);
