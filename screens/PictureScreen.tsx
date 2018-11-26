import React from 'react';
import { Component } from 'react';
import { Permissions } from 'expo';
import { Text } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Camera } from 'expo';
import { Alert } from 'react-native';

interface State {
  hasCameraPermission: boolean | undefined;
  type: string;
  uri: string;
}

export default class PictureScreen extends Component<{}, State> {
  constructor(props: {}, context?: any) {
    super(props, context);
    this.state = {
      hasCameraPermission: undefined,
      type: Camera.Constants.Type.back,
      uri: 'empty',
    };
    this.takePic = this.takePic.bind(this);
  }
  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.snapButton}
              onPress={() => this.takePic()}
            >
              <Text style={styles.snapText}> Capture </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
  private toggleCameraType() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
    Alert.alert('Flipped');
  }
  private async takePic() {
    if (this.camera) {
      await this.camera
        .takePictureAsync()
        .then(picture => this.setState({ uri: picture.uri }));
    }
    Alert.alert('Picture taken');
  }
}

const styles = StyleSheet.create({
  snapText: {
    color: 'white',
    fontSize: 15,
  },
  snapButton: {
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
  },
});
