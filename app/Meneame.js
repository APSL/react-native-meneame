import React from 'react'
import { StyleSheet, Image, Text, Dimensions } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Menu } from 'react-native-section-menu'

import {
  MnmSectionPortada,
  MnmSectionNuevas,
  MnmSectionPopulares,
  MnmSectionMasVisitadas,
  MnmSectionDestacadas,
} from './MnmSections'


const MnmAndroidHeader = (props) =>
  <Image source={require('./img/header.png')} style={styles.headerContainer} resizeMode="cover">
    <Text style={styles.headerText}>Menéame</Text>
    <Text style={styles.versionText}>Versión 1.0</Text>
  </Image>

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: Dimensions.get('window').width - 56,
    height: ((Dimensions.get('window').width - 56) * 9) / 16,
    backgroundColor: 'coral',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginLeft: 14,
    marginBottom: 4,
  },
  versionText : {
    color: 'white',
    fontSize: 14,
    marginLeft: 14,
    marginBottom: 8,
  }
})


class Meneame extends React.Component {
  render () {
    const androidIconSize = 18
    const iOSiconSize = 30
    let itemId = 0
    const header = <MnmAndroidHeader />

    return (
      <Menu barTintColor="black" tintColor="#d35400" initialEntry={0}
        header={header}
        entries={[
          {
            id: itemId++,
            title: 'Portada',
            element: <MnmSectionPortada />,
            androidIcon: <MaterialIcons name="description" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-paper-outline',
            selectedIconName: 'ios-paper',
            iconSize: iOSiconSize,
          },
          {
            id: itemId++,
            title: 'Nuevas',
            element: <MnmSectionNuevas />,
            androidIcon: <MaterialIcons name="access-time" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-time-outline',
            selectedIconName: 'ios-time',
            iconSize: iOSiconSize,
          },
          {
            id: itemId++,
            title: 'Populares',
            element: <MnmSectionPopulares />,
            androidIcon: <MaterialIcons name="favorite" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-heart-outline',
            selectedIconName: 'ios-heart',
            iconSize: iOSiconSize,
          },
          {
            id: itemId++,
            title: 'Más visitadas',
            element: <MnmSectionMasVisitadas />,
            androidIcon: <MaterialIcons name="whatshot" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-flame-outline',
            selectedIconName: 'ios-flame',
            iconSize: iOSiconSize,
          },
          {
            id: itemId++,
            title: 'Destacadas',
            element: <MnmSectionDestacadas />,
            androidIcon: <MaterialIcons name="grade" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-star-outline',
            selectedIconName: 'ios-star',
            iconSize: iOSiconSize,
          },
        ]}
      />
    )
  }
}

export default Meneame
