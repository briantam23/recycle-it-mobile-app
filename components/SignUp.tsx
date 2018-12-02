import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry, View, TextInput, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Form, Avatar, Card} from 'react-native-elements';
import firebase from '../firebase';

const db = firebase.firestore();

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state={
      userName:'',
      email:'',
      password:'',
      points: 0,
      loggedIn:false,
    }
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
      loggedIn:true,
    })
  }

  logOut = () => {
    try{
      firebase.auth().signOut()
      this.setState({
        userName:'',
        email:'',
        password:'',
        points: 0,
        loggedIn:false,
      })
    }
    catch(error) {
      console.log(error.toString())
    }
  }

  logIn=(email,password) => {
    firebase.auth.signInWithEmailAndPassword(email, password)
  }

  render() {
    return (
      <View>
      {this.state.loggedIn === false ?
      <View>
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
          <Button
            style={{marginTop:10}}
            raised
            backgroundColor='#3E9428'
            title='Log In'
            onPress={() => this.logIn(this.state.email, this.state.password)}
            />
        </View>
        :
        <View>
        <Card containerStyle={{marginTop:150}}>

          <Avatar
          xlarge
          title={this.state.userName[0]}
          containerStyle={{ marginLeft: 100, marginRight:115}}
          rounded
           />
           <Text style={{marginTop:25, marginLeft:110, marginRight:75, fontSize:40}}>{this.state.userName}</Text>
           <Text style={{marginTop:10, marginLeft:110, marginRight:75, fontSize:35}}>Points: {this.state.points}</Text>
           <Button
           style={{marginTop:10}}
           raised
           backgroundColor='#3E9428'
           title='Log Out'
           onPress={()=>this.logOut()}
           />
           </Card>
        </View>}
        </View>
    )
  };
};

export default connect(null)(SignUp);
