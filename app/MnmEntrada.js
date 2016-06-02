import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    PixelRatio,
    Text,
    StatusBar,
    Navigator,
    TouchableHighlight
} from 'react-native'

var screen = require('Dimensions').get('window');
var Button = require('react-native-button');
var ParallaxView = require('react-native-parallax-view');
var ThumborURLBuilder = require('thumbor-url-builder');
var NavigationBar = require('react-native-navbar');

import { THUMBOR_KEY, THUMBOR_URL } from './ThumborConfig'
import MnmEntryTextAndDetails from './MnmEntryTextAndDetails'
var MnmCommentsContainer = require('./MnmCommentsContainer');
var MnmWebviewEntry = require('./MnmWebviewEntry');


class NavButton extends Component {
    render() {
        return (
            <Button style={styles.button} onPress={this.props.onPress}>
                {this.props.text}
            </Button>
        );
    }
}

class MnmEntrada extends Component {
    constructor(props) {
        super(props);
        var thumborURL = new ThumborURLBuilder(THUMBOR_KEY, THUMBOR_URL);
        if (this.props.entrada.thumb) {
            var entry = this.props.entrada;
            var imagePath = entry.thumb.substr(8, entry.thumb.length);
            this.props.entrada.mediaHeader = thumborURL.setImagePath(imagePath).resize(screen.width * screen.scale, screen.height).smartCrop(true).buildUrl();
        }
        this.state = {
            value: 'Noticia'
        };
    }

    _titlePressed() {
        this.props.navigator.push({
            title: this.props.entrada.title,
            component: MnmWebviewEntry,
            passProps: {url: this.props.entrada.go},
            navigationBar:
                <NavigationBar
                    title={this.props.entrada.title.substring(0, 25) + '...'}
                    buttonsColor="#d35400"
                    prevTitle="Atrás"
                    navigator={{}}
                    route={{}}
                />
        });
    }

    componentDidMount() {
        StatusBar.setHidden(true, true);
    }

    componentWillUnmount() {
        StatusBar.setHidden(false, true);
    }

    render() {
        var entrada = this.props.entrada;
        return (
            <ParallaxView
                backgroundSource={{uri: entrada.mediaHeader}}
                windowHeight={250}
                style={{backgroundColor: '#FAFAFA'}}
                contentInset={{bottom: 49}}>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <TouchableHighlight
                            onPress={this._titlePressed.bind(this)}
                            underlayColor={'#FAFAFA'}>
                            <Text style={styles.title}>{entrada.title}</Text>
                        </TouchableHighlight>
                        <Text style={styles.from}>{entrada.from}</Text>
                    </View>
                    <MnmEntryTextAndDetails entry={entrada} />
                    <NavButton onPress={() => {
                        this.props.navigator.push({
                            index: 1,
                            component: MnmCommentsContainer,
                            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                            passProps: {entryId: entrada.id}
                        });
                    }} text={'Comentarios (' + entrada.comments + ')'}
                       style={styles.button}/>
                </View>
            </ParallaxView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    info: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
      marginBottom: 10,
      paddingBottom: 10,
    },
    title: {
        fontWeight: '300',
        color: '#262626',
        fontSize: 20,
    },
    from: {
        fontWeight: '300',
        color: '#7f8c8d',
        fontSize: 12,
        marginBottom: 5,
    },
    button: {
        color: '#d35400',
        marginTop: 10,
        fontSize: 22,
        paddingTop: 15,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

module.exports = MnmEntrada;
