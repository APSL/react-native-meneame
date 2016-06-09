import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigatorWrapper } from 'react-native-navigator-wrapper'

import mnmRouteMapper from './MnmRouteMapper'
import MnmNewsList from './MnmNewsList'

export function MnmSectionPortada({openMenu}) {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/'},
        title: 'Portada',
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
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?status=queued'},
        title: 'Nuevas',
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
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?popular'},
        title: 'Populares',
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
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?top_visited'},
        title: 'Más visitadas',
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
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?active'},
        title: 'Destacadas',
      }}
      navBarStyle={styles.navBarStyle}
      routeMapper={mnmRouteMapper(openMenu)}
    />
  )
}

const styles = StyleSheet.create({
  navBarStyle: {backgroundColor: '#FAFAFA'}
})
