import React, { Component } from 'react'
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
  SegmentedControlIOS,
} from 'react-native'

import HTMLView from 'react-native-htmlview'

var MnmEntradaInfo = require('./MnmEntradaInfo')


export default class MnmEntryTextAndDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 'Noticia'}
  }

  _renderSegmented() {
    if (this.state.value === 'Noticia') {
      return (
        <Text style={styles.story}>
          <HTMLView value={this.props.entry.content} stylesheet={htmlStyles}/>
        </Text>
      )
    }
    return <MnmEntradaInfo entry={this.props.entry}/>
  }

  render() {
    return (
      <View style={styles.info}>
        <SegmentedControlIOS
            values={['Noticia', 'Detalles']}
            tintColor={'#d35400'}
            selectedIndex={0}
            style={styles.segmented}
            onValueChange={ value => { this.setState({value: value}) } }/>
        {this._renderSegmented()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  story: {
    margin: 20,
    color: '#7f8c8d',
    fontSize: 14,
  },
  info: {
    borderBottomColor: '#7f8c8d',
    borderBottomWidth: 1 / PixelRatio.get(),
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 10,
  },
  segmented: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
})

const htmlStyles = StyleSheet.create({
  b: {
    fontWeight: '600',
  }
})
