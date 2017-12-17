import React from 'react';
import { StyleSheet, FlatList, Text, SafeAreaView, TouchableOpacity, Platform, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import FloatingActionRightScreen from './screens/FloatingActionRightScreen';
import FloatingActionLeftScreen from './screens/FloatingActionLeftScreen';
import FloatingActionCenterScreen from './screens/FloatingActionCenterScreen';
import FloatingActionOverrideWithActionScreen from './screens/FloatingActionOverrideWithActionScreen';
import FloatingActionDistanceEdge from './screens/FloatingActionDistanceEdge';
import FloatingActionOverlayScreen from './screens/FloatingActionOverlayScreen';
import FloatingActionColorScreen from './screens/FloatingActionColorScreen';

class App extends React.Component {
  static navigationOptions = {
    title: 'Floating Action'
  };

  renderRow = (highlighted) => {
    if (Platform.OS !== 'android') {
      return <View style={[{ backgroundColor: '#f0f0f0', height: 1 }, highlighted && { marginLeft: 0 }]} />;
    }

    return null;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderRow}
          style={styles.container}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          data={
            [
              { key: 'row_1', text: 'Right position', screen: 'FloatingActionRightScreen' },
              { key: 'row_2', text: 'Left position', screen: 'FloatingActionLeftScreen' },
              { key: 'row_3', text: 'Center position', screen: 'FloatingActionCenterScreen' },
              { key: 'row_4', text: 'No list of actions', screen: 'FloatingActionOverrideWithActionScreen' },
              { key: 'row_5', text: 'Set distance from edges', screen: 'FloatingActionDistanceEdge' },
              { key: 'row_6', text: 'Set overlay color', screen: 'FloatingActionOverlayScreen' },
              { key: 'row_7', text: 'Set button color', screen: 'FloatingActionColorScreen' }
            ]
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                this.props.navigation.navigate(item.screen);
              }}
            >
              <Text>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

export default StackNavigator({
  App: {
    screen: App
  },
  FloatingActionRightScreen: {
    screen: FloatingActionRightScreen
  },
  FloatingActionCenterScreen: {
    screen: FloatingActionCenterScreen
  },
  FloatingActionLeftScreen: {
    screen: FloatingActionLeftScreen
  },
  FloatingActionOverrideWithActionScreen: {
    screen: FloatingActionOverrideWithActionScreen
  },
  FloatingActionDistanceEdge: {
    screen: FloatingActionDistanceEdge
  },
  FloatingActionOverlayScreen: {
    screen: FloatingActionOverlayScreen
  },
  FloatingActionColorScreen: {
    screen: FloatingActionColorScreen
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 20
  }
});
