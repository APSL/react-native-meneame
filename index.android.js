'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native'

import ListTest from './app/ListTest'

class mnm extends Component {
  render() {
    return (
      <ListTest />
    );
  }
}

AppRegistry.registerComponent('mnm', () => mnm);
