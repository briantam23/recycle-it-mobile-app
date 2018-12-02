import * as React from 'react';
import { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
} from 'react-native';

import { api_key } from '../apiKey';
import { searchMaterials, getMaterialDetail } from '../store/materials';

interface Props {
  foundMaterials?: object[];
  materialDetails?: object;
  getMaterialDetail: any;
  searchMaterials: any;
};

interface State {
  materialSearch: string;
};

class PlacesToRecycle extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props);
    this.state = {
      materialSearch: 'NEWSPAPER',
    };
  };

  public handleMaterial = (material: string) => {
    this.setState({ materialSearch: material })
  };

  public getData = () => {
    this.props.searchMaterials(api_key, this.state.materialSearch)
      .then(() => console.log(this.props.foundMaterials))
      .then(() => {
        if(this.props.foundMaterials[0]) return this.props.getMaterialDetail(api_key, this.props.foundMaterials[0].material_id);
      })
  };

  public render() {
    const { handleMaterial, getData } = this;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.searchIcon}
            source={require('../images/green-search-icon.png')} />
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="NEWSPAPER"
            placeholderTextColor="#9a73ef"
            autoCapitalize="characters"
            onChangeText={handleMaterial} />
        </View>
        <View>
          <Button
            onPress={() => getData()}
            title="Search Material"
            color='#30518e' />
        </View>
      </View>
    );
  };
};

const mapStateToProps = ({ materials }) => {
  return {
    foundMaterials: materials.foundMaterials,
    materialDetails: materials.materialDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  searchMaterials: (api_key, materialSearch) => dispatch(searchMaterials(api_key, materialSearch)),
  getMaterialDetail: (api_key, material) => dispatch(getMaterialDetail(api_key, material)),
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchIcon: {
    padding: 0,
    margin: 0,
    width: 70,
    height: 70,
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
    height: 50,
    width: '60%',
    borderColor: '#518e30',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 22
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
