import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
  TextInput,
  Picker,
} from 'react-native';

import { api_key } from '../apiKey';
import { findPlacesToRecycle, getLocationDetails } from '../store/where';
import { searchMaterials, getMaterialDetail } from '../store/materials';
import FoundMaterialsCard from './FoundMaterialsCard';

interface Props {
  where?: object;
  foundMaterials?: object[];
  materialDetails?: object;
  getMaterialDetail: any;
  findPlacesToRecycle: any;
  searchMaterials: any;
};

interface State {
  geoLocation: object;
  materialSearch: string,
  maxDistance: number,
  maxResults: number,
};

class PlacesToRecycle extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props);
    this.state = {
      geoLocation: {
        latitude: '',
        longitude: '',
      },
      materialSearch: 'newspaper',
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

  public handleMaterial = (material: string) => {
    this.setState({ materialSearch: material })
  };

  public handlePicker = (material: object) => {
    this.props.getMaterialDetail(api_key, material.material_id)
      .then(() => this.setState({ materialSearch: material.description })
      )
  };

  public getData = () => {
    this.props.searchMaterials(api_key, this.state.materialSearch)
      .then(() => console.log(this.props.foundMaterials))
      .then(() => this.props.getMaterialDetail(api_key, this.props.foundMaterials[0].material_id))
  };

  public render() {
    const { foundMaterials } = this.props;
    const { materialSearch, maxDistance, maxResults } = this.state;
    const { handleMaterial, handlePicker, getData } = this;
    const materialDropdownSearch = foundMaterials.length >= 1;
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="newspaper"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleMaterial} />
        <Button
          onPress={() => getData()}
          title="Search Material"
          color='tomato'
        />

        <View>
          <Picker
            enabled={materialDropdownSearch}
            selectedValue={materialSearch}
            onValueChange={handlePicker}
          >
            {
              foundMaterials.map(material => {
                return <Picker.Item
                  label={material.description}
                  value={material}
                  key={material.material_id}
                />
              })
            }
          </Picker>
          <Text style={styles.picker}>{materialSearch}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ where, materials }) => {
  console.log(materials.foundMaterials, materials.materialDetails)
  return {
    where,
    foundMaterials: materials.foundMaterials,
    materialDetails: materials.materialDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  findPlacesToRecycle: (api_key, geolocation, productInfo) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo)),
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
  searchMaterials: (api_key, materialSearch) => dispatch(searchMaterials(api_key, materialSearch)),
  getMaterialDetail: (api_key, material) => dispatch(getMaterialDetail(api_key, material)),
});

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {
    margin: 15,
    height: 40,
    width: '100%',
    borderColor: '#7a42f4',
    borderWidth: 1,
    textAlign: 'center',
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
    marginHorizontal: 50,
  },
  textHeader: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  picker: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'red'
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesToRecycle);
