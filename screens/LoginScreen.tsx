import * as React from 'react';
import SignUp from '../components/SignUp'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  render() {
    return <SignUp />;
  };
};
