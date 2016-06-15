import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

class MnmEntradaInfo extends Component {
  render() {
    const e = this.props.entry;
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.dataContainer}>
            <MaterialIcon style={[styles.icon, styles.upArrow]} name="arrow-upward" size={iconSize} />
            <Text style={[styles.iconText, styles.meneos]}>{e.votes} meneos</Text>
          </View>
          <View style={styles.dataContainer}>
            <MaterialIcon style={styles.icon} name="arrow-downward" size={iconSize} />
            <Text style={styles.iconText}>{e.negatives} negativos</Text>
          </View>
          <View style={styles.dataContainer}>
            <MaterialIcon style={styles.icon} name="favorite" size={iconSize} />
            <Text style={styles.iconText}>{e.karma} karma</Text>
          </View>
          <View style={styles.dataContainer}>
            <MaterialIcon style={styles.icon} name="comment" size={iconSize} />
            <Text style={styles.iconText}>{e.comments} comentarios</Text>
          </View>
          <View style={styles.dataContainer}>
            <MaterialIcon style={styles.icon} name="local-offer" size={iconSize} />
            <Text style={styles.iconText}>{e.tags}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <MaterialIcon style={styles.userIcon} name="account-circle" size={40} />
          <Text style={styles.username}>{e.user}</Text>
        </View>
      </View>
    )
  }
}

const iconSize = 24
const mnmColor = '#d35400'
const detailColor = '#95a5a6'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
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
    marginBottom: 5,
  },
  icon: {
    width: 28,
    marginRight: 5,
    color: detailColor,
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
