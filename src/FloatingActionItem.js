import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, Image, View, Animated } from "react-native";

import { getTouchableComponent } from "./utils/touchable";

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidUpdate(prevProps) {
    const { active, animated } = this.props;

    if (prevProps.active !== active && animated) {
      Animated.spring(this.animation, {
        toValue: active ? 1 : 0,
        useNativeDriver: false
      }).start();
    }
  }

  get distanceToHorizontalEdge() {
    const { distanceToEdge } = this.props;
    return typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.horizontal;
  }

  get distanceToVerticalEdge() {
    const { distanceToEdge } = this.props;
    return typeof distanceToEdge === 'number'
      ? distanceToEdge
      : distanceToEdge.vertical;
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
      textContainerStyle,
      shadow
    } = this.props;

    if (elevation !== undefined) {
      console.warn(
        'FloatingActionItem: "elevation" property was deprecated. Please use "textElevation"'
      );
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
                height: textElevation || elevation
              }
            },
            shadow,
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
    const { buttonSize, icon, color, shadow, tintColor } = this.props;

    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = styles.iconLogo;
    } else {
      iconStyle = styles.icon;
    }

    const propStyles = {
      tintColor: tintColor,
      backgroundColor: color,
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2
    };

    return (
      <View
        key="button"
        style={[styles.button, propStyles, shadow]}
      >
        {React.isValidElement(icon) ? (
          icon

        ) : tintColor ? (
          <Image style={[iconStyle, { tintColor: tintColor }]} source={icon} />
        ) : (
          <Image style={[iconStyle]} source={icon} />
        )}
      </View>
    );
  }

  render() {
    const {
      position,
      paddingTopBottom,
      render,
      margin,
      name,
      animated
    } = this.props;

    const Touchable = getTouchableComponent(false);

    let animatedActionContainerStyle;

    if (animated) {
      animatedActionContainerStyle = {
        marginBottom: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [5, 10]
        })
      };
    } else {
      animatedActionContainerStyle = { marginBottom: 10 };
    }

    const components = [];
    const distanceToEdgeActionContainer = {};

    if (position === "left") {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderButton());
        components.push(this.renderText());
      }
      distanceToEdgeActionContainer.paddingLeft = this.distanceToHorizontalEdge + margin;
    } else if (position === "right") {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderText());
        components.push(this.renderButton());
      }
      distanceToEdgeActionContainer.paddingRight = this.distanceToHorizontalEdge + margin;
    } else if (render) {
      components.push(render({ key: name }));
    } else {
      components.push(this.renderButton());
    }

    return (
      <Touchable
        activeOpacity={0.4}
        style={styles.container}
        onPress={this.handleOnPress}
      >
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
  tintColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.any,
  name: PropTypes.string.isRequired,
  buttonSize: PropTypes.number,
  textContainerStyle: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  textProps: PropTypes.object,
  textBackground: PropTypes.string,
  textColor: PropTypes.string,
  shadow: PropTypes.shape({
    shadowOpacity: PropTypes.number,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    shadowColor: PropTypes.string,
    shadowRadius: PropTypes.number
  }),
  textElevation: PropTypes.number,
  // not modified by user
  position: PropTypes.oneOf(["left", "right", "center"]),
  active: PropTypes.bool,
  distanceToEdge: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      vertical: PropTypes.number,
      horizontal: PropTypes.number
    })
  ]),
  paddingTopBottom: PropTypes.number, // modified by parent property "actionsPaddingTopBottom"
  onPress: PropTypes.func,
  render: PropTypes.func,
  margin: PropTypes.number,
  animated: PropTypes.bool
};

FloatingActionItem.defaultProps = {
  tintColor: '#fff',
  color: "#1253bc",
  distanceToEdge: 30,
  buttonSize: 40,
  textElevation: 5,
  textColor: "#444444",
  textBackground: "#ffffff",
  margin: 8,
  shadow: {
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: "#000000",
    shadowRadius: 3
  }
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: "column"
  },
  actionContainer: {
    elevation: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0
  },
  textContainer: {
    paddingHorizontal: 8,
    elevation: 5,
    borderRadius: 4,
    height: 22
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
    alignItems: "center",
    justifyContent: "center",
    elevation: 5
  },
  iconLogo: {
    resizeMode: "cover",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  icon: {
    resizeMode: "contain",
    width: 20,
    height: 20
  }
});

export default FloatingActionItem;
