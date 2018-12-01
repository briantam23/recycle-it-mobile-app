import React from 'react';
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

import { api_key } from '../apiKey';
import { findPlacesToRecycle } from '../store/where';

const MaterialDetailCard = ({ materials, findPlacesToRecycle }) => {
  const { description, image, long_description, url, material_id } = materials.materialDetails;
  //const { navigate } = this.props.navigation;


  {/* Currently getting geolocation from PlacesToRecycle, but calling this card from home screen. TBD.
      */}
  /* const getLocationData = () => {
    findPlacesToRecycle(api_key, geolocation, material_id, 5, 5)
      .then(() => navigate('LocationsScreen')
      )
  } */

  return (
    <View style={styles.imageContainer}>
      {
        description &&
        <Text style={styles.header}>
          Recyclable!
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
      <Button
        onPress={() => getLocationData()}
        title="Find Where to Recycle"
        color='tomato'
      />
    </View>
  )
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
    marginHorizontal: 50,
    backgroundColor: 'green',
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

const mapStateToProps = ({ materials }) => ({ materials });

const mapDispatchToProps = dispatch => {
  return {
    findPlacesToRecycle: (api_key, geolocation, productInfo, maxDistance, maxResults) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo, maxDistance, maxResults)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialDetailCard);


