import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
  Image,
  Text,
  ListView
} from 'react-native'

import Button from '../components/button';
import Header from '../components/header';

import Login from './login';
import Add from './add';

import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';

export default class Records extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const car = 'miata';
    const recordListRef = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/${car}`).orderByChild('mileage');
    recordListRef.on('value', (snapshot) => {
      this.setState({
        dataSource: ds.cloneWithRows(this.parseData(snapshot.val()))
      });
    });
    this.state = {
      loaded: true,
      dataSource: ds
    };
  }
  render() {
    return (
      <View style={styles.container}>
          <Header text="Records" loaded={this.state.loaded}>
              <Button
                text="Add"
                onPress={this.add.bind(this)}
                button_styles={styles.transparent_button}
                />
          </Header>

          {
            firebase.auth().currentUser &&
              <View style={styles.body}>

                <ListView
                  dataSource={this.state.dataSource}
                  renderHeader={() => <Text>Header</Text>}
                  renderRow={(rowData) => {
                    return (
                      <View style={page_styles.row}>
                        <Text style={page_styles.rowData}>Date: {rowData.date}</Text>
                        <Text style={page_styles.rowData}> Mileage: {rowData.mileage}</Text>
                        <Text style={page_styles.rowData}> Description: {rowData.description}</Text>
                      </View>
                    );
                  }}
                  renderSeparator={(sectionId, rowId) => <View key={rowId} style={page_styles.separator}></View>}
                  style={page_styles.listview}
                />

                <Button
                    text="Logout"
                    onPress={this.logout.bind(this)}
                    button_styles={[styles.primary_button, {marginBottom: 20}]}
                    button_text_styles={styles.primary_button_text}
                />
              </View>
          }

        </View>
      );
  }
  parseData(data) {
    let parsed = [];
    for (var o in data) {
      let dateObj = new Date(data[o].date);
      data[o].date = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
      parsed.push(data[o]);
    }
    return parsed;
  }
  add() {
    this.props.navigator.push({
      component: Add
    });
  }
  logout(){
    firebase.auth().signOut();
    this.props.navigator.pop();
  }
}

const page_styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  row: {
    flexDirection: 'row'
  },
  rowData: {
    fontSize: 18,
  }
});
