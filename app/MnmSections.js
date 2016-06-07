import React from 'react'

import { NavigatorWrapper } from 'react-native-navigator-wrapper'

import mnmRouteMapper from './MnmRouteMapper'
import MnmNewsList from './MnmNewsList'

const navBarStyle = {backgroundColor: '#FAFAFA'}
const routeMapper = mnmRouteMapper()

export const MnmSectionPortada = () => {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/'},
        title: 'Portada',
      }}
      navBarStyle={navBarStyle}
      routeMapper={routeMapper}
    />
  )
}

export function MnmSectionNuevas() {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?status=queued'},
        title: 'Nuevas',
      }}
      navBarStyle={navBarStyle}
      routeMapper={routeMapper}
    />
  )
}

export function MnmSectionPopulares() {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?popular'},
        title: 'Populares',
      }}
      navBarStyle={navBarStyle}
      routeMapper={routeMapper}
    />
  )
}

export function MnmSectionMasVisitadas() {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?top_visited'},
        title: 'Más visitadas',
      }}
      navBarStyle={navBarStyle}
      routeMapper={routeMapper}
    />
  )
}

export function MnmSectionDestacadas() {
  return (
    <NavigatorWrapper
      initialRoute={{
        component: MnmNewsList,
        passProps: {url: 'https://www.meneame.net/api/list/?active'},
        title: 'Destacadas',
      }}
      navBarStyle={navBarStyle}
      routeMapper={routeMapper}
    />
  )
}
