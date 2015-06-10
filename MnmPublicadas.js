/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    ListView,
    TouchableHighlight,
    Component
} = React;
var screen = require('Dimensions').get('window');
var moment = require('moment');
var Icon = require('EvilIcons');

var MnmEntrada = require('./MnmEntrada');

class MnmPublicadas extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([])
        };
        this._getPublicadas();
    }

    _getPublicadas() {
        fetch('https://morning-headland-2952.herokuapp.com')
        .then(response => response.json())
        .then(response => {
            response.entries.map(function (entry) {
                var date = new Date(entry.date[0], entry.date[1], entry.date[2], entry.date[3], entry.date[4], entry.date[5]);
                entry.date = moment().calendar(date);
                if (entry.media) {
                    entry.mediaPublished = 'http://thumbor.eduherraiz.com/unsafe/' + (screen.width * 2) + 'x310/smart/' + entry.media.substr(8, entry.media.length);
                }
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(response.entries)
            });
        });
    }

    rowPressed(entrada) {
        this.props.navigator.push({
            title: 'Artículo',
            component: MnmEntrada,
            passProps: {entrada: entrada}
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight
                onPress={() => this.rowPressed(rowData)}
                underlayColor={'#FAFAFA'}>
                <View style={styles.rowContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.meneos}>{rowData.meneos} ↑</Text>
                        <Text style={styles.negatives}>{rowData.negatives} ↓</Text>
                        <View style={styles.comments}>
                            <Text style={styles.commentsText}>{rowData.comments}</Text>
                            <Icon style={styles.commentsIcon} name='comment'
                                size={20} color='#95a5a6'/>
                        </View>
                        <Text style={styles.pubDate}>Publicada el {rowData.date}</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <Image source={{uri: rowData.mediaPublished}}
                            resizeMode='cover' style={styles.image}/>
                    </View>
                    <View style={styles.titleContent}>
                        <Text style={styles.title}>
                            {rowData.title}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView style={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        );
    }
}

var styles = StyleSheet.create({
    list: {
        backgroundColor: '#FAFAFA',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 25,
        marginLeft: 10,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    meneos: {
        flex: 1,
        color: '#d35400',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
    },
    negatives: {
        flex: 1,
        color: '#e74c3c',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
    },
    comments: {
        flex: 1,
        flexDirection: 'row',
    },
    commentsText: {
        color: '#95a5a6',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
    },
    commentsIcon: {
        bottom: 3,
    },
    pubDate: {
        flex: 5,
        color: '#95a5a6',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'right',
    },
    imgContainer: {
        flex: 1,
        height: 155,
        width: screen.width - 20,
        marginBottom: 10,
    },
    image: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 3,
    },
    titleContent: {
        flex: 1,
    },
    title: {
        flex: 1,
        color: '#262626',
        // fontFamily: 'Bodoni 72 Oldstyle',
        // fontFamily: 'Damascus',
        fontFamily: 'Helvetica Neue',
        fontWeight: '300', //'bold',
        fontSize: 20,
        marginTop: 5,
    },
});

module.exports = MnmPublicadas;