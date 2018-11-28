import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';

const MaterialDetailCard = ({ materials }) => {
  const { description, image, long_description, url } = materials.materialDetails;
  return (
    <View style={styles.imageContainer}>
      <Text style={styles.textHeader}>
        {description}
      </Text>
      <Text>
        {long_description}
      </Text>
      <Text>
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
  },
  textHeader: {
    fontWeight: 'bold',
    color: 'tomato',
  }
});

const mapStateToProps = ({ materials }) => ({ materials });

export default connect(mapStateToProps)(MaterialDetailCard);
