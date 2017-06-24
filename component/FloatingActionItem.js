import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Animated
} from 'react-native';

import { getTouchableComponent } from './utils/touchable';

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      Animated.spring(this.animation, { toValue: nextProps.active ? 1 : 0 }).start();
    }
  }

  handleOnPress = () => {
    const { name, onPress } = this.props;

    onPress(name);
  };

  render() {
    const { icon, text } = this.props;
    const Touchable = getTouchableComponent();

    const animatedActionContainerStyle = {
      marginBottom: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 20]
      })
    };

    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = styles.iconLogo;
    } else {
      iconStyle = styles.icon;
    }

    return (
      <Touchable activeOpacity={0.4} style={styles.container} onPress={this.handleOnPress}>
        <Animated.View style={[styles.actionContainer, animatedActionContainerStyle]}>
          {
            Boolean(text) &&
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {text}
                </Text>
              </View>
          }
          <View style={styles.button}>
            {
              Boolean(icon) &&
                <Image style={iconStyle} source={icon} />
            }
          </View>
        </Animated.View>
      </Touchable>
    );
  }
}

FloatingActionItem.propTypes = {
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  text: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  textContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4,
    height: 22,
    marginRight: 14,
    marginTop: 8
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444444'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a03037',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5
  },
  iconLogo: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    borderRadius: 20
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  }
});

export default FloatingActionItem;
