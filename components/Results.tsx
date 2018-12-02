import React from 'react';
import { Component } from 'react';
import { View, ActivityIndicator, ScrollView, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { CLOUD_VISION_API_KEY, api_key } from '../apiKey';
import { Button, Text, Card } from 'react-native-elements';
import { Font } from 'expo';
import PictureScreen from '../screens/PictureScreen';
import { googleWhatDoYouSee } from '../store/what';
import CameraComp from './CameraComp';

interface Props {
  image: string;
  navigation: object;
  //googleWhatDoYouSee: any;
}
interface State {
  label: string;
  loading: boolean;
  recycle: boolean;
  description: string;
}

export default class Results extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      label: '',
      loading: true,
      recycle: true,
      description: '',
    };
    this.imageProp = this.imageProp.bind(this);
    this.redo = this.redo.bind(this);
    this.isRecyclable = this.isRecyclable.bind(this);
  }
  public async componentDidMount() {
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
    });
    if (!this.props.image) {
      return null;
    }
    this.imageProp();
  }
  public async isRecyclable(item) {
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
    if (parsed.num_results === 0) {
      return this.setState({ recycle: false, loading: false });
    } else {
      const temp = parsed.result[0].material_id;
      console.log(temp);
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
      this.setState({ description: final, loading: false });
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
    // this.props.googleWhatDoYouSee(CLOUD_VISION_API_KEY, body)
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
    console.log(parsed)
    const result = parsed.responses[0].labelAnnotations[0].description;
    this.setState({ label: result });
    this.isRecyclable(result);
  }
  private redo() {
    this.setState({ label: '' });
  }
  public render() {
    const { label, recycle, description } = this.state;
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
          <View>
          </View>
        </View>
      );
    }
    if (label === '') {
      return <CameraComp />;
    }
    if (recycle === false) {
      return (
        <ScrollView>
          <Card title={label.toUpperCase()}>
            <Text style={{ color: 'red', alignSelf: 'center' }} h2>
              No!
            </Text>
          </Card>
          <Card>
            <Button
              backgroundColor="#3E9428"
              title="CHOOSE A DIFFERENT PICTURE"
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              onPress={() => this.redo()}
            />
          </Card>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <Card title={label.toUpperCase()}>
          <Text style={{ color: 'green', alignSelf: 'center' }} h2>
            Yes!
          </Text>
          <Text h3>{description}</Text>
        </Card>
        <Card title="Nearest recycling facility">
          <Text>Location List</Text>
        </Card>
        <Card>
          <Button
            backgroundColor="#3E9428"
            title="CHOOSE A DIFFERENT PICTURE"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onPress={() => this.redo()}
          />
        </Card>
      </ScrollView>
    );
  }
}

/*const mapStateToProps = ({ what }) => {
  console.log('HERE IS THE GOOGLE API RES OBJ--->', what)
  return {
    what
  };
};

const mapDispatchToProps = dispatch => ({
  googleWhatDoYouSee: (CLOUD_VISION_API_KEY, body) => dispatch(googleWhatDoYouSee(CLOUD_VISION_API_KEY, body)),
});

const styles = StyleSheet.create({
  heartLogo: {
    padding: 0,
    margin: 30,
    width: 100,
    height: 90,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results);*/
