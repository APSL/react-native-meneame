/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    Text,
    View,
    LinkingIOS,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    Component
} = React;

class MnmAbout extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.madeBy}>App made by APSL</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    madeBy: {
        flex: 1,
    },
});

module.exports = MnmAbout;
