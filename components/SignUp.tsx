import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry, View, TextInput, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Form} from 'react-native-elements';
import firebase from '../firebase';

const db = firebase.firestore();

let newUser = {}

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state=({
      userName:'',
      email:'',
      password:'',
      points: 0,
      loggedIn:false,
    })
  }
  signUp = (email,password,userName) => {
        try{
          firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(user => db.collection("User").add({
             userName:userName,
             email:email,
             password:password,
             id:`${user.user.uid}`
            }));
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
    this.setState({
      loggedIn:true
    })
  }

  render() {
    return (
    <View id='form'>
      <FormLabel>User Name</FormLabel>
      <FormInput
      onChangeText={(userName) => this.setState({userName})}
      ref={inputOne => this.inputOne = inputOne}
      />
      <FormLabel>Email</FormLabel>
      <FormInput
        onChangeText={(email) => this.setState({email})}
        ref={inputTwo => this.inputTwo = inputTwo}
      />
      <FormLabel>Password</FormLabel>
      <FormInput
        onChangeText={(password) => this.setState({password})}
        ref={inputThree => this.inputThree = inputThree}
      />
      <Button
        raised
        backgroundColor='#3E9428'
        title='Sign Up'
        onPress={() => this.signUp(this.state.email, this.state.password, this.state.userName)}
        />
      </View>
    )
  }
}


export default connect(null)(SignUp);
