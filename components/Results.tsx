import React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import { CLOUD_VISION_API_KEY } from '../apiKey';
//import { Header, Icon } from 'react-native-elements';

interface Props {
  image: string;
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
      loading: false,
    };
    this.imageProp = this.imageProp.bind(this);
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
    this.setState({ label: result });
  }
  public render() {
    const { label } = this.state;
    return (
      <View>
        <Text>{label}</Text>
      </View>
    );
  }
}
