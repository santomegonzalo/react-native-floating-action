import React, { Component } from "react"; // eslint-disable-line
import PropTypes from "prop-types";
import {
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  Keyboard
} from "react-native";

import FloatingActionItem from "./FloatingActionItem";
import AddIcon from "./AddIcon";

import { isIphoneX } from "./utils/platform";
import { getTouchableComponent, getRippleProps } from "./utils/touchable";

const DEVICE_WIDTH = Dimensions.get("window").width;

const DEFAULT_SHADOW_PROPS = {
  shadowOpacity: 0.35,
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowColor: "#000000",
  shadowRadius: 3
};

class FloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.mainBottomAnimation = new Animated.Value(
      this.distanceToVerticalEdge + props.mainVerticalDistance
    );
    this.actionsBottomAnimation = new Animated.Value(
      props.buttonSize +
        this.distanceToVerticalEdge +
        props.actionsPaddingTopBottom +
        props.mainVerticalDistance
    );
    this.animation = new Animated.Value(0);
    this.actionsAnimation = new Animated.Value(0);
    this.visibleAnimation = new Animated.Value(props.visible ? 0 : 1);
    /*
     * this animation will fix an error on ReactNative (Android) where
     * interpolations with 0 and 1 don't work as expected.
     */
    this.fadeAnimation = new Animated.Value(props.visible ? 1 : 0);
  }

  componentDidMount() {
    const { openOnMount, listenKeyboard } = this.props;

    if (openOnMount) {
      this.animateButton();
    }

    if (listenKeyboard) {
      const showEvent =
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
      const hideEvent =
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
      this.keyboardWillShowListener = Keyboard.addListener(
        showEvent,
        this.onKeyboardShow
      );
      this.keyboardWillHideListener = Keyboard.addListener(
        hideEvent,
        this.onKeyboardHideHide
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      if (visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 0, useNativeDriver: false }),
          Animated.spring(this.fadeAnimation, { toValue: 1, useNativeDriver: false })
        ]).start();
      }
      if (!visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 1, useNativeDriver: false }),
          Animated.spring(this.fadeAnimation, { toValue: 0, useNativeDriver: false })
        ]).start();
      }
    }
  }

  componentWillUnmount() {
    const { listenKeyboard } = this.props;

    if (listenKeyboard) {
      this.keyboardWillShowListener.remove();
      this.keyboardWillHideListener.remove();
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

  onKeyboardShow = e => {
    const { buttonSize, actionsPaddingTopBottom } = this.props;
    const { height } = e.endCoordinates;

    Animated.parallel([
      Animated.spring(this.actionsBottomAnimation, {
        bounciness: 0,
        useNativeDriver: false,
        toValue:
          buttonSize +
          this.distanceToVerticalEdge +
          actionsPaddingTopBottom +
          height -
          (isIphoneX() ? 40 : 0),
        duration: 250
      }),
      Animated.spring(this.mainBottomAnimation, {
        bounciness: 0,
        useNativeDriver: false,
        toValue: this.distanceToVerticalEdge + height - (isIphoneX() ? 40 : 0),
        duration: 250
      })
    ]).start();
  };

  onKeyboardHideHide = () => {
    const { buttonSize, actionsPaddingTopBottom } = this.props;

    Animated.parallel([
      Animated.spring(this.actionsBottomAnimation, {
        bounciness: 0,
        useNativeDriver: false,
        toValue: buttonSize + this.distanceToVerticalEdge + actionsPaddingTopBottom,
        duration: 250
      }),
      Animated.spring(this.mainBottomAnimation, {
        bounciness: 0,
        useNativeDriver: false,
        toValue: this.distanceToVerticalEdge,
        duration: 250
      })
    ]).start();
  };

  getShadow = () => {
    const { shadow } = this.props;

    return {
      ...DEFAULT_SHADOW_PROPS,
      ...shadow
    };
  };

  getIcon = () => {
    const {
      actions,
      floatingIcon,
      overrideWithAction,
      iconWidth,
      iconHeight,
      iconColor
    } = this.props;

    if (overrideWithAction) {
      const { icon } = actions[0];

      if (React.isValidElement(icon)) {
        return icon;
      }
      return (
        <Image style={{ width: iconWidth, height: iconHeight }} source={icon} />
      );
    }

    if (floatingIcon) {
      if (React.isValidElement(floatingIcon)) {
        return floatingIcon;
      }

      return (
        <Image
          style={{ width: iconWidth, height: iconHeight }}
          source={floatingIcon}
        />
      );
    }

    return <AddIcon width={iconWidth} height={iconHeight} backgroundColor={iconColor}  />;
  };

  reset = () => {
    const { animated, onClose } = this.props;

    if (animated) {
      Animated.spring(this.animation, { toValue: 0, useNativeDriver: false }).start();
      Animated.spring(this.actionsAnimation, { toValue: 0, useNativeDriver: false }).start();
    }
    this.updateState(
      {
        active: false
      },
      () => {
        if (onClose) {
          onClose();
        }
      }
    );
  };

  animateButton = () => {
    const {
      overrideWithAction,
      actions,
      floatingIcon,
      animated,
      dismissKeyboardOnPress,
      onPressMain,
      onOpen
    } = this.props;
    const { active } = this.state;

    if (dismissKeyboardOnPress) {
      Keyboard.dismiss();
    }

    if (overrideWithAction) {
      this.handlePressItem(actions[0].name);

      return;
    }

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active) {
      if (!floatingIcon) {
        if (animated) {
          Animated.spring(this.animation, { toValue: 1, useNativeDriver: false }).start();
        }
      }

      if (animated) {
        Animated.spring(this.actionsAnimation, { toValue: 1, useNativeDriver: false }).start();

        // only execute it for the background to prevent extra calls
        LayoutAnimation.configureNext({
          duration: 180,
          create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity
          }
        });
      }

      this.updateState(
        {
          active: true
        },
        () => {
          if (onOpen) {
            onOpen();
          }
        }
      );
    } else {
      this.reset();
    }
  };

  updateState = (nextState, callback) => {
    const { onStateChange } = this.props;
    const { active } = this.state;

    this.setState(nextState, () => {
      if (callback) {
        callback();
      }
      if (onStateChange) {
        onStateChange({
          isActive: active
        });
      }
    });
  };

  handlePressBackdrop = () => {
    const { onPressBackdrop } = this.props;
    if (onPressBackdrop) {
      onPressBackdrop();
    }
    this.reset();
  };

  handlePressItem = itemName => {
    const { onPressItem } = this.props;

    if (onPressItem) {
      onPressItem(itemName);
    }

    this.reset();
  };

  renderMainButton() {
    const {
      // @deprecated in favor of "color"
      buttonColor, // eslint-disable-line
      buttonSize,
      color,
      position,
      overrideWithAction,
      animated
    } = this.props;
    const { active } = this.state;

    if (buttonColor) {
      console.warn(
        'FloatingAction: "buttonColor" property was deprecated. Please use "color"'
      );
    }

    const mainButtonColor = buttonColor || color;

    let animatedVisibleView;
    let animatedViewStyle;

    if (animated) {
      animatedVisibleView = {
        opacity: this.fadeAnimation,
        transform: [
          {
            rotate: this.visibleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "90deg"],
              useNativeDriver: true
            })
          },
          {
            scale: this.visibleAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
              useNativeDriver: true
            })
          }
        ]
      };

      animatedViewStyle = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "45deg"],
              useNativeDriver: true
            })
          }
        ]
      };

      if (overrideWithAction) {
        animatedViewStyle = {};
      }
    } else if (active) {
      animatedVisibleView = {};

      animatedViewStyle = {
        transform: [
          {
            rotate: "45deg"
          }
        ]
      };
    } else {
      animatedVisibleView = {};

      animatedViewStyle = {
        transform: [
          {
            rotate: "0deg"
          }
        ]
      };
    }

    const Touchable = getTouchableComponent();
    const propStyles = {
      backgroundColor: mainButtonColor,
      bottom: this.mainBottomAnimation // I need to imporove this to run on native thread and not on JS thread
    };

    if (["left", "right"].indexOf(position) > -1) {
      propStyles[position] = this.distanceToHorizontalEdge;
    }

    const sizeStyle = {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2
    };

    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          sizeStyle,
          styles[`${position}Button`],
          propStyles,
          animatedVisibleView,
          this.getShadow()
        ]}
        accessible
        accessibilityLabel="Floating Action Button"
      >
        <Touchable
          {...getRippleProps(mainButtonColor)}
          style={[styles.button, sizeStyle]}
          activeOpacity={0.85}
          onPress={this.animateButton}
        >
          <Animated.View
            style={[styles.buttonTextContainer, sizeStyle, animatedViewStyle]}
          >
            {this.getIcon()}
          </Animated.View>
        </Touchable>
      </Animated.View>
    );
  }

  renderActions() {
    const {
      actions,
      position,
      overrideWithAction,
      distanceToEdge,
      actionsPaddingTopBottom,
      animated
    } = this.props;
    const { active } = this.state;

    if (!actions || actions.length === 0) {
      return undefined;
    }

    if (overrideWithAction) {
      return null;
    }

    let animatedActionsStyle;

    if (animated) {
      animatedActionsStyle = {
        opacity: this.actionsAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
      };
    } else {
      animatedActionsStyle = { opacity: active ? 1 : 0 };
    }

    const actionsStyles = [
      styles.actions,
      styles[`${position}Actions`],
      animatedActionsStyle,
      {
        bottom: this.actionsBottomAnimation
      }
    ];

    if (active) {
      actionsStyles.push(styles[`${position}ActionsVisible`]);
    }

    const sortedActions = actions.sort((a, b) => a.position - b.position);
    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        {sortedActions.map(action => {
          const textColor = action.textColor || action.actionsTextColor;
          const textBackground =
            action.textBackground || action.actionsTextBackground;

          return (
            <FloatingActionItem
              paddingTopBottom={actionsPaddingTopBottom}
              distanceToEdge={distanceToEdge}
              key={action.name}
              textColor={textColor}
              textBackground={textBackground}
              shadow={this.getShadow()}
              {...action}
              position={position}
              active={active}
              onPress={this.handlePressItem}
              animated={animated}
            />
          );
        })}
      </Animated.View>
    );
  }

  renderTappableBackground() {
    const { overlayColor } = this.props;

    // TouchableOpacity don't require a child
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={this.handlePressBackdrop}
      />
    );
  }

  render() {
    const { active } = this.state;
    const { showBackground } = this.props;

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: "transparent" }]}
      >
        {active && showBackground && this.renderTappableBackground()}
        {this.renderActions()}
        {this.renderMainButton()}
      </Animated.View>
    );
  }
}

