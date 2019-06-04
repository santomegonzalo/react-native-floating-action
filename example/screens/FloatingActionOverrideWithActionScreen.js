import React, { PureComponent } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action"; // eslint-disable-line import/no-unresolved

import Property from "../components/Property";

class FloatingActionOverrideWithActionScreen extends PureComponent {
  static navigationOptions = {
    title: "Right position"
  };

  render() {
    const actions = [
      {
        text: "Accessibility",
        icon: require("../images/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 1
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="overrideWithAction"
            propertyValue="true"
            defaultValue="false"
          />
          <FloatingAction
            actions={actions}
            overrideWithAction
            onPressItem={name => {
              Alert.alert("Icon pressed", `the icon ${name} was pressed`);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default FloatingActionOverrideWithActionScreen;
