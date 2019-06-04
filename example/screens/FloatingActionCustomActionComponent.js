import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';

import CustomActionComponent from '../components/CustomActionComponent';
import Property from '../components/Property';

class FloatingActionCustomActionComponent extends PureComponent {
  static navigationOptions = {
    title: 'Custom Action Component'
  };

  render() {
    const actions = [{
      position: 1,
      name: 'action1',
      margin: 0,
      render: props => <CustomActionComponent {...props} text="Action 1" />
    }, {
      name: 'action2',
      position: 2,
      margin: 0,
      render: props => <CustomActionComponent {...props} text="Action 2" />
    }, {
      name: 'action3',
      position: 3,
      margin: 0,
      render: props => <CustomActionComponent {...props} text="Action 3" />
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="render"
            propertyValue="Default library component"
            defaultValue="Custom component"
          />
          <FloatingAction
            actions={actions}
            position="right"
            onPressItem={
              (name) => {
                Alert.alert(`Pressed action: ${name}`);
              }
            }
            actionsPaddingTopBottom={0}
            overlayColor="#F2F2F2"
            distanceToEdge={16}
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

export default FloatingActionCustomActionComponent;
