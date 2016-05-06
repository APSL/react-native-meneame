import React from 'react'

class ListTest extends React.Component {
  render () {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          component: MnmPublicadas,
          passProps: {section: 'Portada'},
          navigationBar:
          <NavigationBar
            title={{
              title: 'Portada',
              tintColor: '#d35400'
            }}
            navigator={{}}
            route={{}}
            customPrev={
              <TouchableHighlight
                onPress={this._openAbout}
                underlayColor='#FFFFFF'
                style={styles.button}>
                <Image source={{uri: 'settings'}} />
              </TouchableHighlight>
            }
            />
        }}
        renderScene={(route, nav) => {
          var props = route.passProps || {}
          props.navigator = nav
          var navBar = route.navigationBar
          if (navBar) {
            navBar = React.cloneElement(navBar, {
              navigator: nav,
              route: route
            })
          }
          var element = React.createElement.bind(this)(
            route.component, props
          )
          return (
            <View style={{flex: 1}}>
              {navBar}
              {element}
            </View>
          )
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig
          }
          return Navigator.SceneConfigs.FloatFromRight
        }}
        />
    )
  }
}

export default ListTest
