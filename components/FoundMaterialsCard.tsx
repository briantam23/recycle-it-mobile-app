import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
} from 'react-native';

const FoundMaterialsCard = ({ foundMaterials }) => {
  const _keyExtractor = (item, index) => item.material_id.concat(index).toString() || index;
  return (
    <View style={styles.imageContainer}>
      <FlatList
        data={foundMaterials}
        keyExtractor={_keyExtractor}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.item}>{item.description}</Text>
            </View>
          )
        }}
      />
    </View>
  )

  /* SAMPLE RES {
"num_results": 1,
"result": [
{
"url": "",
"exact": true,
"description": "Toothbrushes",
"material_id": 587
}
]}
*/
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
    marginHorizontal: 50,
  },
  textHeader: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const mapStateToProps = ({ foundMaterials }) => ({ foundMaterials });

export default connect(mapStateToProps)(FoundMaterialsCard);
