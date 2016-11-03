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
import Records from './records';

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
              value={this.state.email}
              placeholder={"Email Address"}
              keyboardType='email-address'
            />
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              placeholder={"Password"}
              secureTextEntry={true}
            />
            <Button
              text="Sign Up"
              onPress={this.signup.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />

            <Button
              text="Got an Account?"
              onPress={this.goToLogin.bind(this)}
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
        this.props.navigator.push({component: Records});
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
