import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, TextInput, Text } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Avatar,
  Card,
  Divider,
} from 'react-native-elements';
import firebase from '../firebase';

const db = firebase.firestore();

const myUsers = db.collection('User');
interface State {
  userName: string;
  email: string;
  password: string;
  points: number;
  loggedIn: boolean;
  uid: string;
}
interface Props {}

export default class SignUp extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context);
    this.state = {
      userName: '',
      email: '',
      password: '',
      points: 0,
      loggedIn: false,
      uid: '',
    };
  }
  componentDidMount() {
    this.inputOne.focus();
    this.inputTwo.focus();
    this.inputThree.focus();
  }
  signUp = (email, password, userName) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user =>
          db
            .collection('User')
            .doc(user.user.uid)
            .set({
              userName: userName,
              email: email,
              password: password,
              id: `${user.user.uid}`,
              points: 0,
            })
        );
      this.clear();
    } catch (error) {
      console.log(error.toString());
    }
  };

  clear = () => {
    this.inputOne.clearText();
    this.inputTwo.clearText();
    this.inputThree.clearText();
    this.setState({
      loggedIn: true,
    });
  };

  logOut = () => {
    try {
      firebase.auth().signOut();
      this.setState({
        userName: '',
        email: '',
        password: '',
        points: 0,
        loggedIn: false,
      });
    } catch (error) {
      console.log(error.toString());
    }
  };

  logIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => db.collection('User').doc(user.user.uid))
      .then(query => query.get())
      .then(found => found.data())
      .then(data => {
        this.setState({
          userName: data.userName,
          email: data.email,
          points: data.points,
          loggedIn: true,
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
  };
  private inputOne: FormInput;
  private inputTwo: FormInput;
  private inputThree: FormInput;
  render() {
    return (
      <View>
     config-app.json-for-deployment
        {this.state.loggedIn === false ? (
          <View>
            <FormLabel>User Name</FormLabel>
            <FormInput
              onChangeText={userName => this.setState({ userName })}
              ref={inputOne => (this.inputOne = inputOne)}
            />
            <FormLabel>Email</FormLabel>
            <FormInput
              onChangeText={email => this.setState({ email })}
              ref={inputTwo => (this.inputTwo = inputTwo)}
            />
            <FormLabel>Password</FormLabel>
            <FormInput
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              ref={inputThree => (this.inputThree = inputThree)}
            />
            <FormLabel />
            <Button
              raised
              backgroundColor="#3E9428"
              title="Sign Up"
              onPress={() =>
                this.signUp(
                  this.state.email,
                  this.state.password,
                  this.state.userName
                )
              }
            />
            <Button
              style={{ marginTop: 10 }}
              raised
              backgroundColor="#3E9428"
              title="Log In"
              onPress={() => this.logIn(this.state.email, this.state.password)}
            />
          </View>
        ) : (
          <View>
            <Card containerStyle={{ marginTop: 150 }}>
              <Avatar
                xlarge
                title={this.state.userName[0]}
                containerStyle={{ marginLeft: 100, marginRight: 115 }}
                rounded
              />
              <Text
                style={{
                  marginTop: 25,
                  marginLeft: 110,
                  marginRight: 75,
                  fontSize: 40,
                }}
              >
                {this.state.userName}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginLeft: 110,
                  marginRight: 75,
                  fontSize: 35,
                }}
              >
                Points: {this.state.points}
              </Text>
              <Button
                style={{ marginTop: 10 }}
                raised
                backgroundColor="#3E9428"
                title="Log Out"
                onPress={() => this.logOut()}
              />
            </Card>
          </View>
        )}
      </View>
    );
  }
}

//export default connect(null)(SignUp);
