/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    WebView,
    Component
} = React;

class MnmWebviewEntry extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView url={this.props.url} />
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
