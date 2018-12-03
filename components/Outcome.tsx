import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Picker,
} from 'react-native';

import { api_key } from '../apiKey';
import { searchMaterials, getMaterialDetail } from '../store/materials';

interface Props {
  foundMaterials?: any;
  materialDetails?: any;
  getMaterialDetail?: any;
};

interface State {
  materialSearch: string;
};

class Outcome extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      materialSearch: '',
    };
  };

  public handleMaterial = (material: string) => { this.setState({ materialSearch: material }) };

  public handlePicker = (material: object) => {
    this.props.getMaterialDetail(api_key, material.material_id)
      .then(() => this.setState({ materialSearch: material.description })
      )
  };

  public render() {
    const { foundMaterials } = this.props;
    const { materialSearch } = this.state;
    const { handleMaterial, handlePicker } = this;
    const materialDropdownSearch = foundMaterials.length >= 1;
    return (
      <View>
        <Text style={styles.pickerSelection}>{materialSearch}</Text>
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
      </View>
    )
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
  pickerSelection: {
    fontSize: 30,
    alignSelf: 'center',
    color: "#8e3051",
    fontWeight: 'bold',
  },
  picker: {
    borderColor: '#518e30',
    borderWidth: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Outcome);
