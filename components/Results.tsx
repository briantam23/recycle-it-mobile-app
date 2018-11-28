import React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';

import Axios from 'axios';

import { CLOUD_VISION_API_KEY } from '../apiKey';

interface Props {
  image: string;
}
interface State {
  labels: object;
  loading: boolean;
}

export default class Results extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      labels: [],
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
    console.log(parsed);
    console.log(typeof process.env.CLOUD_VISION_API_KEY);
  }

  public render() {
    const { labels } = this.state;
    return (
      <View>
        <Text>{labels}</Text>
      </View>
    );
  }
}
