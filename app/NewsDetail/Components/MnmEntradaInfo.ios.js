/* @flow */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

class MnmEntradaInfo extends React.Component {
  render () {
    const e = this.props.entry
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.dataContainer}>
            <IonIcon style={[styles.icon, styles.ionicIcon, styles.upArrow]} name="ios-arrow-round-up" size={iconSize} />
            <Text style={[styles.iconText, styles.meneos]}>{e.votes} meneos</Text>
          </View>
          <View style={styles.dataContainer}>
            <IonIcon style={[styles.icon, styles.ionicIcon]} name="ios-arrow-round-down" size={iconSize} />
            <Text style={styles.iconText}>{e.negatives} negativos</Text>
          </View>
          <View style={styles.dataContainer}>
            <EvilIcon style={styles.icon} name="heart" size={iconSize} />
            <Text style={styles.iconText}>{e.karma} karma</Text>
          </View>
          <View style={styles.dataContainer}>
            <EvilIcon style={styles.icon} name="comment" size={iconSize} />
            <Text style={styles.iconText}>{e.comments} comentarios</Text>
          </View>
          <View style={styles.dataContainer}>
            <EvilIcon style={styles.icon} name="tag" size={iconSize} />
            <Text style={styles.iconText}>{e.tags}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <EvilIcon style={styles.userIcon} name="user" size={50} />
          <Text style={styles.username}>{e.user}</Text>
        </View>
      </View>
    )
  }
}

const iconSize = 30
const mnmColor = '#d35400'
const detailColor = '#95a5a6'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 15,
  },
  rightContainer: {
    flex: 1,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 28,
    marginRight: 5,
    color: detailColor,
  },
  ionicIcon: {
    paddingLeft: 10,
  },
  upArrow: {
    color: mnmColor,
  },
  iconText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '300',
    color: detailColor,
  },
  meneos: {
    color: mnmColor,
  },
  userIcon: {
    marginBottom: 4,
    color: detailColor,
    textAlign: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
})

module.exports = MnmEntradaInfo
