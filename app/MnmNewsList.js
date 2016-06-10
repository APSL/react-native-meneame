import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    ListView,
    ActivityIndicatorIOS,
} from 'react-native'

var MnmNewsRow = require('./MnmNewsRow');

var screen = require('Dimensions').get('window');

var moment = require('moment');
require('moment/locale/es');
moment.locale('es');

var ThumborURLBuilder = require('thumbor-url-builder');
import { THUMBOR_KEY, THUMBOR_URL} from './ThumborConfig'


class MnmPublicadas extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            published: []
        };
    }

    componentDidMount () {
      this._getPublicadas();
    }

    _getPublicadas() {
        fetch(this.props.url)
        .then(response => response.json())
        .then(response => {
            var thumborURL = new ThumborURLBuilder(THUMBOR_KEY, THUMBOR_URL);
            var entries = response.objects.map((entry) => {
                entry.dateFromNow = moment.unix(entry.date).fromNow();
                if (entry.thumb) {
                    var imagePath = entry.thumb.substr(8, entry.thumb.length);
                    entry.mediaPublished = thumborURL.setImagePath(imagePath).resize(screen.width * screen.scale, 310).smartCrop(true).buildUrl();
                }
                return entry;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(entries),
                published: entries
            });
        });
    }

    renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <MnmNewsRow key={`news${rowID}`} entry={rowData} navigator={this.props.navigator} />
        );
    }

  _renderList() {
    if (this.state.published.length > 0) {
      return (
        <ListView style={styles.list}
          initialListSize={5}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
        />
      )
    } else {
      return (
        <ActivityIndicatorIOS
          style={styles.centering}
          animating={true}
          color="#262626"
          size="large" />
      )
    }
  }

    render() {
      return (
          <View style={styles.container}>
              {this._renderList()}
          </View>
      );
    }
}

var styles = StyleSheet.create({
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
});

module.exports = MnmPublicadas;
