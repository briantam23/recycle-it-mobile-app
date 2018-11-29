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

export default connect(mapStateToProps)(MaterialDetailCard);
