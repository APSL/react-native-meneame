/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    WebView
} from 'react-native'


class MnmWebviewEntry extends Component {
    componentDidMount() {
        StatusBar.setHidden(false, true);
    }

    componentWillUnmount() {
        StatusBar.setHidden(true, true);
    }

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
