/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    PixelRatio,
    Image,
    Text,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component
} = React;

var screen = require('Dimensions').get('window');
var moment = require('moment');
var Icon = require('EvilIcons');
var RefreshableListView = require('react-native-refreshable-listview');

var MnmEntrada = require('./MnmEntrada');

class MnmEntryDate extends Component {
    render() {
        var dateText = 'Publicada';
        if (this.props.section === 'Nuevas') {
            dateText = 'Enviada';
        }
        return (
            <Text style={styles.pubDate}>{dateText} {this.props.date}</Text>
        );
    }
}

class MnmPublicadas extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            published: []
        };
        this._getPublicadas();
    }

    calculateStarredPoints(entry, now: Date) {
        // Taken from: https://github.com/gallir/Meneame/blob/96ea1d7d3ca0fdbce3243b75b4d4bc92806dfd5f/www/libs/html1.php
        return (entry.meneos - entry.negatives * 2) * (1 - (now.getTime() - new Date(entry.date).getTime()) * 0.8 / 129600);
    }

    _getPublicadas() {
        var url = 'https://morning-headland-2952.herokuapp.com';
        if (this.props.section === 'Nuevas') {
            url = url + '/queued/';
        }
        var self = this;
        fetch(url)
        .then(response => response.json())
        .then(response => {
            // var localMoment = moment();
            // localMoment.locale('es');
            var nowDate = new Date();
            var entries = response.entries.map((entry) => {
                entry.dateFromNow = moment(entry.date).fromNow();
                entry.meneos = parseInt(entry.meneos);
                entry.clicks = parseInt(entry.clicks);
                entry.negatives = parseInt(entry.negatives);
                entry.karma = parseInt(entry.karma);
                if (entry.media) {
                    entry.mediaPublished = 'http://thumbor.eduherraiz.com/unsafe/' + (screen.width * 2) + 'x310/smart/' + entry.media.substr(8, entry.media.length);
                }
                entry.starredPoints = self.calculateStarredPoints(entry, nowDate);
                return entry;
            });
            var section = this.props.section;
            entries.sort((p1, p2) => {
                if (section === 'Populares') {
                    if (p1.meneos > p2.meneos) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else if (section === 'Más visitadas') {
                    if (p1.clicks > p2.clicks) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else if (section === 'Destacadas') {
                    if (p1.starredPoints > p2.starredPoints) {
                        return 1;
                    } else {
                        return -1;
                    }
                } else {
                    if (new Date(p1.date).getTime() > new Date(p2.date).getTime()) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(entries),
                published: response.entries
            });
        });
    }

    rowPressed(entry) {
        this.props.navigator.push({
            title: 'Artículo',
            component: MnmEntrada,
            passProps: {entrada: entry}
        });
    }

    renderImage(entry) {
        if (entry.mediaPublished) {
            return (
                <View style={styles.imgContainer}>
                    <Image source={{uri: entry.mediaPublished}} style={styles.image}/>
                </View>
            );
        }
    }

    renderRow(rowData) {
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
                        <MnmEntryDate section={this.props.section}
                            date={rowData.dateFromNow}/>
                    </View>
                    {this.renderImage(rowData)}
                    <View style={styles.titleContent}>
                        <Text style={styles.title}>
                            {rowData.title}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    _renderList() {
        if (this.state.published.length > 0) {
            // return <RefreshableListView
            //             loadData={this._getPublicadas}
            //             style={styles.list}
            //             dataSource={this.state.dataSource}
            //             renderRow={this.renderRow.bind(this)}/>;
            return <ListView style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>;
        } else {
            return <ActivityIndicatorIOS
                        animating={true}
                        style={styles.centering}
                        color='#262626'
                        size='large'/>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderList()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    list: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 25,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        borderBottomColor: '#BDC3C7',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    meneos: {
        color: '#d35400',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        marginRight: 10,
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
        resizeMode: 'cover',
        backgroundColor: '#222',
    },
    titleContent: {
        flex: 1,
    },
    title: {
        flex: 1,
        color: '#262626',
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        fontSize: 20,
        marginTop: 5,
    },
});

module.exports = MnmPublicadas;
