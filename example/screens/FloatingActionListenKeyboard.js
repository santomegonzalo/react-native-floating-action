import React, { PureComponent } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  TextInput,
  Keyboard
} from "react-native";
import { FloatingAction } from "react-native-floating-action"; // eslint-disable-line import/no-unresolved

import Property from "../components/Property";

class FloatingActionListenKeyboard extends PureComponent {
  static navigationOptions = {
    title: "Listen Keyboard"
  };

  state = {
    text: ""
  };

  handleDismissKeyboard = () => {
    Keyboard.dismiss();
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

    const { text } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Property
            propertyName="dismissKeyboardOnPress"
            propertyValue="false"
            defaultValue="false"
            verticalMargin={10}
          />
          <Property
            propertyName="listenKeyboard"
            propertyValue="true"
            defaultValue="false"
            verticalMargin={10}
            actionLabel="Dismiss keyboard"
            onActionPress={this.handleDismissKeyboard}
          />
          <View>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="Click here to open the keyboard!"
              onChangeText={changedText => this.setState({ text: changedText })}
            />
          </View>
          <FloatingAction
            actions={actions}
            listenKeyboard
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
  },
  input: {
    borderColor: "#cecece",
    borderWidth: 1,
    margin: 20,
    fontSize: 12,
    padding: 10
  }
});

export default FloatingActionListenKeyboard;
