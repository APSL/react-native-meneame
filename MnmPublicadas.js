/*jshint esnext: true*/
/*global require, module, fetch*/

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
    StatusBarIOS,
    Component
} = React;

var screen = require('Dimensions').get('window');
var moment = require('moment');
var Icon = require('react-native-vector-icons/EvilIcons');
var ThumborURLBuilder = require('thumbor-url-builder');

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
        StatusBarIOS.setStyle('default')
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            published: []
        };
        this._getPublicadas();
    }

    _getPublicadas() {
        var url = 'https://www.meneame.net/api/list';
        if (this.props.section === 'Nuevas') {
            url = url + '/?status=queued';
        } else if (this.props.section === 'Destacadas') {
            url = url + '/?active';
        } else if (this.props.section === 'Populares') {
            url = url + '/?popular';
        } else if (this.props.section === 'Más visitadas') {
            url = url + '/?top_visited';
        }
        fetch(url)
        .then(response => response.json())
        .then(response => {
            var thumborURL = new ThumborURLBuilder('ozaDuG6du4dahvae2ahhu7quo5pip3ca', 'http://thumbormeneame.eduherraiz.com');
            var entries = response.objects.map((entry) => {
                entry.dateFromNow = moment.unix(entry.date).fromNow();
                if (entry.thumb) {
                    var imagePath = entry.thumb.substr(8, entry.thumb.length);
                    entry.mediaPublished = thumborURL.setImagePath(imagePath).resize(screen.width * screen.scale, 310).smartCrop(true).buildUrl();
                }
                return entry;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(entries),
                published: entries
            });
        });
    }

    rowPressed(entry) {
        this.props.navigator.push({
            component: MnmEntrada,
            passProps: {entrada: entry},
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
                        <Text style={styles.meneos}>{rowData.votes} ↑</Text>
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
            return <ListView style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        automaticallyAdjustContentInsets={false}
                    />;
        } else {
          return
            <ActivityIndicatorIOS
          style={styles.centering}
                        animating={true}
                        color='#262626'
                        size='large'
                    />;
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
        fontSize: 14,
        fontWeight: '300',
        marginRight: 10,
    },
    negatives: {
        flex: 1,
        color: '#e74c3c',
        fontSize: 14,
        fontWeight: '300',
    },
    comments: {
        flex: 1,
        flexDirection: 'row',
    },
    commentsText: {
        color: '#95a5a6',
        fontSize: 14,
        fontWeight: '300',
    },
    commentsIcon: {
        bottom: 3,
    },
    pubDate: {
        flex: 5,
        color: '#95a5a6',
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
        fontWeight: '300',
        fontSize: 20,
        marginTop: 5,
    },
});

module.exports = MnmPublicadas;
