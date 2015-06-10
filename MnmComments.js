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
    TouchableHighlight,
    ActivityIndicatorIOS,
    ListView,
    Component
} = React;
var moment = require('moment');
var Icon = require('EvilIcons');

class MnmComments extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.comment_id !== r2.comment_id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            rows: []
        };
        this._getComments();
    }

    _getComments() {
        fetch('https://morning-headland-2952.herokuapp.com/comments/' + this.props.entryId + '/')
        .then(response => response.json())
        .then(response => {
            var comments = [];
            response.comments.forEach((comment) => {
                comment.order = parseInt(comment.order);
                comment.date = moment(comment.date);
                comment.from_now = comment.date.fromNow();
                comments.push(comment);
            });
            var sortedComments = comments.sort((c1, c2) => {
                if (c1.order < c2.order) {
                    return -1;
                } else {
                    return 1;
                }
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(sortedComments),
                rows: sortedComments
            });
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.cellContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.username}>{rowData.username}</Text>
                    <Icon style={styles.icon} name='like' size={20}
                        color='#95a5a6'/>
                    <Text style={styles.votes}>{rowData.votes}</Text>
                    <Icon style={styles.iconKarma} name='heart' size={20}
                        color='#95a5a6'/>
                    <Text style={styles.karma}>{rowData.karma}</Text>
                    <Text style={styles.date}>{rowData.from_now}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.commentNumber}>#{rowData.order}</Text>
                    <Text style={styles.comment}>{rowData.comment}</Text>
                </View>
            </View>
        );
    }

    _renderList() {
        if (this.state.rows.length > 0) {
            return <ListView style={styles.navcomments}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}/>;
        } else {
            return <ActivityIndicatorIOS
                        animating={true}
                        style={styles.centering}
                        color='#262626'/>;
        }
    }

    render() {
        return(
            <View style={styles.container}>
                {this._renderList()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navcomments: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    cellContainer: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        paddingBottom: 15,
        paddingTop: 5,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    infoContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch',
        marginBottom: 10,
    },
    username: {
        flex: 5,
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        color: '#262626',
    },
    icon: {
        bottom: 3,
    },
    iconKarma: {
        bottom: 3,
        marginLeft: 10,
    },
    votes: {
        color: '#95a5a6',
    },
    karma: {
        color: '#95a5a6',
    },
    date: {
        flex: 3,
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'right',
        color: '#95a5a6',
    },
    textContainer: {
        flexDirection: 'row',
    },
    commentNumber: {
        color: '#d35400',
        fontWeight: '300',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
    },
    comment: {
        marginLeft: 3,
        flex: 1,
        color: '#7f8c8d',
        fontWeight: '300',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
    },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

module.exports = MnmComments;