/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    Component
} = React;
var IonIcon = require('Ionicons');
var EvilIcon = require('EvilIcons');

class MnmEntradaInfo extends Component {
    render() {
        var e = this.props.entry;
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.dataContainer}>
                        <IonIcon style={styles.upArrow} name='ios-arrow-thin-up'
                            size={30} color='#d35400'/>
                        <Text style={styles.meneos}>{e.votes} meneos</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <IonIcon style={styles.downArrow} name='ios-arrow-thin-down'
                            size={30} color='#95a5a6'/>
                        <Text style={styles.negatives}>{e.negatives} negativos</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <EvilIcon style={styles.heart} name='heart'
                            size={30} color='#95a5a6' />
                        <Text style={styles.karma}>{e.karma} karma</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <EvilIcon style={styles.comment} name='comment'
                            size={30} color='#95a5a6' />
                        <Text style={styles.comments}>{e.comments} comentarios</Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <EvilIcon style={styles.tag} name='tag'
                            size={30} color='#95a5a6' />
                        <Text style={styles.categories}>{e.tags}</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <EvilIcon style={styles.userIcon} name='user'
                        size={50} color='#95a5a6' />
                    <Text style={styles.username}>{e.user}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 4,
        flexDirection: 'column',
        marginBottom: 15,
    },
    rightContainer: {
        flex: 2,
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    upArrow: {
        flex: 1,
        bottom: 4,
        justifyContent: 'center',
    },
    meneos: {
        flex: 6,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        color: '#d35400',
    },
    downArrow: {
        flex: 1,
        bottom: 4,
        justifyContent: 'center',
    },
    negatives: {
        flex: 6,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        color: '#95a5a6',
    },
    heart: {
        flex: 1,
        bottom: 8,
        justifyContent: 'center',
    },
    karma: {
        flex: 6,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        color: '#95a5a6',
    },
    comment: {
        flex: 1,
        bottom: 8,
        justifyContent: 'center',
    },
    comments: {
        flex: 6,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        color: '#95a5a6',
    },
    tag: {
        flex: 1,
        bottom: 4,
        justifyContent: 'center',
    },
    categories: {
        flex: 6,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        color: '#95a5a6',
    },
    userIcon: {
        justifyContent: 'center',
        marginBottom: 4,
    },
    username: {
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        textAlign: 'center',
    },
});

module.exports = MnmEntradaInfo;
