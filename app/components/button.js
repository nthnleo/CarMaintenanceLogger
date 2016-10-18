import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

export default class Button extends Component {
  render() {
    return (
        <TouchableOpacity underlayColor={"#E8E8E8"} onPress={() => {dismissKeyboard();this.props.onpress();}} style={this.props.button_styles}>
          <Text style={this.props.button_text_styles}>{this.props.text}</Text>
        </TouchableOpacity>
    );
  }
}
