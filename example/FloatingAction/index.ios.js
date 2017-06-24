/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View
} from 'react-native';

import { FloatingAction } from 'react-native-floating-action';

const FloatingActionExample = () => {
  const actions = [{
    text: 'Accessibility',
    icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_accessibility',
    position: 2
  }, {
    text: 'Select language',
    icon: require('./images/ic_language_white.png'),
    name: 'bt_language',
    position: 1
  }, {
    text: '',
    icon: require('./images/ic_room_white.png'),
    name: 'bt_room',
    position: 3
  }, {
    text: 'Start Video',
    icon: require('./images/ic_videocam_white.png'),
    name: 'bt_videocam',
    position: 4
  }];

  return (
    <View style={styles.container}>
      <Text style={styles.example}>
        Floating Action example
      </Text>
      <FloatingAction
        actions={actions}
        onPressItem={
          (name) => {
            Alert.alert('Icon pressed', `the icon ${name} was pressed`);
          }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  example: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('FloatingAction', () => FloatingActionExample);
