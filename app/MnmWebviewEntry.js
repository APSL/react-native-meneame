/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

import React, { PropTypes } from 'react'
import {
    StyleSheet,
    View,
    WebView
} from 'react-native'

class MnmWebviewEntry extends React.Component {
  static propTypes = {
    uri: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <WebView
          scalesPageToFit={true}
          source={{uri: this.props.uri}}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  webView: {
      flex: 1,
  },
})

module.exports = MnmWebviewEntry;
