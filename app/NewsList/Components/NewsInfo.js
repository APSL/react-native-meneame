/* @flow */

import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import shallowCompare from 'react-addons-shallow-compare'
import { MNM_ORANGE, MNM_GREY } from '../../Colors'

const iconSize: number = 24

class NewsInfo extends React.Component {
  state: Object;

  static propTypes = {
    votes: PropTypes.number.isRequired,
    negatives: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    section: PropTypes.string,
    date: PropTypes.string.isRequired,
  };

  shouldComponentUpdate (nextProps: Object, nextState: Object): bool {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const { votes, negatives, comments, section, date } = this.props
    let dateText = 'Publicada'
    if (section === 'Nuevas') {
      dateText = 'Enviada'
    }
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.meneos}>
          {votes}
        </Text>
        <Ionicon
          name='ios-arrow-round-up'
          size={iconSize}
          style={styles.arrowIcons}
        />
        <Text style={styles.negatives}>
          {negatives}
        </Text>
        <Ionicon
          name='ios-arrow-round-down'
          size={iconSize}
          style={styles.arrowIcons}
        />
        <Text style={styles.commentsText}>
          {comments}
        </Text>
        <EvilIcon
          name='comment'
          size={iconSize}
          style={styles.commentsIcon}
        />
        <Text style={styles.pubDate}>
          {dateText} {date}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  meneos: {
    color: MNM_ORANGE,
    fontSize: 14,
    fontWeight: '300',
    marginRight: 5,
  },
  arrowIcons: {
    color: MNM_ORANGE,
    marginRight: 10,
  },
  negatives: {
    color: MNM_ORANGE,
    fontSize: 14,
    fontWeight: '300',
    marginRight: 5,
  },
  commentsText: {
    color: MNM_GREY,
    fontSize: 14,
    fontWeight: '300',
  },
  commentsIcon: {
    color: MNM_GREY,
  },
  pubDate: {
    flex: 1,
    color: MNM_GREY,
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'right',
  },
})

export default NewsInfo
