/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Navigator,
    StatusBarIOS,
    TouchableHighlight,
    Text,
    View,
    Component
} = React;

var NavigationBar = require('react-native-navbar');

var MnmComments = require('./MnmComments');

class MnmCommentsContainer extends Component {

    componentDidMount() {
        StatusBarIOS.setHidden(false, true);
    }

    componentWillUnmount() {
        StatusBarIOS.setHidden(true, false);
    }

    _close() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <Navigator
                initialRoute={{
                    component: MnmComments,
                    navigationBar:
                        <NavigationBar
                            title={'Comentarios'}
                            navigator={{}}
                            route={{}}
                            customPrev={
                                <TouchableHighlight
                                    onPress={this._close.bind(this)}
                                    style={styles.closeButton}
                                    underlayColor='#FFFFFF'>
                                    <Text style={styles.closeText}>
                                        Cerrar
                                    </Text>
                                </TouchableHighlight>
                            }
                        />
                }}
                renderScene={(route, nav) => {
                    var navBar = route.navigationBar;
                    if (navBar) {
                        navBar = React.cloneElement(navBar, {
                            navigator: nav,
                            route: route
                        });
                    }
                    return (
                        <View style={{flex: 1}}>
                            {navBar}
                            <MnmComments entryId={this.props.entryId}/>
                        </View>
                    );
                }}
            />
        );
    }
}

var styles = StyleSheet.create({
    closeButton: {
        paddingLeft: 15,
        width: 70,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        top: 3,
    },
    closeText: {
        color: '#d35400',
        alignSelf: 'center',
    },
});

module.exports = MnmCommentsContainer;
