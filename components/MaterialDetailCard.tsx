import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Button,
} from 'react-native';
import { withNavigation } from 'react-navigation';


import { api_key } from '../apiKey';
import { findPlacesToRecycle } from '../store/where';

interface Props {
  materialDetails: object;
  findPlacesToRecycle: any;
  navigation: any;
};

interface State {
  geoLocation: object;
  maxDistance: number;
  maxResults: number;
};

class MaterialDetailCard extends Component<Props, State>{
  constructor(props: Props, context?: any) {
    super(props);
    this.state = {
      geoLocation: {
        latitude: '',
        longitude: '',
      },
      maxDistance: 5,
      maxResults: 5,
    };
  };
  public componentDidMount() { this.getGeoLocation() };
  public getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        geoLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });
  };

  public getLocationData = (material_id) => {
    this.props.findPlacesToRecycle(api_key, this.state.geoLocation, material_id, 5, 5)
      .then(() => this.props.navigation.navigate('LocationsScreen'))
  };

  public render() {
    const { description, image, long_description, url, material_id } = this.props.materialDetails;
    return (
      <View style={styles.imageContainer}>
        {
          description &&
          <Text style={styles.header}>
            It's Recyclable!
       </Text>
        }
        <Text style={styles.textHeader}>
          {description}
        </Text>
        <Text style={styles.textArea}>
          {long_description}
        </Text>
        <Text style={styles.textArea}>
          {url &&
            <TouchableOpacity >
              {Linking.openURL(url).catch(err => console.error('An error occurred', err))}
            </TouchableOpacity>
          }
        </Text>
        {/* <Image
        source={image}
        style={styles.materialImage}
      /> */}
        {description && <Button
          onPress={() => this.getLocationData(material_id)}
          title="Find Where to Recycle"
          color='#30518e'
        />}
      </View>
    )
  };
};

const styles = StyleSheet.create({
  materialImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#518e30',
    width: '100%',
    height: '100%',
    padding: 10,
    color: 'white'
  },
  textHeader: {
    fontWeight: 'bold',
    color: 'tomato',
    fontSize: 30,
    alignSelf: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  textArea: {
    color: 'white',
    textAlign: 'center',
  }
});

const mapStateToProps = ({ materials }) => ({
  materialDetails: materials.materialDetails,
});

const mapDispatchToProps = dispatch => {
  return {
    findPlacesToRecycle: (api_key, geolocation, productInfo, maxDistance, maxResults) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo, maxDistance, maxResults)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MaterialDetailCard));


