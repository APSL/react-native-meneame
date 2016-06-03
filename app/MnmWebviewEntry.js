/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    WebView
} from 'react-native'


class MnmWebviewEntry extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    url={this.props.url}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});

module.exports = MnmWebviewEntry;
