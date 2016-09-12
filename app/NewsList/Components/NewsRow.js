/* @flow */

import React, { PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native'
import NewsInfo from './NewsInfo'
import shallowCompare from 'react-addons-shallow-compare'

const width = Dimensions.get('window').width

class MnmPublicadasRow extends React.Component {
  state: Object;
  onRowPressed: Function;

  static propTypes = {
    entry: PropTypes.object.isRequired,
    onNewsPress: PropTypes.func.isRequired,
  }

  constructor (props: Object) {
    super(props)
    this.onRowPressed = this._onRowPressed.bind(this)
  }

  shouldComponentUpdate (nextProps: Object, nextState: Object) {
    return shallowCompare(this, nextProps, nextState)
  }

  _onRowPressed () {
    this.props.onNewsPress(this.props.entry)
  }

  render () {
    const {
      title,
      votes,
      comments,
      negatives,
      dateFromNow,
      mediaPublished
    } = this.props.entry
    return (
      <TouchableHighlight
        onPress={this.onRowPressed}
        underlayColor={'#FAFAFA'}>
        <View style={styles.rowContainer}>
          <NewsInfo
            votes={votes}
            negatives={negatives}
            comments={comments}
            date={dateFromNow}
          />
          {(mediaPublished) ? <Image source={{uri: mediaPublished}} style={styles.image}/> : null}
          <View style={styles.titleContent}>
            <Text style={styles.title}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#BDC3C7',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  comments: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    height: 155,
    width: width - 20,
    marginBottom: 10,
    borderRadius: 3,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    flex: 1,
    color: '#262626',
    fontWeight: '300',
    fontSize: 20,
    padding: 5,
  },
})

module.exports = MnmPublicadasRow
