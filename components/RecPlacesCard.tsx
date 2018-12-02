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
import { List, ListItem } from 'react-native-elements'
import { Font } from 'expo'

export class RecPlacesCard extends React.Component {
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
          return (
/*             <View>
              <Text style={styles.item}>Description: {item.description}</Text>
              <Text style={styles.item}>Distance: {item.distance}</Text>
              <Text style={styles.item}>Curbside: {showCurbside}</Text>
              <Text style={styles.item}>Municipal: {showMunicipal}</Text>

              <Button
                //onPress={} //go to MapScreen => pass lat and long
                title="Get Directions"
                color='tomato'
              />

              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
            </View> */
            <ListItem
              roundAvatar
              avatar={{ uri: item.avatar_url }}
              title={ item.title}
              subtitle={
                <View>
                  <Text style={ styles.subtitle }>Description: { item.description }</Text>
                  <Text style={ styles.subtitle }>Distance: { item.distance }</Text>
                  <Text style={ styles.subtitle }>Curbside: { showCurbside }</Text>
                  <Text style={ styles.subtitle }>Municipal: { showMunicipal }</Text>

                <Button
                  onPress={ null } //go to MapScreen => pass lat and long
                  title="Get Directions"
                  color='tomato'
                />

                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
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
