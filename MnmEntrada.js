'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    SegmentedControlIOS,
    Component
} = React;
var moment = require('moment');
var ParallaxView = require('react-native-parallax-view');

class MnmEntrada extends Component {
    render() {
        var entrada = this.props.entrada;
        // Use header later
        // header={(
        //     <View style={styles.header}>
        //         <Text style={styles.headerTitle}>
        //             {entrada.title}
        //         </Text>
        //     </View>
        // )}
        return (
            <ParallaxView
                backgroundSource={{uri: entrada.media}}
                windowHeight={100}>
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
});

module.exports = MnmEntrada;