FloatingAction.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.any,
      name: PropTypes.string.isRequired,
      buttonSize: PropTypes.number,
      text: PropTypes.string,
      textBackground: PropTypes.string,
      textColor: PropTypes.string,
      component: PropTypes.func,
      animated: PropTypes.bool
    })
  ),
  animated: PropTypes.bool,
  color: PropTypes.string,
  distanceToEdge: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      vertical: PropTypes.number,
      horizontal: PropTypes.number
    })
  ]),
  mainVerticalDistance: PropTypes.number,
  visible: PropTypes.bool,
  overlayColor: PropTypes.string,
  position: PropTypes.oneOf(["right", "left", "center"]),
  overrideWithAction: PropTypes.bool, // replace mainAction with first action from actions
  floatingIcon: PropTypes.any,
  showBackground: PropTypes.bool,
  openOnMount: PropTypes.bool,
  actionsPaddingTopBottom: PropTypes.number,
  buttonSize: PropTypes.number,
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
  listenKeyboard: PropTypes.bool,
  dismissKeyboardOnPress: PropTypes.bool,
  shadow: PropTypes.shape({
    shadowOpacity: PropTypes.number,
    shadowOffset: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }),
    shadowColor: PropTypes.string,
    shadowRadius: PropTypes.number
  }),
  onPressItem: PropTypes.func,
  onPressMain: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onPressBackdrop: PropTypes.func,
  onStateChange: PropTypes.func
};

