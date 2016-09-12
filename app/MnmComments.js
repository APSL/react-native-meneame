/*jshint esnext: true*/
/*global require, module, fetch*/

import React from 'react'
import {
  StyleSheet,
  Platform,
  PixelRatio,
  View,
  Text,
  ActivityIndicator,
  ProgressBarAndroid,
  ListView,
  RefreshControl,
  InteractionManager
} from 'react-native'
import HTMLView from 'react-native-htmlview'
var moment = require('moment')
var Icon = require('react-native-vector-icons/EvilIcons')

class MnmComments extends React.Component {
  getComments: Function;

  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      rows: [],
      isFetching: false,
    }
    this.getComments = this._getComments.bind(this)
  }

  componentDidMount () {
    this.getComments()
  }

  _getComments () {
    InteractionManager.runAfterInteractions(() => {
      this.setState({isFetching: true})
      fetch('https://www.meneame.net/api/list?id=' + this.props.entryId)
      .then(response => response.json())
      .then(response => {
        const comments = response.objects.map((comment) => {
          comment.date = moment.unix(comment.date)
          comment.fromNow = comment.date.fromNow()
          return comment
        })
        .sort((c1, c2) => {
          if (c1.order < c2.order) {
            return -1;
          } else {
            return 1;
          }
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(comments),
          rows: comments,
          isFetching: false,
        })
      })
      .catch(() => this.setState({isFetching: false}))
    })
  }

  renderRow(rowData) {
    return (
      <View style={styles.cellContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{rowData.user}</Text>
          <View style={styles.commentData}>
            <Icon style={styles.icon} name="like" size={20} />
            <Text style={styles.counter}>{rowData.votes}</Text>
            <Icon style={styles.icon} name="heart" size={20} />
            <Text style={styles.counter}>{rowData.karma}</Text>
            <Text style={styles.date}>{rowData.fromNow}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.commentNumber}>#{rowData.order}</Text>
          <Text style={styles.comment}>
            <HTMLView value={rowData.content} stylesheet={htmlStyles} />
          </Text>
        </View>
      </View>
    )
  }

  _renderList () {
    if (this.state.rows.length > 0) {
      return (
        <ListView
          style={styles.navcomments}
          contentInset={{bottom: 49}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.getComments}
            />
          }
        />
      )
    } else {
      if (Platform.OS === 'ios') {
        return (
          <ActivityIndicator
            animating={true}
            style={styles.centering}
            color='#262626'
          />
        )
      }
      return (
        <View style={styles.centering}>
          <ProgressBarAndroid style={styles.progressBar} color="#d35400"/>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this._renderList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#262626',
  },
  commentData: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 20,
    color: '#95a5a6',
  },
  counter: {
    color: '#95a5a6',
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    fontWeight: '300',
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
  progressBar: {
    width: 50,
    height: 50,
  },
})

const htmlStyles = StyleSheet.create({
  b: {
    fontWeight: '600',
  }
})

module.exports = MnmComments
