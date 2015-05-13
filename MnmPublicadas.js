'use strict';

var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
    Text,
    ListView,
    Component
} = React;

class MnmPublicadas extends Component {
    constructor(props) {
        super(props);
        var dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
        this.state = {
            dataSource: dataSource.cloneWithRows([])
        };
        this._getPublicadas();
    }

    _getPublicadas() {
        fetch('https://morning-headland-2952.herokuapp.com')
        .then(response => response.json())
        .then(response => {
            console.log(response.entries);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(response.entries)
            })
        });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.meneos}>{rowData.meneos}</Text>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>
                        {rowData.title}
                    </Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <ListView dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}/>
        )
    }
}

var styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    meneos: {
        color: '#d35400',
        fontFamily: 'Helvetica Neue',
        width: 80,
        height: 80,
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        marginLeft: 5,
        marginTop: 5
    },
    titleContent: {
        marginBottom: 5,
        flex: 1
    }
});

module.exports = MnmPublicadas;
