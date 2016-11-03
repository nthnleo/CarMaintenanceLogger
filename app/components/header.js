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

        <View style={styles.header_section}>
          {/*left stuff*/}
          <View style={styles.header_item}>
            <Text style={styles.header_text}>
              {this.props.text}
            </Text>
          </View>
          <View style={styles.header_item}>
            {this.props.loaded != null && !this.props.loaded && <ActivityIndicator/>}
          </View>
        </View>

        <View style={styles.header_section}>
          {/*right stuff*/}
          {this.props.children}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between'
  },
  header_section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  header_item: {
    marginLeft: 5,
    marginRight: 5
  },
  header_text: {
    color: '#000',
    fontSize: 18
  },
});
