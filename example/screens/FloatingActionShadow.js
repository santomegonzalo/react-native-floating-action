import React, { PureComponent } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action"; // eslint-disable-line import/no-unresolved

import Property from "../components/Property";

class FloatingActionShadowScreen extends PureComponent {
  static navigationOptions = {
    title: "Shadow"
  };

  render() {
    const actions = [
      {
        text: "Accessibility",
        icon: require("../images/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 2
      },
      {
        text: "Language",
        icon: require("../images/ic_language_white.png"),
        name: "bt_language",
        position: 1
      },
      {
        text: "Location",
        icon: require("../images/ic_room_white.png"),
        name: "bt_room",
        position: 3
      },
      {
        text: "Video",
        icon: require("../images/ic_videocam_white.png"),
        name: "bt_videocam",
        position: 4
      }
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="shadowOpacity"
            propertyValue="0"
            defaultValue="0.35"
          />
          <Property
            propertyName="shadowColor"
            propertyValue="#FF4B4B"
            defaultValue="#000000"
          />
          <FloatingAction
            shadow={{
              shadowOpacity: 0.5,
              shadowColor: "#FF4B4B"
            }}
            actions={actions}
            position="right"
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

export default FloatingActionShadowScreen;
