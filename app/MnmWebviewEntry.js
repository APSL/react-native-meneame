/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    StatusBarIOS,
    WebView,
    Component
} = React;

class MnmWebviewEntry extends Component {
    componentDidMount() {
        StatusBarIOS.setHidden(false, true);
    }

    componentWillUnmount() {
        StatusBarIOS.setHidden(true, true);
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
