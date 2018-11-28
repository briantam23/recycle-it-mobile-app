import React, { Component } from 'react';
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
} from 'react-native';

const api_key = process.env.EARTH_911_API_KEY;
import { findPlacesToRecycle, getLocationDetails } from '../store/where';
import { searchMaterials, getMaterials } from '../store/materials';
import RecPlacesCard from '../components/RecPlacesCard';
import MaterialDetailCard from './MaterialDetailCard';

class PlacesToRecycle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geoLocation: {
        latitude: '',
        longitude: ''
      },
      materialSearch: 'newspaper',
      refinedMaterialSearch: '',
    }
  };

  componentDidMount() { this.getGeoLocation() };

  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        geoLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })
    })
  };

  handleMaterial = (text: string) => { this.setState({ materialSearch: text }) };

  showMaterialDetail = (materialId) => {
    this.props.getMaterials(api_key, materialId)
    this.setState({ refinedMaterialSearch: materialId })
  };

  _keyExtractor = (item, index) => item.material_id.toString();

  render() {
    const { findPlacesToRecycle, where, searchMaterials, materials } = this.props;
    const { geoLocation, materialSearch, refinedMaterialSearch } = this.state;
    const { handleMaterial, showMaterialDetail, _keyExtractor } = this;
    return (
      <View style={styles.container}>

        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="newspaper"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={handleMaterial} />

        <Button
          onPress={() => searchMaterials(api_key, materialSearch)}
          title="Search Material"
          color={Platform.OS === 'ios' ? 'tomato' : 'tomato'}
        />

        {
          <FlatList
            data={materials.findMaterials}
            keyExtractor={_keyExtractor}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity onPress={() => showMaterialDetail(item.material_id)}>
                    <Text style={styles.item}>{item.description}</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
        }

        {materials.materialDetails && <MaterialDetailCard />}

        <Button
          onPress={() => findPlacesToRecycle(api_key, geoLocation, refinedMaterialSearch)}
          title="Find Places to Recycle"
          color={Platform.OS === 'ios' ? 'tomato' : 'tomato'}
        />

        {/* {where && <RecPlacesCard />} */}

      </View>
    )
  };
};

const mapStateToProps = ({ where, materials }) => {
  // console.debug('@#$@#$@#$@$#!', where)
  console.log('HERE I AM', materials.materialDetails)
  return {
    where,
    materials,
  };
};

const mapDispatchToProps = dispatch => ({
  findPlacesToRecycle: (api_key, geolocation, productInfo) => dispatch(findPlacesToRecycle(api_key, geolocation, productInfo)),
  getLocationDetails: (api_key, location) => dispatch(getLocationDetails(api_key, location)),
  searchMaterials: (api_key, materialSearch) => dispatch(searchMaterials(api_key, materialSearch)),
  getMaterials: (api_key, material) => dispatch(getMaterials(api_key, material)),
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacesToRecycle);
