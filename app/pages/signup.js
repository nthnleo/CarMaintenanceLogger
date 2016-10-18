import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';
import Account from './account';

import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.container}>

          <Header text="Signup" loaded={this.state.loaded} />

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
              placeholder={"Password"}
              secureTextEntry={true}
            />
            <Button
              text="Sign Up"
              onpress={this.signup.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />

            <Button
              text="Got an Account?"
              onpress={this.goToLogin.bind(this)}
              button_styles={styles.transparent_button}
              button_text_styles={styles.transparent_button_text} />
          </View>

        </View>
      </TouchableWithoutFeedback>
    )
  }
  signup() {
    this.setState({
      loaded: false
    });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
      (user_data) => {
        this.props.navigator.push({component: Account});
      },
      (error) => {
        alert(error);
      }
    );
      this.setState({
        password: '',
        loaded: true
      });
  }
  goToLogin() {
    this.props.navigator.push({
      component: Login
    });
  }
}