FloatingAction.defaultProps = {
  dismissKeyboardOnPress: false,
  listenKeyboard: false,
  actionsPaddingTopBottom: 8,
  overrideWithAction: false,
  visible: true,
  color: "#1253bc",
  overlayColor: "rgba(68, 68, 68, 0.6)",
  position: "right",
  distanceToEdge: 30,
  openOnMount: false,
  showBackground: true,
  buttonSize: 56,
  iconHeight: 15,
  iconWidth: 15,
  iconColor: '#fff',
  mainVerticalDistance: 0,
  animated: true,
  shadow: {}
};

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    bottom: 85,
    zIndex: 10
  },
  rightActions: {
    alignItems: "flex-end",
    right: -1000 // this magic number will make always disspear the text from screen
  },
  leftActions: {
    alignItems: "flex-start",
    left: -1000 // this magic number will make always disspear the text from screen
  },
  centerActions: {
    left: -1000
  },
  rightActionsVisible: {
    right: 0
  },
  leftActionsVisible: {
    left: 0
  },
  centerActionsVisible: {
    left: DEVICE_WIDTH / 2 - 30
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 0
  },
  buttonContainer: {
    overflow: Platform.OS === "ios" ? "visible" : "hidden",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    position: "absolute"
  },
  button: {
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  rightButton: {},
  leftButton: {},
  centerButton: {
    left: DEVICE_WIDTH / 2 - 28
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FloatingAction;
