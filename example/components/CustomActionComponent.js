import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#662e00',
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: { color: '#662e00' }
});

class CustomActionComponent extends React.Component {
  render() {
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

export default CustomActionComponent;
