import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
} from 'react-native';

const RecPlacesCard = ({ where }) => {
  let _keyExtractor = (item, index) => (where.location_id + where.distance).toString();
  let showCurbside = where.curbside && 'Yes' || 'No'
  let showMunicipal = where.municipal && 'Yes' || 'No'

  return (
    <View>
      <FlatList
        data={where}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.item}>Description: {item.description}</Text>
              <Text style={styles.item}>Curbside: {showCurbside}</Text>
              <Text style={styles.item}>Distance: {item.distance}</Text>
              <Text style={styles.item}>Latitude: {item.latitude}</Text>
              <Text style={styles.item}>Longitude: {item.longitude}</Text>
              <Text style={styles.item}>Municipal: {showMunicipal}</Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
            </View>
          )
        }}
      />
    </View>
  )
}

const mapStateToProps = ({ where }) => ({ where });

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default connect(mapStateToProps)(RecPlacesCard);
