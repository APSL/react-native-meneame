/*jshint esnext: true*/
/*global require, module, fetch*/

'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    PixelRatio,
    View,
    Text,
    ActivityIndicatorIOS,
    ListView
} from 'react-native'

import HTMLView from 'react-native-htmlview'

var moment = require('moment');
var Icon = require('react-native-vector-icons/EvilIcons');


class MnmComments extends Component {
    constructor(props) {
      super(props);
      var dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      });
      this.state = {
        dataSource: dataSource.cloneWithRows([]),
        rows: []
      };
      this._getComments();
    }

    _getComments() {
        fetch('https://www.meneame.net/api/list?id=' + this.props.entryId)
        .then(response => response.json())
        .then(response => {
            var comments = [];
            response.objects.forEach((comment) => {
                comment.date = moment.unix(comment.date);
                comment.fromNow = comment.date.fromNow();
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

    renderRow(rowData) {
      return (
        <View style={styles.cellContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{rowData.user}</Text>
            <Icon style={styles.icon} name='like' size={20}
                color='#95a5a6'/>
            <Text style={styles.votes}>{rowData.votes}</Text>
            <Icon style={styles.iconKarma} name='heart' size={20}
                color='#95a5a6'/>
            <Text style={styles.karma}>{rowData.karma}</Text>
            <Text style={styles.date}>{rowData.fromNow}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.commentNumber}>#{rowData.order}</Text>
            <Text style={styles.comment}>
              <HTMLView value={rowData.content} stylesheet={htmlStyles} />
            </Text>
          </View>
        </View>
      );
    }

  _renderList() {
    if (this.state.rows.length > 0) {
      return (
        <ListView style={styles.navcomments}
          contentInset={{bottom: 49}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
        />
      )
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          style={styles.centering}
          color='#262626'
        />
      )
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
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
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
        flex: 4,
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
        fontSize: 14,
    },
    comment: {
        marginLeft: 3,
        flex: 1,
        color: '#7f8c8d',
        fontWeight: '300',
        fontSize: 14,
    },
    centering: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
    },
});

const htmlStyles = StyleSheet.create({
  b: {
    fontWeight: '600',
  }
})

module.exports = MnmComments;
