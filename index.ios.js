/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TabBarIOS,
    Navigator,
    TouchableHighlight,
    Component
} = React;

require('moment/locale/es');
var IonIcon = require('Ionicons');
var NavigationBar = require('react-native-navbar');

var MnmPublicadas = require('./MnmPublicadas');
var MnmAbout = require('./MnmAbout');

class mnm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Portada'
        };
    }

    _openAbout() {
        this.navigator.push({
            component: MnmAbout,
            navigationBar:
                <NavigationBar
                    title={'Acerca de'}
                    buttonsColor='#d35400'
                    prevTitle='Atrás'
                    navigator={{}}
                    route={{}}
                />
        });
    }

    _renderContentWithComponent(component) {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
                    component: component,
                    passProps: {section: this.state.selectedTab},
                    navigationBar:
                        <NavigationBar
                            title={this.state.selectedTab}
                            navigator={{}}
                            route={{}}
                            customPrev={
                                <TouchableHighlight
                                    onPress={this._openAbout}
                                    underlayColor='#FFFFFF'
                                    style={styles.button}>
                                    <Image source={require('image!settings')} />
                                </TouchableHighlight>
                            }
                        />
                }}
                renderScene={(route, nav) => {
                    var props = route.passProps || {};
                    props.navigator = nav;
                    var navBar = route.navigationBar;
                    if (navBar) {
                        navBar = React.cloneElement(navBar, {
                            navigator: nav,
                            route: route
                        });
                    }
                    var element = React.createElement.bind(this)(
                        route.component, props
                    );
                    return (
                        <View style={{flex: 1}}>
                            {navBar}
                            {element}
                        </View>
                    );
                }}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
            />
        );
    }

    render() {
        return (
            <TabBarIOS barTintColor='black' tintColor='#d35400'>
                <IonIcon.TabBarItem title='Portada'
                    iconName='ios-paper-outline'
                    selectedIconName='ios-paper'
                    selected={this.state.selectedTab === 'Portada'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Portada'
                        });
                    }}>
                    {this._renderContentWithComponent(MnmPublicadas)}
                </IonIcon.TabBarItem>
                <IonIcon.TabBarItem title='Nuevas'
                    iconName='ios-time-outline'
                    selectedIconName='ios-time'
                    selected={this.state.selectedTab === 'Nuevas'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Nuevas'
                        });
                    }}>
                    {this._renderContentWithComponent(MnmPublicadas)}
                </IonIcon.TabBarItem>
                <IonIcon.TabBarItem title='Populares'
                    iconName='ios-heart-outline'
                    selectedIconName='ios-heart'
                    selected={this.state.selectedTab === 'Populares'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Populares'
                        });
                    }}>
                    {this._renderContentWithComponent(MnmPublicadas)}
                </IonIcon.TabBarItem>
                <IonIcon.TabBarItem title='Más visitadas'
                    iconName='ios-flame-outline'
                    selectedIconName='ios-flame'
                    selected={this.state.selectedTab === 'Más visitadas'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Más visitadas'
                        });
                    }}>
                    {this._renderContentWithComponent(MnmPublicadas)}
                </IonIcon.TabBarItem>
                <IonIcon.TabBarItem title='Destacadas'
                    iconName='ios-star-outline'
                    selectedIconName='ios-star'
                    selected={this.state.selectedTab === 'Destacadas'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Destacadas'
                        });
                    }}>
                    {this._renderContentWithComponent(MnmPublicadas)}
                </IonIcon.TabBarItem>
            </TabBarIOS>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navBar: {
        backgroundColor: '#FAFAFA',
    },
    button: {
        paddingLeft: 5,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        top: 3,
    },
    text: {
        color: '#d35400',
        alignSelf: 'center',
    },
});

AppRegistry.registerComponent('mnm', () => mnm);
