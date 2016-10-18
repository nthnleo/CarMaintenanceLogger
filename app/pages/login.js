import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';

import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }
  componentDidMount(){
    let flag = true;
    firebase.auth().onAuthStateChanged((user) => {
    if (user && flag) {
      console.log(firebase.auth().currentUser.email);
      this.props.navigator.push({component: Account});
      flag = false;
    }
  });

}
  render() {
    console.log('render')
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.container}>
          <Header text="Login" loaded={this.state.loaded} />
          <View style={styles.body}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({email: text})}
              placeholder={"Email Address"}
              keyboardType='email-address'
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              placeholder={"Password"}
            />

            <Button
              text="Login"
              onpress={this.login.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text}
            />

            <Button
              text="New here?"
              onpress={this.goToSignup.bind(this)}
              button_styles={styles.transparent_button}
              button_text_styles={styles.transparent_button_text}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  goToSignup() {
    this.props.navigator.push({
      component: Signup
    });
  }
  login() {
    this.setState({loaded: false});
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      (user_data) => {
        //this.props.navigator.push({component: Account});
      },
      (error) => {
        this.setState({password: ''});
        alert(error);
      }
    );
    this.setState({loaded: true});
  }
}
