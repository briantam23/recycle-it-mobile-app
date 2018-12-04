import * as React from 'react';
import SignUp from '../components/SignUp';


export default class signUpScreen extends React.Component {
  static navigationOptions = {
    title: 'My Profile',
    headerStyle: {
      backgroundColor: '#518e30',
      marginBottom: 0,
    },
    headerTintColor: "white",
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <SignUp />;
  }
}
