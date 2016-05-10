/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import Meneame from './app/Meneame'


class mnm extends Component {
  render () {
    return (
      <Meneame />
    )
  }
}

AppRegistry.registerComponent('mnm', () => mnm);
