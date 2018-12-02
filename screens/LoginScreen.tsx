import React from 'react';
import SignUp from '../components/SignUp'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'MyProfile',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: "white",
  };

  render() {
    return <SignUp />;
  };
};
