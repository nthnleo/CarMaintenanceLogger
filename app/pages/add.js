import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  DatePickerAndroid
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import Header from '../components/header';
import Button from '../components/button';

import Records from '../pages/records';

import styles from '../styles/common-styles';

import * as firebase from 'firebase';

export default class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      date: new Date(),
      mileage: null,
      description: null
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={styles.container}>

          <Header
            text="Add Your Maintenance"
          />

          {/*duh body*/}
          <View style={styles.body}>
            <Button
              text="Date"
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text}
              onPress={this.showPicker.bind(this)}
            />
            <Text>Mileage</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => {this.setState({mileage: text})}}
              value={this.state.mileage}
              keyboardType='numeric'
            />
            <Text>Description</Text>
            <TextInput
              style={[styles.textinput, {height: 80}]}
              onChangeText={(text) => {this.setState({description: text})}}
              value={this.state.description}
              numberOfLines={5}
              multiline={true}
            />
            <View style={{flexDirection: 'row'}}>
              <Button
                text="Back"
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text}
                onPress={this.backToMain.bind(this)}
              />
              <Button
                text="Add"
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text}
                onPress={this.addRecord.bind(this)}
              />
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
  backToMain() {
    this.props.navigator.pop();
  }
  addRecord() {
    const car = 'miata';
    const recordListRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/${car}`);
    let newRecordRef = recordListRef.push();
    newRecordRef.set({
      date: this.state.date.getTime(),
      mileage: this.state.mileage,
      description: this.state.description
    });
    this.setState({
      date: new Date(),
      mileage: null,
      description: null
    });

  }
  async showPicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({date: new Date()});
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({date: new Date(year, month, day)});
      }
    } catch ({code, message}) {
      alert(message);
    }
  }
}
