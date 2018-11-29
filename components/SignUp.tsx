import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry, View, TextInput, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';


class SignUp extends Component {
  render() {
    return (
      <View>
      <FormLabel>First Name</FormLabel>
      <FormInput/>
      <FormLabel>Last Name</FormLabel>
      <FormInput/>
      <FormLabel>User Name</FormLabel>
      <FormInput/>
      <FormLabel>Email</FormLabel>
      <FormInput/>
      <FormLabel>Password</FormLabel>
      <FormInput/>
      <Button
        raised
        backgroundColor='#3E9428'
        title='Sign Up' />
      </View>
    )
  }
}


export default connect(null)(SignUp);
