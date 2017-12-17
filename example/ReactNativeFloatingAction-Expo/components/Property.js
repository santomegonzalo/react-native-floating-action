import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

const PropertyComponent = ({ propertyName, propertyValue, defaultValue }) => (
  <View style={styles.container}>
    <Text style={styles.propertyName}>Property: {propertyName}</Text>
    <Text style={styles.propertyType}>Default:</Text>
    <Text style={styles.propertyValue}>{`${propertyName}: ${defaultValue}`}</Text>
    <Text style={[styles.propertyType, { marginTop: 10 }]}>Used:</Text>
    <Text style={styles.propertyValue}>{`${propertyName}: ${propertyValue}`}</Text>
  </View>
);

PropertyComponent.propTypes = {
  propertyName: PropTypes.string,
  propertyValue: PropTypes.string,
  defaultValue: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 40
  },
  propertyName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10
  },
  propertyType: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5
  },
  propertyValue: {
    fontSize: 14,
    color: '#585757',
    marginBottom: 5
  }
});

export default PropertyComponent;
