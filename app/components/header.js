import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

export default class Header extends Component  {
  render() {
    return(
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>
            {this.props.text}
          </Text>
        </View>
        <View style={styles.header_item}>
          {!this.props.loaded && <ActivityIndicator/>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#000',
    fontSize: 18
  }
});
