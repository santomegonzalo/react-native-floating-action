import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

class AddIcon extends PureComponent {
  render() {
    const { width, height } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.vertical, { height }]} />
        <View style={[styles.horizontal, { width }]} />
      </View>
    );
  }
}

AddIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  vertical: {
    width: 2,
    position: 'absolute',
    backgroundColor: '#fff'
  },
  horizontal: {
    height: 2,
    position: 'absolute',
    backgroundColor: '#fff'
  }
});

export default AddIcon;
