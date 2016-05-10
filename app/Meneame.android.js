import React from 'react'

import { NavigatorWrapper } from 'react-native-navigator-wrapper'
import mnmRouteMapper from './MnmRouteMapper'

var MnmPublicadas = require('./MnmPublicadas')


class Meneame extends React.Component {
  render () {
    return (
      <NavigatorWrapper
        initialRoute={{
          component: MnmPublicadas,
          passProps: {seccion: 'Portada'},
          title: 'Portada',
        }}
        navBarStyle={{ backgroundColor: '#FAFAFA' }}
        routeMapper={mnmRouteMapper()}
      />
    )
  }
}

export default Meneame
