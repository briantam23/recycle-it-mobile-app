import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, TouchableOpacity, View, Linking, Modal, TouchableHighlight, Button
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Text, Card } from 'react-native-elements';

import { api_key } from '../apiKey';
import { findPlacesToRecycle } from '../store/where';

interface Props {
  materialDetails: object;
  findPlacesToRecycle: any;
  navigation: any;
  isVisible: boolean;
};

interface State {
  geoLocation: object;
  maxDistance: number;
  maxResults: number;
  isVisible: boolean;
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
      isVisible: this.props.isVisible || false,
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

  public toggleModal = (mode) => {
    this.setState({ isVisible: mode });
  }

  public render() {
    const { description, long_description, url, material_id } = this.props.materialDetails;
    console.log('MATERIAL DETAIL CARD', description)

    return (
      <View style={styles.modalContainer}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>

          <View style={styles.modal}>
            <Text>YOUR MATERIAL</Text>

            <TouchableHighlight>
              <Button
                title='Close'
                onPress={() => { this.toggleModal(!this.state.isVisible) }} />
            </TouchableHighlight>

            <Card>
              {
                description &&
                <Text style={styles.textHeader}>
                  It's Recyclable!
                  </Text>
              }
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
              {description && <Button
                onPress={() => this.getLocationData(material_id)}
                title="Find Where to Recycle"
                color='#30518e'
              />}
            </Card>

          </View>
        </Modal>
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
    color: 'black'
  },
  textHeader: {
    fontWeight: 'bold',
    color: '#8e3051',
    fontSize: 30,
    alignSelf: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  textArea: {
    color: 'black',
    textAlign: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#73c149',
    padding: 100
  },
});

const mapStateToProps = ({ materials }, { isVisible }) => ({
  materialDetails: materials.materialDetails,
  isVisible,
});

const mapDispatchToProps = dispatch => {
  return {
    findPlacesToRecycle: (api_key, geolocation, productInfo, maxDistance, maxResults) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo, maxDistance, maxResults)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MaterialDetailCard));


