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

  renderText() {
    const {
      // @deprecated in favor of textElevation
      elevation, // eslint-disable-line
      text,
      position,
      textElevation,
      textBackground,
      textColor,
      textStyle,
      textProps,
      textContainerStyle
    } = this.props;

    if (elevation !== undefined) {
      console.warn('FloatingActionItem: "elevation" property was deprecated. Please use "textElevation"');
    }

    if (text) {
      return (
        <View
          key="text"
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation || elevation,
              shadowOffset: {
                height: textElevation || elevation,
              }
            },
            textContainerStyle
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor
              },
              textStyle
            ]}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderButton() {
    const { icon, color } = this.props;

    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = styles.iconLogo;
    } else {
      iconStyle = styles.icon;
    }

    return (
      <View key="button" style={[styles.button, { backgroundColor: color }]}>
        {
          React.isValidElement(icon) ? icon : <Image style={iconStyle} source={icon} />
        }
      </View>
    );
  }

  render() {
    const {
      position,
      distanceToEdge,
      paddingTopBottom,
      render,
      margin,
      name
    } = this.props;
    const Touchable = getTouchableComponent(false);

    const animatedActionContainerStyle = {
      marginBottom: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 10]
      })
    };

    const components = [];
    const distanceToEdgeActionContainer = {};

    if (position === 'left') {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderButton());
        components.push(this.renderText());
      }
      distanceToEdgeActionContainer.paddingLeft = distanceToEdge + margin;
    } else if (position === 'right') {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderText());
        components.push(this.renderButton());
      }
      distanceToEdgeActionContainer.paddingRight = distanceToEdge + margin;
    } else if (render) {
      components.push(render({ key: name }));
    } else {
      components.push(this.renderButton());
    }

    return (
      <Touchable activeOpacity={0.4} style={styles.container} onPress={this.handleOnPress}>
        <Animated.View
          style={[
            styles.actionContainer,
            animatedActionContainerStyle,
            styles[`${position}ActionContainer`],
            distanceToEdgeActionContainer,
            {
              paddingTop: paddingTopBottom,
              paddingBottom: paddingTopBottom
            }
          ]}
        >
          {components}
        </Animated.View>
      </Touchable>
    );
  }
}

FloatingActionItem.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  textContainerStyle: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  textProps: PropTypes.object,
  textBackground: PropTypes.string,
  textColor: PropTypes.string,
  // not on doc
  textElevation: PropTypes.number,
  // not modified by user
  position: PropTypes.oneOf(['left', 'right', 'center']),
  active: PropTypes.bool,
  distanceToEdge: PropTypes.number,
  paddingTopBottom: PropTypes.number, // modified by parent property "actionsPaddingTopBottom"
  onPress: PropTypes.func,
  render: PropTypes.func,
  margin: PropTypes.number
};

FloatingActionItem.defaultProps = {
  color: '#1253bc',
  distanceToEdge: 30,
  textElevation: 5,
  textColor: '#444444',
  textBackground: '#ffffff',
  margin: 8
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column'
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 8,
    paddingTop: 8
  },
  centerActionContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  textContainer: {
    paddingHorizontal: 8,
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
    marginTop: 8
  },
  leftTextContainer: {
    marginLeft: 14
  },
  rightTextContainer: {
    marginRight: 14
  },
  text: {
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    width: 40,
    height: 40
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
