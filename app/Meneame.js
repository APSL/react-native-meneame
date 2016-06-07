import React from 'react'
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
    const androidIconSize = 16
    const iOSiconSize = 30

    return (
      <Menu barTintColor="black" tintColor="#d35400" initialEntry={0}
        entries={[
          {
            id: 0,
            title: 'Portada',
            element: <MnmSectionPortada />,
            androidIcon: <Ionicon name="ios-paper" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-paper-outline',
            selectedIconName: 'ios-paper',
            iconSize: iOSiconSize,
          },
          {
            id: 1,
            title: 'Nuevas',
            element: <MnmSectionNuevas />,
            androidIcon: <Ionicon name="ios-time" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-time-outline',
            selectedIconName: 'ios-time',
            iconSize: iOSiconSize,
          },
          {
            id: 2,
            title: 'Populares',
            element: <MnmSectionPopulares />,
            androidIcon: <Ionicon name="ios-heart" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-heart-outline',
            selectedIconName: 'ios-heart',
            iconSize: iOSiconSize,
          },
          {
            id: 3,
            title: 'Más visitadas',
            element: <MnmSectionMasVisitadas />,
            androidIcon: <Ionicon name="ios-flame" size={androidIconSize} />,
            itemComponent: Ionicon.TabBarItem,
            iconName: 'ios-flame-outline',
            selectedIconName: 'ios-flame',
            iconSize: iOSiconSize,
          },
          {
            id: 4,
            title: 'Destacadas',
            element: <MnmSectionDestacadas />,
            androidIcon: <Ionicon name="ios-star" size={androidIconSize} />,
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
