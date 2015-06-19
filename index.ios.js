/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator,
    TouchableOpacity,
    Component
} = React;

require('moment/locale/es');
var IonIcon = require('Ionicons');
var NavigationBar = require('react-native-navbar');

var MnmPublicadas = require('./MnmPublicadas');

class mnm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Portada'
        };
    }

    _renderSection() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
                    title: this.state.selectedTab,
                    component: MnmPublicadas,
                    passProps: {section: this.state.selectedTab},
                    navigationBar:
                        <NavigationBar
                            title={this.state.selectedTab}
                            navigator={{}}
                            route={{}}
                        />
                }}
                renderScene={(route, nav) => {
                    var props = route.passProps;
                    props.navigator = nav;
                    var navBar = route.navigationBar;
                    if (navBar) {
                        navBar = React.cloneElement(navBar, {
                            navigator: nav,
                            route: route
                        });
                    }
                    var component = React.createElement.bind(this)(
                        route.component, props
                    );
                    return (
                        <View style={{flex: 1}}>
                            {navBar}
                            {component}
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
                    {this._renderSection()}
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
                    {this._renderSection()}
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
                    {this._renderSection()}
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
                    {this._renderSection()}
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
                    {this._renderSection()}
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
});

AppRegistry.registerComponent('mnm', () => mnm);
