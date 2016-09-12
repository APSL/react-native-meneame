import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import Button from 'react-native-button'
import ParallaxView from 'react-native-parallax-view'
import ThumborURLBuilder from 'thumbor-url-builder'
import { THUMBOR_KEY, THUMBOR_URL } from '../../ThumborConfig'
import MnmEntryTextAndDetails from '../../NewsDetail/Components/MnmEntryTextAndDetails'
import MnmComments from '../../MnmComments'
import MnmWebviewEntry from '../../MnmWebviewEntry'
import { BrowserButton } from '../../MnmRouteMapper'

const screen = Dimensions.get('window')

class NavButton extends React.Component {
  render() {
    return (
      <Button style={styles.button} onPress={this.props.onPress}>
        {this.props.text}
      </Button>
    )
  }
}

class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    const thumborURL = new ThumborURLBuilder(THUMBOR_KEY, THUMBOR_URL);
    if (this.props.entrada.thumb) {
      const entry = this.props.entrada;
      const imagePath = escape(entry.thumb.substr(8, entry.thumb.length))
      this.props.entrada.mediaHeader = thumborURL.setImagePath(imagePath).resize(screen.width * screen.scale, screen.height).smartCrop(true).buildUrl();
    }
    this.state = {
      value: 'Noticia'
    }
  }

  _titlePressed() {
    const URL = this.props.entrada.go
    this.props.navigator.push({
      title: this.props.entrada.from,
      component: MnmWebviewEntry,
      passProps: {uri: URL},
      rightElement: <BrowserButton url={URL} />
    })
  }

  render() {
    const entrada = this.props.entrada
    const backgroundSource = entrada.mediaHeader ? {uri: entrada.mediaHeader} : null
    return (
      <ParallaxView
        backgroundSource={backgroundSource}
        windowHeight={250}
        style={{backgroundColor: '#FAFAFA'}}
        contentInset={{bottom: 49}}>
        <View style={styles.container}>
          <View style={styles.info}>
            <TouchableHighlight
              onPress={this._titlePressed.bind(this)}
              underlayColor={'#FAFAFA'}>
              <Text style={styles.title}>{entrada.title}</Text>
            </TouchableHighlight>
            <Text style={styles.from}>{entrada.from}</Text>
          </View>
          <MnmEntryTextAndDetails entry={entrada} />
          <NavButton onPress={() => {
              this.props.navigator.push({
                title: 'Comentarios',
                component: MnmComments,
                sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
                passProps: {entryId: entrada.id}
              })
            }} text={'Comentarios (' + entrada.comments + ')'}
            style={styles.button}/>
        </View>
      </ParallaxView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  info: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  title: {
    fontWeight: '300',
    color: '#262626',
    fontSize: 20,
  },
  from: {
    fontWeight: '300',
    color: '#7f8c8d',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    color: '#d35400',
    marginTop: 10,
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
})

module.exports = NewsDetail
