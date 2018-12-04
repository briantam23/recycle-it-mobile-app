import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, TextInput, Image, TouchableOpacity } from 'react-native';

import { api_key } from '../apiKey';
import { searchMaterials, getMaterialDetail } from '../store/materials';
import { toggleOn } from '../store/Toggle';

interface Props {
  foundMaterials?: object[];
  materialDetails?: object;
  getMaterialDetail: any;
  searchMaterials: any;
  toggleOn: any;
};

interface State {
  materialSearch: string;
};

class PlacesToRecycle extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props);
    this.state = {
      materialSearch: '',
    };
  };

  public handleMaterial = (material: string) => {
    this.setState({ materialSearch: material })
  };

  public getData = () => {
    this.props.searchMaterials(api_key, this.state.materialSearch)

      .then(() => {
        let material_id;
        if (!this.props.foundMaterials.length) {
          material_id = 1000;
          return material_id;
        }
        return this.props.foundMaterials[0];
      })
      .then((foundMaterials) => this.props.getMaterialDetail(api_key, foundMaterials.material_id))
      .then(() => this.props.toggleOn())

  };

  public render() {
    const { handleMaterial, getData } = this;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => getData()}>
            <Image
              style={styles.searchIcon}
              source={require('../images/green-search-icon.png')} />
          </TouchableOpacity >
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=""
            placeholderTextColor="#30518e"
            autoCapitalize="characters"
            onChangeText={handleMaterial} />
        </View>
        <View>
          {/* <Button
            onPress={() => getData()}
            title="SEARCH"
            color='#30518e' /> */}
        </View>
      </View>
    );
  };
};

const mapStateToProps = ({ materials }) => {
  console.log(materials.foundMaterials)
  return {
    foundMaterials: materials.foundMaterials,
    materialDetails: materials.materialDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  searchMaterials: (api_key, materialSearch) => dispatch(searchMaterials(api_key, materialSearch)),
  getMaterialDetail: (api_key, material) => dispatch(getMaterialDetail(api_key, material)),
  toggleOn: () => dispatch(toggleOn()),
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 250,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 25,
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
  input: {
    margin: 15,
    height: 50,
    width: '60%',
    borderColor: '#518e30',
    borderWidth: 1,
    fontSize: 22,
    paddingLeft: 10,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesToRecycle);
