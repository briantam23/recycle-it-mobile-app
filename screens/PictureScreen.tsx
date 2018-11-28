import React from 'react';
import { Component } from 'react';
import { Permissions, ImagePicker } from 'expo';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Results from '../components/Results';

interface State {
  hasCameraPermission: boolean | undefined;
  type: string;
  image: string;
  loading: boolean;
}
export interface Props {
  navigation: object;
}

export default class PictureScreen extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      hasCameraPermission: undefined,
      type: Camera.Constants.Type.back,
      image: null,
      loading: true,
    };
    this.takePic = this.takePic.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }
  static navigationOptions = { title: 'Select a Picture' };
  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA).then(() =>
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    );
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  public render() {
    const { hasCameraPermission } = this.state;
    if (this.state.loading === false) {
      return <Results image={this.state.image} />;
    }
    if (hasCameraPermission === undefined) {
      return <Text>Get permission to Camera</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
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
        <TouchableOpacity onPress={() => this.takePic()}>
          <Image
            style={{ height: 250, width: 250 }}
            source={require('../images/CameraIcon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.pickImage()}>
          <Image
            style={{ height: 250, width: 250 }}
            source={require('../images/GalleryIcon.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
  private takePic = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const permission = Permissions.CAMERA;
    const part1 = await Permissions.askAsync(permissions);
    const part2 = await Permissions.askAsync(permission);
    console.log(permissions, part1.status);
    if (part1.status === 'granted' && part2.status === 'granted') {
      let image = await ImagePicker.launchCameraAsync({ base64: true });
      if (image.cancelled === false) {
        console.log(Object.keys(image));
        this.setState({ image: image.base64, loading: false });
      }
    }
  };
  private pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if (status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        aspect: [4, 3],
        base64: true,
      });
      if (image.cancelled === false) {
        this.setState({ image: image.base64, loading: false });
      }
    }
  };
}
