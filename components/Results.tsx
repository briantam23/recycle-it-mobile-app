import * as React from 'react';
import { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight,

} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { CLOUD_VISION_API_KEY, api_key } from '../apiKey';
import { Text, Button } from 'react-native-elements';
import { Font, Location, Permissions } from 'expo';
import CameraComp from './CameraComp';
import { findPlacesToRecycle } from '../store/where';

interface Props {
  image: string;
  navigation: any;
  findPlacesToRecycle: any;
}
interface State {
  label: string[];
  loading: boolean;
  recycle: boolean;
  description: string;
  name: string;
  geolocation: object;
  material_id: number;
  maxDistance: number;
  maxResults: number;
}

class Results extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      geolocation: {
        latitude: '',
        longitude: '',
      },
      label: [],
      loading: true,
      recycle: true,
      description: '',
      name: '',
      material_id: null,
      maxDistance: 5,
      maxResults: 5,
    };
    this.imageProp = this.imageProp.bind(this);
    this.redo = this.redo.bind(this);
    this.isRecyclable = this.isRecyclable.bind(this);
    this.getLocationData = this.getLocationData.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
  }
  public getGeoLocation = async () => {
    /* navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        geolocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    });*/

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

  public async componentDidMount() {
    await Font.loadAsync({
      MaterialIcons: require('../node_modules/@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });
    if (!this.props.image) {
      return null;
    }
    await this.getGeoLocation();
    this.imageProp();
  }
  public async isRecyclable(item) {
    console.log(item, 'isRecyclable Function');
    const response = await fetch(
      `http://api.earth911.com/earth911.searchMaterials?api_key=${api_key}&query=${item}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const parsed = await response.json();
    console.log(parsed, 'earth911 response')
    if (parsed.num_results === 0) {
      return this.setState({
        recycle: false,
        loading: false,
        name: item[0],
      });
    } else {
      const temp = parsed.result[0].material_id;
      const name = parsed.result[0].description;
      console.log(temp, 'temp');
      const second = await fetch(
        `http://api.earth911.com/earth911.getMaterials?api_key=${api_key}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const parsed2 = await second.json();
      const result2 = parsed2.result.find(material => {
        return material.material_id === temp;
      });
      const final = result2.long_description;
      this.setState({
        description: final,
        loading: false,
        name: name,
        material_id: temp,
      });
    }
  }
  public async imageProp() {
    const body = {
      requests: [
        {
          image: {
            content: this.props.image,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 3,
            },
          ],
        },
      ],
    };
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${CLOUD_VISION_API_KEY}`,
      {
        method: 'POST',
        headers: {
          Accept: 'appliczation/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const parsed = await response.json();
    console.log(parsed);
    const resArr = [];
    resArr.push(parsed.responses[0].labelAnnotations[0].description);
    if (parsed.responses[0].labelAnnotations[1].description) {
      resArr.push(parsed.responses[0].labelAnnotations[1].description);
    }
    if (parsed.responses[0].labelAnnotations[2].description) {
      resArr.push(parsed.responses[0].labelAnnotations[2].description);
    }
    console.log(resArr);
    this.setState({ label: resArr });
    this.isRecyclable(resArr);
  }
  private redo() {
    this.setState({ name: '' });
  }
  public getLocationData = material_id => {
    this.props
      .findPlacesToRecycle(api_key, this.state.geolocation, material_id, 5, 5)
      .then(() => this.props.navigation.navigate('LocationsScreen'));
  };
  public render() {
    const { recycle, description, name, material_id } = this.state;
    if (this.state.loading === true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Text h1>Loading...</Text>

          <ActivityIndicator color="#3E9428" size="large" />
          <View />
        </View>
      );
    }
    if (name === '') {
      return <CameraComp />;
    }
    if (recycle === false) {
      return (
        <View style={styles.mainContainer}>
          <View
            style={{
              backgroundColor: 'red',
              padding: 3,
              borderWidth: 1,
              borderColor: 'black',
            }}
          >
            <View style={styles.materialNameCard}>
              {name && (
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'red',
                    fontSize: 35,
                    alignSelf: 'center',
                    textAlign: 'center',
                    backgroundColor: 'white',
                    width: '100%',
                    flexWrap: 'wrap',
                  }}
                >
                  {name.toUpperCase()}
                </Text>
              )}
            </View>
            <Text style={styles.textHeader}>Not Recyclable </Text>

            <View style={styles.button}>
              <TouchableHighlight>
                <Button
                  title="Try a New Search"
                  backgroundColor='#30518e'
                  onPress={() => this.redo()}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.detailCard}>
          <View style={styles.materialNameCard}>
            {name && (
              <Text style={styles.textHeaderMaterial}>
                {name.toUpperCase()}
              </Text>
            )}
          </View>
          <Text style={styles.textHeader}>Recyclable!</Text>
          <Text style={styles.textArea}>{description}</Text>
          <View style={styles.button}>
            {name && (
              <Button
                onPress={() => this.getLocationData(material_id)}
                title="Find Where to Recycle"
                backgroundColor='#30518e'
              />
            )}
          </View>

          <View style={styles.button}>
            <TouchableHighlight>
              <Button
                title="Or Try a New Search"
                backgroundColor='#30518e'
                onPress={() => this.redo()}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
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
    marginTop: 9
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
    marginTop: 9,
    marginBottom: 19
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
});
const mapDispatchToProps = dispatch => {
  return {
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
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withNavigation(Results));
