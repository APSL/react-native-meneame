import React, { Component } from 'react'
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
} from 'react-native'

import { SegmentedControls } from 'react-native-radio-buttons'
import HTMLView from 'react-native-htmlview'

var MnmEntradaInfo = require('./MnmEntradaInfo')

const tabsOptions = ['Noticias', 'Detalles']

export default class MnmEntryTextAndDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {option: tabsOptions[0]}
  }

  _renderOptions() {
    if (this.state.option === tabsOptions[0]) {
      return (
        <Text style={styles.story}>
          <HTMLView value={this.props.entry.content} stylesheet={htmlStyles}/>
        </Text>
      )
    }
    return <MnmEntradaInfo entry={this.props.entry}/>
  }

  render() {
    return <View>
      <SegmentedControls
        options={tabsOptions}
        allowFontScaling={false}
        tint= {'#d35400'}
        selectedTint= {'white'}
        selectedBackgroundColor={'#d35400'}
        backTint= {'white'}
        onSelection={ option => { this.setState({option: option}) } }
        selectedOption={ this.state.option }
      />
      {this._renderOptions()}
    </View>
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
