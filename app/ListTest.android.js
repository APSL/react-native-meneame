import React from 'react'
import {
  View,
  Navigator,
  NavigationBar,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native'

var MnmPublicadas = require('./MnmPublicadas');


class ListTest extends React.Component {
  render () {
    return <MnmPublicadas seccion="Portada" />
    // return (
    //   <Navigator
    //     style={styles.container}
    //     initialRoute={{
    //       component: MnmPublicadas,
    //       passProps: {section: 'Portada'},
    //       navigationBar:
    //       <NavigationBar
    //         title={{
    //           title: 'Portada',
    //           tintColor: '#d35400'
    //         }}
    //         navigator={{}}
    //         route={{}}
    //         customPrev={
    //           <TouchableHighlight
    //             onPress={this._openAbout}
    //             underlayColor="#FFFFFF"
    //             style={styles.button}>
    //             <Image source={{uri: 'settings'}} />
    //           </TouchableHighlight>
    //         }
    //         />
    //     }}
    //     renderScene={(route, nav) => {
    //       var props = route.passProps || {}
    //       props.navigator = nav
    //       var navBar = route.navigationBar
    //       if (navBar) {
    //         navBar = React.cloneElement(navBar, {
    //           navigator: nav,
    //           route: route
    //         })
    //       }
    //       var element = require(React.createElement.bind(this)(route.component, props));
    //       return (
    //         <View style={{flex: 1}}>
    //           {navBar}
    //           {element}
    //         </View>
    //       )
    //     }}
    //     configureScene={(route) => {
    //       if (route.sceneConfig) {
    //         return route.sceneConfig
    //       }
    //       return Navigator.SceneConfigs.FloatFromRight
    //     }}
    //     />
    // )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navBar: {
    backgroundColor: '#FAFAFA',
  },
  button: {
    paddingLeft: 5,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    color: '#d35400',
    alignSelf: 'center',
  },
})

export default ListTest
