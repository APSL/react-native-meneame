import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ListView,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  InteractionManager,
  RefreshControl,
  Dimensions
} from 'react-native'
import MnmNewsRow from './MnmNewsRow'
import ThumborURLBuilder from 'thumbor-url-builder'
import { THUMBOR_KEY, THUMBOR_URL} from './ThumborConfig'

const screen = Dimensions.get('window')

var moment = require('moment')
require('moment/locale/es')
moment.locale('es')

class MnmPublicadas extends React.Component {
  getPublicadas: Function;

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      published: [],
      isFetching: false,
    }
    this.getPublicadas = this._getPublicadas.bind(this)
  }

  componentDidMount () {
    this.getPublicadas()
  }

  _getPublicadas() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({isFetching: true})
      fetch(this.props.url)
      .then(response => response.json())
      .then(response => {
        var thumborURL = new ThumborURLBuilder(THUMBOR_KEY, THUMBOR_URL)
        var entries = response.objects.map((entry) => {
          entry.dateFromNow = moment.unix(entry.date).fromNow()
          if (entry.thumb) {
            const imagePath = escape(entry.thumb.substr(8, entry.thumb.length))
            entry.mediaPublished = thumborURL.setImagePath(imagePath).resize(screen.width * screen.scale, 310).smartCrop(true).buildUrl()
          }
          return entry
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(entries),
          published: entries,
          isFetching: false,
        })
      })
      .catch(() => this.setState({isFetching: false}))
    })
  }

  renderRow (rowData, sectionID, rowID, highlightRow) {
    return (
      <MnmNewsRow key={`news${rowID}`} entry={rowData} navigator={this.props.navigator} />
    )
  }

  _renderList() {
    if (this.state.published.length > 0) {
      return (
        <ListView style={styles.list}
          initialListSize={5}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.getPublicadas}
            />
          }
        />
      )
    } else {
      if (Platform.OS === 'ios') {
        return (
          <ActivityIndicatorIOS
            style={styles.centering}
            animating={true}
            color="#262626"
            size="large"
          />
        )
      }
      return (
        <View style={styles.centering}>
          <ProgressBarAndroid style={styles.progressBar} color="#d35400" />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  progressBar: {
    width: 50,
    height: 50,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  list: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  }
})

module.exports = MnmPublicadas
