import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet,
  View,
  Picker,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Image,
  PickerIOS,
  Platform,
} from 'react-native';
import {
  Text, Card, Button,
} from 'react-native-elements';
import { Permissions, Location, Font } from 'expo';
import { api_key } from '../apiKey';
import { searchMaterials, getMaterialDetail } from '../store/materials';
import { findPlacesToRecycle } from '../store/where';
import { toggleOff } from '../store/Toggle';
import { url } from 'inspector';

interface Props {
  foundMaterials?: any;
  materialDetails?: any;
  getMaterialDetail?: any;
  findPlacesToRecycle: any;
  navigation: any;
  toggle: boolean;
  toggleOff: any;
}

interface State {
  materialSearch: string;
  geolocation: object;
  maxDistance: number;
  maxResults: number;
  isVisible: boolean;
}

class Outcome extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      materialSearch: '',
      isVisible: true,
      geolocation: {
        latitude: '',
        longitude: '',
      },
      maxDistance: 5,
      maxResults: 5,
    };
  }

  public async componentDidMount() {
    await Font.loadAsync({
      MaterialIcons: require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });
    await this.getGeoLocation();
  }
  public getGeoLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      console.log('granted');
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        geolocation: {
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        },
      });
    }
  };

  public getLocationData = material_id => {
    this.props
      .findPlacesToRecycle(api_key, this.state.geolocation, material_id, 5, 5)
      .then(() => this.props.navigation.navigate('LocationsScreen'))
      .then(() => { this.props.toggleOff(); })
  };

  public handlePicker = (description) => {
    this.setState({ materialSearch: description });
    const material = this.props.foundMaterials.find(material => material.description === description)
    this.props.getMaterialDetail(api_key, material.material_id);
  };

  public render() {
    if (!this.props.materialDetails) {
      return (
        this.props.toggle ?
          <Modal
            animationType='slide'
            onRequestClose={() => { this.props.toggleOff() }}
            transparent={false}
            visible={this.state.isVisible}
            presentationStyle='overFullScreen'>
            <View style={styles.negativeMainContainer}>
              <View style={styles.detailCardNegative}>
                <View style={styles.materialNameCard}>
                  <Text style={styles.NegativetextHeaderMaterial}>¯\_(ツ)_/¯</Text>
                </View>
                <Text style={styles.textHeader}>Not Recyclable!</Text>
                <Text style={styles.textArea}>
                  Even if you can't recycle it, you still may be able to reuse it!
                </Text>
                <View style={styles.buttons}>
                  <Button
                    onPress={() => { this.props.toggleOff() }}
                    title="Try Again!"
                    backgroundColor='#30518e'
                  />
                </View>
              </View>
            </View>
          </Modal>
          : null
      )
    };
    const {
      description,
      long_description,
      url,
      material_id,
    } = this.props.materialDetails;

    const { foundMaterials } = this.props;
    const materialDropdownSearch = foundMaterials.length >= 1;

    if (!this.props.toggle) {
      return null;
    }

    return (
      <View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.isVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.props.toggleOff();
          }}
        >

          <View style={styles.mainContainer}>

            <View style={styles.detailCard}>
              <View style={styles.materialNameCard}>
                {description && (
                  <Text style={styles.textHeaderMaterial}>{description}</Text>
                )}
              </View>

              <Text style={styles.textHeader}>Recyclable!</Text>

              <Text style={styles.textArea}>{long_description}</Text>
              <Text style={styles.textArea}>
                {url && (
                  <TouchableOpacity>
                    {Linking.openURL(url).catch(err =>
                      console.error('An error occurred', err)
                    )}
                  </TouchableOpacity>
                )}
              </Text>

              <View style={styles.buttons}>
                {description && (
                  <Button
                    onPress={() => this.getLocationData(material_id)}
                    title="Find Where to Recycle"
                    backgroundColor='#30518e'

                  />
                )}
              </View>
            </View>

            {
              Platform.OS === 'ios' ?
                <Card>
                  <Text style={styles.pickerSelection}>
                    Look for something similar
              </Text>
                  <View style={styles.picker}>
                    <PickerIOS
                      selectedValue={this.state.materialSearch}
                      onValueChange={this.handlePicker}
                    >
                      {foundMaterials.map(material => {
                        return (
                          <Picker.Item
                            value={material.description}
                            label={material.description}
                            key={material.material_id}
                          />
                        );
                      })}
                    </PickerIOS>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableHighlight>
                      <Button
                        backgroundColor='#30518e'

                        title="Or Try A Brand New Search"
                        onPress={() => {
                          this.props.toggleOff();
                        }}
                      />
                    </TouchableHighlight>
                  </View>
                </Card>
                :
                <Card>
                  <Text style={styles.pickerSelection}>
                    Look for something similar
              </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={this.state.materialSearch}
                      onValueChange={this.handlePicker}
                    >
                      {foundMaterials.map(material => {
                        return (
                          <Picker.Item
                            value={material.description}
                            label={material.description}
                            key={material.material_id}
                          />
                        );
                      })}
                    </Picker>
                  </View>

                  <View style={styles.buttons}>
                    <TouchableHighlight>
                      <Button
                        backgroundColor='#30518e'
                        title="Or Try A Brand New Search"
                        onPress={() => {
                          this.props.toggleOff();
                        }}
                      />
                    </TouchableHighlight>
                  </View>
                </Card>
            }
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ materials, toggle }) => {
  return {
    foundMaterials: materials.foundMaterials,
    materialDetails: materials.materialDetails,
    toggle,
  };
};

const mapDispatchToProps = dispatch => ({
  searchMaterials: (api_key, materialSearch) =>
    dispatch(searchMaterials(api_key, materialSearch)),
  getMaterialDetail: (api_key, material) =>
    dispatch(getMaterialDetail(api_key, material)),
  findPlacesToRecycle: (
    api_key,
    geolocation,
    productInfo,
    maxDistance,
    maxResults
  ) =>
    dispatch(
      findPlacesToRecycle(
        api_key,
        geolocation,
        productInfo,
        maxDistance,
        maxResults
      )
    ),
  toggleOff: () => dispatch(toggleOff()),
});

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#30551d',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  buttons: {
    padding: 5,
    margin: 5,
  },
  negativeMainContainer: {
    backgroundColor: '#551d30',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  pickerSelection: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#8e3051',
    fontWeight: 'bold',
  },
  picker: {
    borderColor: '#30518e',
    borderWidth: 1,
    margin: 5,
  },
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
    color: 'black',
  },
  textHeader: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 45,
    alignSelf: 'center',
    textAlign: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  textArea: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#73c149',
    padding: 100,
  },
  detailCard: {
    backgroundColor: '#518e30',
    padding: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  detailCardNegative: {
    backgroundColor: '#8e3051',
    padding: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  materialNameCard: {
    padding: 3,
    flexDirection: 'row',
  },
  textHeaderMaterial: {
    fontWeight: 'bold',
    color: '#518e30',
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '100%',
    flexWrap: 'wrap',
  },
  NegativetextHeaderMaterial: {
    fontWeight: 'bold',
    color: '#30518e',
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '100%',
    flexWrap: 'wrap',
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(Outcome));
