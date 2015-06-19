/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    Text,
    Image,
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
                <Image source={require('image!logo_apsl')} style={styles.image} />
                <Text style={styles.madeBy}>App made with ❤️ by APSL</Text>
                <TouchableHighlight
                    onPress={() => {
                        LinkingIOS.openURL('http://publicsource.apple.com/license/apsl/');
                    }}
                    underlayColor='#FFFFFF'
                    style={styles.license}>
                    <Text style={styles.licenseText}>
                        Released under APSL license. 2015.
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    madeBy: {
        textAlign: 'center',
    },
    image: {
        width: 75,
        height: 75,
        marginTop: 25,
    },
    license: {
        textAlign: 'center',
        marginTop: 15,
    },
    licenseText: {}
});

module.exports = MnmAbout;
