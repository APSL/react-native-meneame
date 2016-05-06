import React from 'react'
import {
  AppRegistry,
} from 'react-native'
import ListTest from './app/ListTest'

class mnm extends React.Component {
  render() {
    return (
      <ListTest />
    );
  }
}

AppRegistry.registerComponent('mnm', () => mnm);
