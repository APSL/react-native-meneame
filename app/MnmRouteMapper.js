import React from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, Linking } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {
  titleRouteMapperGenerator,
  CenteredText,
  NavBarBackButton,
  defaultRouteMapper
} from 'react-native-navigator-wrapper'

export const MenuButton = ({openMenu}) => {
  return (
    <TouchableOpacity style={styles.menuButtonContainer} onPress={openMenu}>
      <MaterialIcons name="menu" size={24} color={navBarColor} />
    </TouchableOpacity>
  )
}

export const BrowserButton = ({url}) => {
  let icon
  if (Platform.OS === 'ios') {
    icon = <FontAwesome name="safari" size={24} color={navBarColor} />
  } else {
    icon = <FontAwesome name="chrome" size={24} color={navBarColor} />
  }

  return (
    <TouchableOpacity style={styles.browserButtonContainer} onPress={() => Linking.openURL(url)}>
      {icon}
    </TouchableOpacity>
  )
}

function leftButtonRouteMapperGenerator (openMenu) {
  return {
    LeftButton: (route, navigator, index, navState) => {
      if (index === 0) {
        return Platform.OS === 'ios' ? null : <MenuButton openMenu={openMenu} />
      }
      return (
        <View style={styles.backButtonContainer}>
          <NavBarBackButton
            onPress={() => navigator.pop()}
            style={{flex: 1}}
            tintColor={navBarColor}
            showBackTitle={false} />
        </View>
      )
    }
  }
}

export default function mnmRouteMapper(openMenu) {
  return {
    ...defaultRouteMapper(),
    ...leftButtonRouteMapperGenerator(openMenu),
    ...titleRouteMapperGenerator(CenteredText, Platform.OS === 'ios' ? styles.titleIos : styles.titleAndroid),
  }
}

const navBarColor = '#d35400'

const styles = StyleSheet.create({
  browserButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  menuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  titleIos: {
    color: navBarColor,
    fontSize: 18,
  },
  titleAndroid: {
    color: navBarColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
})
