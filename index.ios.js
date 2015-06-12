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
    TabBarIOS,
    NavigatorIOS,
    Component
} = React;

var IonIcon = require('Ionicons');

class mnm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Portada'
        };
    }

    _renderSection() {
        return (
            <NavigatorIOS
                style={styles.container}
                tintColor={'#d35400'}
                initialRoute={{
                    title: this.state.selectedTab,
                    component: MnmPublicadas,
                    passProps: {section: this.state.selectedTab}
                }}/>
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
    }
});

AppRegistry.registerComponent('mnm', () => mnm);
