import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Button from './app/components/button';
import Header from './app/components/header';

import Login from './app/pages/login';
import Account from './app/pages/account';

import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDK_O8_2T__nQw-6byRwkaj9N87WcB5pNg",
    authDomain: "reactnativefirebasetest.firebaseapp.com",
    databaseURL: "https://reactnativefirebasetest.firebaseio.com",
    storageBucket: "reactnativefirebasetest.appspot.com",
    messagingSenderId: "380200336691"
  };
firebase.initializeApp(config);

import styles from './app/styles/common-styles.js';

class CarMaintenanceLogger extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: Login,
      loaded: false
    };
  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if (route.component) {
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('CarMaintenanceLogger', () => CarMaintenanceLogger);
