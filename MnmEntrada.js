/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    PixelRatio,
    View,
    Image,
    Text,
    SegmentedControlIOS,
    StatusBarIOS,
    Navigator,
    TouchableHighlight,
    ListView,
    Component
} = React;
var screen = require('Dimensions').get('window');
var Button = require('react-native-button');
var ParallaxView = require('react-native-parallax-view');
var ThumborURLBuilder = require('thumbor-url-builder');
var NavigationBar = require('react-native-navbar');

import { THUMBOR_KEY, THUMBOR_URL} from './ThumborConfig'
var MnmCommentsContainer = require('./MnmCommentsContainer');
var MnmEntradaInfo = require('./MnmEntradaInfo');
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

    _renderSegmented(entrada) {
        if (this.state.value === 'Noticia') {
            return <Text style={styles.story}>{entrada.content}</Text>;
        } else {
            return <MnmEntradaInfo entry={entrada}/>;
        }
    }

    _titlePressed() {
        this.props.navigator.push({
            title: this.props.entrada.title,
            component: MnmWebviewEntry,
            passProps: {url: this.props.entrada.go},
            navigationBar:
                <NavigationBar
                    title={this.props.entrada.title.substring(0, 25) + '...'}
                    buttonsColor='#d35400'
                    prevTitle='Atrás'
                    navigator={{}}
                    route={{}}
                />
        });
    }

    _switchDetails(value) {
        this.setState({
            value: value
        });
    }

    componentDidMount() {
        StatusBarIOS.setHidden(true, true);
    }

    componentWillUnmount() {
        StatusBarIOS.setHidden(false, true);
    }

    render() {
        var entrada = this.props.entrada;
        return (
            <ParallaxView
                backgroundSource={{uri: entrada.mediaHeader}}
                windowHeight={250}
                style={{backgroundColor: '#FAFAFA'}}>
                <View style={styles.container}>
                    <View style={styles.info}>
                        <TouchableHighlight
                            onPress={this._titlePressed.bind(this)}
                            underlayColor={'#FAFAFA'}>
                            <Text style={styles.title}>{entrada.title}</Text>
                        </TouchableHighlight>
                        <Text style={styles.from}>{entrada.from}</Text>
                    </View>
                    <SegmentedControlIOS
                        values={['Noticia', 'Detalles']}
                        tintColor={'#d35400'}
                        selectedIndex={0}
                        style={styles.segmented}
                        onValueChange={this._switchDetails.bind(this)}/>
                    {this._renderSegmented(entrada)}
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
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        shadowColor: '#222',
        shadowOpacity: 0.9,
        shadowRadius: 2,
        backgroundColor: 'transparent',
    },
    headerTitle: {
        alignItems: 'flex-end',
        color: '#ecf0f1',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    title: {
        fontWeight: '300',
        color: '#262626',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    from: {
        fontWeight: '300',
        color: '#7f8c8d',
        fontSize: 12,
        marginBottom: 5,
    },
    info: {
        borderBottomColor: '#7f8c8d',
        borderBottomWidth: 1 / PixelRatio.get(),
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
    },
    meneos: {
        fontWeight: '300',
        color: '#d35400',
        marginBottom: 5,
    },
    story: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '300',
        color: '#7f8c8d',
        fontSize: 14,
    },
    segmented: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    button: {
        color: '#d35400',
        marginTop: 20,
        fontSize: 22,
        paddingTop: 15,
        paddingBottom: 25,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

module.exports = MnmEntrada;
