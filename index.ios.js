/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var MnmPublicadas = require('./MnmPublicadas');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Component
} = React;


class mnm extends Component {
    render() {
        return (
            <React.NavigatorIOS
                style={styles.container}
                tintColor={'#d35400'}
                initialRoute={{
                    title: 'En portada',
                    component: MnmPublicadas
            }}/>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('mnm', () => mnm);
