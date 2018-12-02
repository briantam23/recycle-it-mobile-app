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
  Button,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Font } from 'expo';
import { OpenMapDirections } from 'react-native-navigation-directions';

export default class RecPlacesCard extends React.Component {
  constructor() {
    super()
    this.state = {
      fontsAreLoaded: false
    }
  }
  async componentWillMount() {
    await Font.loadAsync({ 'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf') })
    this.setState({ fontsAreLoaded: true })
  }
  _callShowDirections = (latitude, longitude) => {
    const startPoint = navigator.geolocation.getCurrentPosition(
      position => JSON.stringify(position),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    const endPoint = { latitude, longitude };

    const transportPlan = 'd';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }
  render() {
    const { where } = this.props;
    const { fontsAreLoaded } = this.state;
  
    let _keyExtractor = (item, index) => (item.location_id + index).toString() || index;
    let showCurbside = where.curbside && 'Yes' || 'No'
    let showMunicipal = where.municipal && 'Yes' || 'No'
    return (
      fontsAreLoaded ?
        <List>
          <FlatList
            data={where}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => {
              const { title, description, distance, latitude, longitude, avatar_url } = item;
              return (
                <ListItem
                  onPress={() => { this._callShowDirections(latitude, longitude) }}
                  roundAvatar
                  avatar={{ uri: avatar_url }}
                  title={ title }
                  subtitle={
                    <View>
                      <Text style={ styles.subtitle }>Description: { description }</Text>
                      <Text style={ styles.subtitle }>Distance: { distance }</Text>
                      <Text style={ styles.subtitle }>Curbside: { showCurbside }</Text>
                      <Text style={ styles.subtitle }>Municipal: { showMunicipal }</Text>
                  </View>
                  }
                />
              )
            }}
          />
        </List>
        : null
    )
  }
}

const mapStateToProps = ({ where }) => ({ where });

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

//export default connect(mapStateToProps)(RecPlacesCard);
