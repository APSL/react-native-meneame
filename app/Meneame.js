import React from 'react'
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


class Meneame extends React.Component {
  render () {
    const androidIconSize = 18
    const iOSiconSize = 30

    return (
      <Menu barTintColor="black" tintColor="#d35400" initialEntry={0}
        entries={[
          {
            id: 0,
            title: 'Portada',
            element: <MnmSectionPortada />,
            androidIcon: <MaterialIcons name="description" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-paper-outline',
            selectedIconName: 'ios-paper',
            iconSize: iOSiconSize,
          },
          {
            id: 1,
            title: 'Nuevas',
            element: <MnmSectionNuevas />,
            androidIcon: <MaterialIcons name="access-time" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-time-outline',
            selectedIconName: 'ios-time',
            iconSize: iOSiconSize,
          },
          {
            id: 2,
            title: 'Populares',
            element: <MnmSectionPopulares />,
            androidIcon: <MaterialIcons name="favorite" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-heart-outline',
            selectedIconName: 'ios-heart',
            iconSize: iOSiconSize,
          },
          {
            id: 3,
            title: 'Más visitadas',
            element: <MnmSectionMasVisitadas />,
            androidIcon: <MaterialIcons name="whatshot" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-flame-outline',
            selectedIconName: 'ios-flame',
            iconSize: iOSiconSize,
          },
          {
            id: 4,
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
