import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    PixelRatio,
    Image,
    Text,
    TouchableHighlight,
} from 'react-native'

var Icon = require('react-native-vector-icons/EvilIcons');
var screen = require('Dimensions').get('window');
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

class MnmPublicadasRow extends Component {
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
          component: MnmEntrada,
          passProps: {entrada: entry},
      });
  }

  render() {
    return (
        <TouchableHighlight
            onPress={() => this.rowPressed(this.props.entry)}
            underlayColor={'#FAFAFA'}>
            <View style={styles.rowContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.meneos}>{this.props.entry.votes} ↑</Text>
                    <Text style={styles.negatives}>{this.props.entry.negatives} ↓</Text>
                    <View style={styles.comments}>
                        <Text style={styles.commentsText}>{this.props.entry.comments}</Text>
                        <Icon style={styles.commentsIcon} name="comment" size={20} color="#95a5a6"/>
                    </View>
                    <MnmEntryDate section={this.props.section}
                        date={this.props.entry.dateFromNow}/>
                </View>
                {this.renderImage(this.props.entry)}
                <View style={styles.titleContent}>
                    <Text style={styles.title}>
                        {this.props.entry.title}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
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

module.exports = MnmPublicadasRow;
