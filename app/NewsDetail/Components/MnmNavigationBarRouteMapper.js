/*global require, module*/

'use strict';

import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'

var NavigationBarRouteMapper = {

    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }

        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}>
                <View style={styles.navBarLeftButton}>
                    <Text style={[styles.navBarText, styles.navBarButtonText]}>
                        {previousRoute.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    },

    RightButton: function() {},

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    },
};

var styles = StyleSheet.create({});

module.exports = NavigationBarRouteMapper;
