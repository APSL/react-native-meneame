'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    SegmentedControlIOS,
    Navigator,
    TouchableHighlight,
    ListView,
    Component
} = React;
var screen = require('Dimensions').get('window');
var moment = require('moment');
var Button = require('react-native-button');
var ParallaxView = require('react-native-parallax-view');
var MnmComments = require('./MnmComments');

class NavButton extends Component {
    render() {
        // <TouchableHighlight
        //     style={styles.button}
        //     underlayColor="#B5B5B5"
        //     onPress={this.props.onPress}>
        //     <Text style={styles.buttonText}>{this.props.text}</Text>
        // </TouchableHighlight>
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
        if (this.props.entrada.media) {
            var entry = this.props.entrada;
            this.props.entrada.mediaHeader = 'http://thumbor.eduherraiz.com/unsafe/' + screen.width * 2 + 'x' + screen.width * 2 + '/smart/' + entry.media.substr(8, entry.media.length);
        }
    }

    renderEntryView(entrada, nav) {
        return (
            <ParallaxView
                backgroundSource={{uri: entrada.mediaHeader}}
                windowHeight={120}>
                <View style={styles.container}>
                    <Text style={styles.title}>{entrada.title}</Text>
                    <Text style={styles.from}>{entrada.from}</Text>
                    <View style={styles.info}>
                        <Text style={styles.meneos}>{entrada.meneos} meneos</Text>
                    </View>
                    <SegmentedControlIOS
                        values={['Detalles', 'Comentarios']}
                        tintColor={'#d35400'}
                        selectedIndex={0}
                        style={styles.segmented}/>
                    <Text style={styles.story}>{entrada.story}</Text>
                    <NavButton onPress={() => {
                        nav.push({
                            index: 1,
                            component: MnmComments,
                            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                            passProps: {entryId: entrada.id}
                        });
                    }} text={'Comentarios (' + entrada.comments + ')'}/>
                </View>
            </ParallaxView>
        );
    }

    detailRender(route, nav) {
        switch (route.index) {
            case 1:
                return <MnmComments entryId={this.props.entrada.id}/>;
            default:
                return this.renderEntryView(this.props.entrada, nav);
        }
    }

    render() {
        return (
            <Navigator style={styles.container}
                initialRoute={{name: 'Entrada', index: 0}}
                renderScene={this.detailRender.bind(this)}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
            />
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
        fontFamily: 'Helvetica Neue',
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
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#262626',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    from: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#7f8c8d',
        fontSize: 12,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
    },
    info: {
        borderBottomColor: '#ecf0f1',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    meneos: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#d35400',
        marginBottom: 5,
    },
    story: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'Helvetica Neue',
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
    },
});

module.exports = MnmEntrada;
