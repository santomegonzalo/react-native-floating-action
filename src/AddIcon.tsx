import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IAddIconProps {
  width: number;
  height: number;
  backgroundColor: string;
}

function AddIcon(props: IAddIconProps): JSX.Element {
  const { width, height, backgroundColor } = props;

  return (
    <View style={styles.container}>
      <View style={[styles.vertical, { height, backgroundColor }]} />
      <View style={[styles.horizontal, { width, backgroundColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vertical: {
    width: 2,
    position: 'absolute',
  },
  horizontal: {
    height: 2,
    position: 'absolute',
  },
});

export default AddIcon;
