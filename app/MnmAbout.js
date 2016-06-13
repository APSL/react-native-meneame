import React, { Component } from 'react'
import {
  Text,
  Image,
  View,
  Linking,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'


class MnmAbout extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => {Linking.openURL('https://www.apsl.net/')}}
        >
          <View style={styles.logoContainer}>
            <Image source={require('./img/apsl.png')} style={styles.image} />
            <Text style={styles.madeBy}>Made with ❤️ by APSL</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {Linking.openURL('http://publicsource.apple.com/license/apsl/')}}
          underlayColor="#FFFFFF"
          style={styles.license}
        >
          <Text style={styles.text}>Released under APSL license, 2015</Text>
        </TouchableHighlight>
        <Text style={styles.text}>Thanks to meneame.net and the React Native community</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  madeBy: {
    fontWeight: '300',
    textAlign: 'center',
  },
  image: {
    width: 75,
    height: 75,
  },
  license: {
    marginTop: 10,
  },
  text: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '300',
    textAlign: 'center',
  }
});

module.exports = MnmAbout;
