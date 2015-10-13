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
                <Text style={styles.madeBy}>Made with ❤️ by APSL</Text>
                <TouchableHighlight
                    onPress={() => {
                        LinkingIOS.openURL('http://publicsource.apple.com/license/apsl/');
                    }}
                    underlayColor='#FFFFFF'
                    style={styles.license}>
                    <Text style={styles.text}>
                        Released under APSL license, 2015
                    </Text>
                </TouchableHighlight>
                <Text style={styles.text}>
                    Thanks to meneame.net and the React Native community
                </Text>
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
        fontWeight: '300',
    },
    image: {
        width: 75,
        height: 75,
        marginTop: 25,
    },
    license: {
        textAlign: 'center',
        marginTop: 10,
    },
    text: {
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: '300',
        textAlign: 'center',
    }
});

module.exports = MnmAbout;
