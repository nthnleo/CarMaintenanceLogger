import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
  Image,
  Text
} from 'react-native'

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true
    }
  }
  componentWillMount(){
    /*AsyncStorage.getItem('user_data').then((user_data) => {
      this.setState({
        user: user_data,
        loaded: true
      });
    });*/
  }
  render() {
    let user = firebase.auth().currentUser;
    let name, email, photoUrl, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }
    return (
      <View style={styles.container}>
          <Header text="Account" loaded={this.state.loaded} />
          <View style={styles.body}>
          {
            firebase.auth().currentUser &&
              <View style={styles.body}>
                <View style={page_styles.email_container}>
                  <Text style={page_styles.email_text}>{email}</Text>
                </View>

                <Button
                    text="Logout"
                    onpress={this.logout.bind(this)}
                    button_styles={styles.primary_button}
                    button_text_styles={styles.primary_button_text} />
              </View>
          }
          </View>
        </View>
      );
  }
  logout(){
    firebase.auth().signOut();
    this.props.navigator.push({
      component: Login
    });
  }
}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
