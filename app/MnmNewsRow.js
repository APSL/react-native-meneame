/* @flow */

import React from 'react'
import {
  StyleSheet,
  View,
  PixelRatio,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native'

var EvilIcons = require('react-native-vector-icons/EvilIcons');
var Ionicons = require('react-native-vector-icons/Ionicons');
var screen = require('Dimensions').get('window');
var MnmEntrada = require('./MnmEntrada');
import { BrowserButton } from './MnmRouteMapper'


class MnmEntryDate extends React.Component {
  render() {
    let dateText = 'Publicada'
    if (this.props.section === 'Nuevas') {
      dateText = 'Enviada'
    }
    return (
      <Text style={styles.pubDate}>
        {dateText} {this.props.date}
      </Text>
    )
  }
}

class MnmPublicadasRow extends React.Component {
  renderImage(entry) {
    if (entry.mediaPublished) {
      return (
        <View style={styles.imgContainer}>
          <Image source={{uri: entry.mediaPublished}} style={styles.image}/>
        </View>
      );
    }
  }

  rowPressed(entry) {
    this.props.navigator.push({
      title: 'Noticia',
      component: MnmEntrada,
      passProps: {entrada: entry},
      rightElement: <BrowserButton url={entry.go} />,
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(this.props.entry)}
        underlayColor={'#FAFAFA'}>
        <View style={styles.rowContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.meneos}>{this.props.entry.votes}</Text>
            <Ionicons name="ios-arrow-round-up" size={iconSize} style={styles.arrowIcons} />

            <Text style={styles.negatives}>{this.props.entry.negatives}</Text>
            <Ionicons name="ios-arrow-round-down" size={iconSize} style={styles.arrowIcons} />

            <Text style={styles.commentsText}>{this.props.entry.comments}</Text>
            <EvilIcons name="comment" size={iconSize} style={styles.commentsIcon} />

            <MnmEntryDate section={this.props.section} date={this.props.entry.dateFromNow} />
          </View>
          {this.renderImage(this.props.entry)}
          <View style={styles.titleContent}>
            <Text style={styles.title}>
              {this.props.entry.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const iconSize = 24

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
  infoContainer: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  meneos: {
    color: '#d35400',
    fontSize: 14,
    fontWeight: '300',
    marginRight: 5,
  },
  negatives: {
    color: '#d35400',
    fontSize: 14,
    fontWeight: '300',
    marginRight: 5,
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
    color: '#95a5a6',
  },
  arrowIcons: {
    color: '#d35400',
    marginRight: 10,
  },
  pubDate: {
    flex: 5,
    color: '#95a5a6',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'right',
  },
  imgContainer: {
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
    padding: 5,
  },
});

module.exports = MnmPublicadasRow;
