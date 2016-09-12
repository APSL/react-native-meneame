/* @flow */

import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigatorWrapper } from 'react-native-navigator-wrapper'
import mnmRouteMapper, { AboutUsButton } from './MnmRouteMapper'
import NewsList from './NewsList/Components/NewsList'

export function MnmSectionPortada({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: NewsList,
        passProps: {url: 'https://www.meneame.net/api/list/'},
        title: 'Portada',
        rightElement: <AboutUsButton />,
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

export function MnmSectionNuevas({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: NewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?status=queued'},
        title: 'Nuevas',
        rightElement: <AboutUsButton />,
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

export function MnmSectionPopulares({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: NewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?popular'},
        title: 'Populares',
          rightElement: <AboutUsButton />,
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

export function MnmSectionMasVisitadas({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: NewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?top_visited'},
        title: 'Más visitadas',
        rightElement: <AboutUsButton />,
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

export function MnmSectionDestacadas({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: NewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?active'},
        title: 'Destacadas',
        rightElement: <AboutUsButton />,
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

const styles = StyleSheet.create({
  navBarStyle: {
    backgroundColor: '#FAFAFA'
  }
})
