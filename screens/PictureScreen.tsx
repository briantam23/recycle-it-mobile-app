import React from 'react';
import { Component } from 'react';
import { Permissions, ImagePicker } from 'expo';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Camera } from 'expo';
import { Alert } from 'react-native';

interface State {
  hasCameraPermission: boolean | undefined;
  type: string;
  image: string;
}
export interface Props {
  navigation: string;
}

export default class PictureScreen extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      hasCameraPermission: undefined,
      type: Camera.Constants.Type.back,
      image: '',
    };
    this.takePic = this.takePic.bind(this);
    this.pickImage = this.pickImage.bind(this);
  }
  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA).then(() =>
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    );
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  public render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === undefined) {
      return <Text>Get permission to Camera</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'dodgerblue',
            flex: 0.5,
            height: 40,
            marginHorizontal: 2,
            marginBottom: 50,
            marginTop: 20,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => this.takePic()}
        >
          <Text style={{ color: 'white', fontSize: 15 }}> Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'dodgerblue',
            flex: 0.5,
            height: 40,
            marginHorizontal: 2,
            marginBottom: 50,
            marginTop: 20,
            borderRadius: 8,
            borderColor: 'white',
            borderWidth: 1,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => this.pickImage()}
        >
          <Text style={{ color: 'white', fontSize: 15 }}> Gallery</Text>
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
      let image = await ImagePicker.launchCameraAsync({});
      if (image.cancelled === false) {
        this.setState({ image: image.uri });
      }
    }
    Alert.alert(this.state.image);
  };
  private pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    console.log(permissions, status);
    if (status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        aspect: [4, 3],
      });
      if (image.cancelled === false) {
        this.setState({ image: image.uri });
      }
    }
    Alert.alert(this.state.image);
  };
}
