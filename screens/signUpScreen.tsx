import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import SignUp from '../components/SignUp';

export default class signUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <SignUp />;
  }
}
