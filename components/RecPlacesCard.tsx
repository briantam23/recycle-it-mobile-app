import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Font, Permissions } from 'expo';
import { OpenMapDirections } from 'react-native-navigation-directions';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  where?: any;
}

interface State {
  fontsAreLoaded: boolean;
}

class RecPlacesCard extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      fontsAreLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Material Icons': require('../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });
    this.setState({ fontsAreLoaded: true });
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
      console.log(res);
    });
  };
  render() {
    const { where } = this.props;
    const { fontsAreLoaded } = this.state;
    let _keyExtractor = (item, index) =>
      (item.location_id + index).toString() || index;
    let showCurbside = (where.curbside && 'Yes') || 'No';
    let showMunicipal = (where.municipal && 'Yes') || 'No';
    return fontsAreLoaded ? (
      <FlatList
        data={where}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => {
          const { description, distance, latitude, longitude } = item;
          const { avatar, subtitle, title } = styles;
          const avatar_url =
            'https://pbs.twimg.com/profile_images/378800000703449332/e0dc3e28cd8e4edca330ddcfab4690b0.jpeg';
          return (
            <ListItem
              onPress={() => {
                this._callShowDirections(latitude, longitude);
              }}
              avatar={
                <Avatar
                  rounded
                  source={avatar_url && { uri: avatar_url }}
                  avatarStyle={styles.avatar}
                />
              }
              title={
                <View>
                  <Text style={title}>{description}</Text>
                </View>
              }
              subtitle={
                <View>
                  <Text style={subtitle}>Distance: {distance}</Text>
                  <Text style={subtitle}>Curbside: {showCurbside}</Text>
                  <Text style={subtitle}>Municipal: {showMunicipal}</Text>
                </View>
              }
            />
          );
        }}
      />
    ) : null;
  }
}

const mapStateToProps = ({ where }) => {
  console.log('HERE IS WHERE', where);
  return { where };
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    height: 25,
    marginLeft: 80,
    fontWeight: 'bold',
  },
  subtitle: {
    marginLeft: 80,
    fontSize: 12,
  },
  avatar: {
    height: 90,
    width: 90,
    marginLeft: 55,
  },
});

export default connect(mapStateToProps)(RecPlacesCard);
