import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

import Property from '../components/Property';

class FloatingActionChangeActionColor extends PureComponent {
  static navigationOptions = {
    title: 'Right position'
  };

  render() {
    const actions = [{
      text: 'Accessibility',
      icon: require('../images/ic_accessibility_white.png'),
      name: 'bt_accessibility',
      position: 2,
      textColor: '#FFF',
      textBackground: '#000'
    }, {
      text: 'Language',
      icon: require('../images/ic_language_white.png'),
      name: 'bt_language',
      position: 1,
      textColor: '#FFF',
      textBackground: '#000'
    }, {
      text: 'Location',
      icon: require('../images/ic_room_white.png'),
      name: 'bt_room',
      position: 3,
      textColor: '#FFF',
      textBackground: '#000'
    }, {
      text: 'Video',
      icon: require('../images/ic_videocam_white.png'),
      name: 'bt_videocam',
      position: 4,
      textColor: '#FFF',
      textBackground: '#000'
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="position"
            propertyValue="right"
            defaultValue="right"
          />
          <FloatingAction
            actions={actions}
            position="right"
            onPressItem={
              (name) => {
                Alert.alert('Icon pressed', `the icon ${name} was pressed`);
              }
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default FloatingActionChangeActionColor;
