/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;
// var ReactRedux = require('react-redux/native');
// var Stores = require('./app/Stores');
var Meneame = require('./app/Meneame');

var mnm = React.createClass({
  render: function() {

      // <ReactRedux.Provider store={Stores.store}>
      //   {() => {
      //     return <Meneame />
      //   }}
      // </ReactRedux.Provider>
    return (
      <Meneame />
    );
  }
});

AppRegistry.registerComponent('mnm', () => mnm);
