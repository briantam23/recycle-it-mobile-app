import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry, View, TextInput, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Form} from 'react-native-elements';
import firebase from 'firebase';


class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state=({
      firstName:'',
      lastName:'',
      userName:'',
      email:'',
      password:''
    })
  }
  signUp = (email,password) => {
        try{
          firebase.auth().createUserWithEmailAndPassword(email,password)
          this.clear();
        }
        catch(error){
          console.log(error.toString())
        }
      }

  clear = ()=> {
    this.inputOne.clearText();
    this.inputTwo.clearText();
    this.inputThree.clearText();
    this.inputFour.clearText();
    this.input.clearText();
    this.setState({
      firstName:'',
      lastName:'',
      userName:'',
      email:'',
      password:''
    })
  }

  render() {
    return (
    <View id='form'>
      <FormLabel>First Name</FormLabel>
      <FormInput
      onChangeText={(firstName) => this.setState({firstName})}
      ref={inputOne => this.inputOne = inputOne}
      />
      <FormLabel>Last Name</FormLabel>
      <FormInput
      onChangeText={(lastName) => this.setState({lastName})}
      ref={inputTwo => this.inputTwo = inputTwo}
      />
      <FormLabel>User Name</FormLabel>
      <FormInput
      onChangeText={(userName) => this.setState({userName})}
      ref={inputThree => this.inputThree = inputThree}
      />
      <FormLabel>Email</FormLabel>
      <FormInput
        onChangeText={(email) => this.setState({email})}
        ref={inputFour => this.inputFour = inputFour}
      />
      <FormLabel>Password</FormLabel>
      <FormInput
        onChangeText={(password) => this.setState({password})}
        ref={input => this.input = input}
      />
      <Button
        raised
        backgroundColor='#3E9428'
        title='Sign Up'
        onPress={() => this.signUp(this.state.email, this.state.password)}
        />
      </View>
    )
  }
}


export default connect(null)(SignUp);
