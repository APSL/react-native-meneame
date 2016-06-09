import React from 'react'
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
  titleRouteMapperGenerator,
  CenteredText,
  NavBarBackButton,
} from 'react-native-navigator-wrapper'

const MenuButton = ({openMenu}) => {
  return (
    <TouchableOpacity style={styles.menuButtonContainer} onPress={openMenu}>
      <MaterialIcons name="menu" size={24} color={menuColor} />
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
            tintColor={menuColor}
            showBackTitle={false} />
        </View>
      )
    }
  }
}

export default function mnmRouteMapper(openMenu) {
  return {
    ...leftButtonRouteMapperGenerator(openMenu),
    RightButton: () => null,
    ...titleRouteMapperGenerator(CenteredText, Platform.OS === 'ios' ? styles.titleIos : styles.titleAndroid)
  }
}

const menuColor = '#d35400'

const styles = StyleSheet.create({
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
    color: menuColor,
    fontSize: 18,
  },
  titleAndroid: {
    color: menuColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
})
