import React from 'react';
import { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { CLOUD_VISION_API_KEY } from '../apiKey';
import { Button, Text } from 'react-native-elements';
import PictureScreen from '../screens/PictureScreen';

interface Props {
  image: string;
  navigation: object;
}
interface State {
  label: string;
  loading: boolean;
}

export default class Results extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      label: '',
      loading: true,
    };
    this.imageProp = this.imageProp.bind(this);
    this.redo = this.redo.bind(this);
  }
  public componentDidMount() {
    if (!this.props.image) {
      return null;
    }
    this.imageProp();
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
              maxResults: 1,
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
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const parsed = await response.json();
    const result = parsed.responses[0].labelAnnotations[0].description;
    this.setState({ label: result, loading: false });
  }
  private redo() {
    this.setState({ label: '' });
  }
  public render() {
    const { label } = this.state;
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
        </View>
      );
    }
    if (label === '') {
      return <PictureScreen />;
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text h1>{label}</Text>
        <Button
          backgroundColor="#3E9428"
          title="GO BACK"
          onPress={() => this.redo()}
        />
      </View>
    );
  }
}
