import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { StyleSheet, View, Picker, Modal, TouchableHighlight, TouchableOpacity, Linking, Button, Image } from 'react-native';
import { Text, Card } from 'react-native-elements';

import { api_key } from '../apiKey';
import { searchMaterials, getMaterialDetail } from '../store/materials';
import { findPlacesToRecycle } from '../store/where';

interface Props {
  foundMaterials?: any;
  materialDetails?: any;
  getMaterialDetail?: any;
  findPlacesToRecycle: any;
  navigation: any;
  toggle: boolean;
};

interface State {
  materialSearch: string;
  geoLocation: object;
  maxDistance: number;
  maxResults: number;
  isVisible: boolean;
};

class Outcome extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      materialSearch: '',
      isVisible: true,
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

  public toggleModal = (mode) => {
    this.setState({ isVisible: mode });
  }

  public getLocationData = (material_id) => {
    this.props.findPlacesToRecycle(api_key, this.state.geoLocation, material_id, 5, 5)
      .then(() => this.props.navigation.navigate('LocationsScreen'))
  };

  public handleMaterial = (material: string) => { this.setState({ materialSearch: material }) };

  public handlePicker = (material: object) => {
    this.props.getMaterialDetail(api_key, material.material_id)
      .then(() => this.setState({ materialSearch: material.description })
      )
  };

  public render() {
    const { description, long_description, url, material_id } = this.props.materialDetails;
    const { foundMaterials } = this.props;
    const { materialSearch } = this.state;
    const { handleMaterial, handlePicker } = this;
    const materialDropdownSearch = foundMaterials.length >= 1;

    if (!this.props.toggle) {
      return null;
    } else {
      return (
        <View >

          <Modal
            animationType='fade'
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}
            presentationStyle='overFullScreen'
          >

            <View style={styles.mainContainer}>

              <View style={styles.detailCard}>

                <View style={styles.materialNameCard}>
                  {
                    description &&
                    <Text style={styles.textHeaderMaterial}>{description}</Text>
                  }
                </View>

                <Text style={styles.textHeader}>Recyclable!</Text>

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

                <View style={styles.button}>

                  {description && <Button
                    onPress={() => this.getLocationData(material_id)}
                    title="Find Where to Recycle"
                    color='#30518e'
                  />}
                </View>

              </View>

              <Card>
                <Text style={styles.pickerSelection}>Look for something similar</Text>
                <View style={styles.picker}>
                  <Picker
                    enabled={materialDropdownSearch}
                    selectedValue={materialSearch}
                    onValueChange={handlePicker}>
                    {
                      foundMaterials.map(material => {
                        return <Picker.Item
                          color="#30518e"
                          label={material.description}
                          value={material}
                          key={material.material_id}
                        />
                      })
                    }
                  </Picker>
                </View>

                <View style={styles.button}>
                  <TouchableHighlight>
                    <Button
                      title='Or Try A Brand New Search'
                      color='#30518e'
                      onPress={() => { this.toggleModal(!this.state.isVisible) }} />
                  </TouchableHighlight>
                </View>

              </Card>

            </View>
          </Modal>

        </View >
      )
    }
  };
};

const mapStateToProps = ({ materials, toggle }) => {
  return {
    foundMaterials: materials.foundMaterials,
    materialDetails: materials.materialDetails,
    toggle
  };
};

const mapDispatchToProps = dispatch => ({
  searchMaterials: (api_key, materialSearch) => dispatch(searchMaterials(api_key, materialSearch)),
  getMaterialDetail: (api_key, material) => dispatch(getMaterialDetail(api_key, material)),
  findPlacesToRecycle: (api_key, geolocation, productInfo, maxDistance, maxResults) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo, maxDistance, maxResults)),
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: 10,
  },
  button: {
    margin: 10,
  },
  pickerSelection: {
    fontSize: 20,
    alignSelf: 'center',
    color: "#8e3051",
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
    color: 'black'
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
    padding: 100
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#73c149',
    padding: 100
  },
  detailCard: {
    backgroundColor: '#518e30',
    padding: 3,
    borderWidth: 1,
    borderColor: 'black'
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
    flexWrap: "wrap"
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Outcome));
