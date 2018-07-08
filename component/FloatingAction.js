import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  Platform
} from 'react-native';

import FloatingActionItem from './FloatingActionItem';

import { getTouchableComponent, getRippleProps } from './utils/touchable';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ACTION_BUTTON_SIZE = 56;

class FloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

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
    const { openOnMount } = this.props;

    if (openOnMount) {
      this.animateButton();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 0 }),
          Animated.spring(this.fadeAnimation, { toValue: 1 })
        ]).start();
      } if (!nextProps.visible) {
        Animated.parallel([
          Animated.spring(this.visibleAnimation, { toValue: 1 }),
          Animated.spring(this.fadeAnimation, { toValue: 0 })
        ]).start();
      }
    }
  }

  getIcon = () => {
    const { actions, floatingIcon, overrideWithAction , iconWidth , iconHeight } = this.props;

    if (overrideWithAction) {
      const { icon } = actions[0];

      if (React.isValidElement(icon)) {
        return icon;
      }
      return <Image style={{width:iconWidth,height:iconHeight}} source={icon} />;
    }

    if (floatingIcon) {
      if (React.isValidElement(floatingIcon)) {
        return floatingIcon;
      }

      return <Image style={{width:iconWidth,height:iconHeight}} source={floatingIcon} />;
    }

    return <Image style={{width:iconWidth,height:iconHeight}} source={require('../images/add.png')} />;
  };

  handlePressItem = (itemName) => {
    const { onPressItem } = this.props;

    if (onPressItem) {
      onPressItem(itemName);
    }

    this.reset();
  };

  reset = () => {
    Animated.spring(this.animation, { toValue: 0 }).start();
    Animated.spring(this.actionsAnimation, { toValue: 0 }).start();

    this.setState({
      active: false
    });
  };

  animateButton = () => {
    const {
      overrideWithAction,
      actions,
      floatingIcon,
      onPressMain
    } = this.props;
    const { active } = this.state;

    if (overrideWithAction) {
      this.handlePressItem(actions[0].name);

      return;
    }

    if (onPressMain) {
      onPressMain(!active);
    }

    if (!active) {
      if (!floatingIcon) {
        Animated.spring(this.animation, { toValue: 1 }).start();
      }

      Animated.spring(this.actionsAnimation, { toValue: 1 }).start();

      // only execute it for the background to prevent extra calls
      LayoutAnimation.configureNext({
        duration: 180,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity
        }
      });

      this.setState({
        active: true
      });
    } else {
      this.reset();
    }
  };

  renderMainButton() {
    const {
      // @deprecated in favor of "color"
      buttonColor, // eslint-disable-line
      color,
      position,
      overrideWithAction,
      distanceToEdge
    } = this.props;

    if (buttonColor) {
      console.warn('FloatingAction: "buttonColor" property was deprecated. Please use "color"');
    }

    const mainButtonColor = buttonColor || color;

    const animatedVisibleView = {
      opacity: this.fadeAnimation,
      transform: [{
        rotate: this.visibleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg']
        })
      }, {
        scale: this.visibleAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }]
    };

    let animatedViewStyle = {
      transform: [{
        rotate: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }]
    };

    if (overrideWithAction) {
      animatedViewStyle = {};
    }

    const Touchable = getTouchableComponent();
    const propStyles = { backgroundColor: mainButtonColor, bottom: distanceToEdge };
    if (['left', 'right'].indexOf(position) > -1) {
      propStyles[position] = distanceToEdge;
    }

    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          styles[`${position}Button`],
          propStyles,
          animatedVisibleView
        ]}
      >
        <Touchable
          {...getRippleProps(mainButtonColor)}
          style={styles.button}
          activeOpacity={0.85}
          onPress={this.animateButton}
        >
          <Animated.View style={[styles.buttonTextContainer, animatedViewStyle]}>
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
      actionsPaddingTopBottom
    } = this.props;
    const { active } = this.state;

    if (overrideWithAction) {
      return null;
    }

    const animatedActionsStyle = {
      opacity: this.actionsAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const actionsStyles = [styles.actions, styles[`${position}Actions`], animatedActionsStyle, {
      bottom: ACTION_BUTTON_SIZE + distanceToEdge + actionsPaddingTopBottom
    }];

    if (active) {
      actionsStyles.push(styles[`${position}ActionsVisible`]);
    }

    const sortedActions = actions.sort((a, b) => a.position - b.position);

    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        {
          sortedActions.map((action) => {
            const textColor = action.textColor || action.actionsTextColor;
            const textBackground = action.textBackground || action.actionsTextBackground;

            return (
              <FloatingActionItem
                paddingTopBottom={actionsPaddingTopBottom}
                distanceToEdge={distanceToEdge}
                key={action.name}
                textColor={textColor}
                textBackground={textBackground}
                {...action}
                position={position}
                active={active}
                onPress={this.handlePressItem}
              />
            );
          })
        }
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
        onPress={this.reset}
      />
    );
  }

  render() {
    const { active } = this.state;
    const { showBackground } = this.props;

    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: 'transparent' }]}
      >
        {
          (active && showBackground) &&
            this.renderTappableBackground()
        }
        {
          this.renderActions()
        }
        {
          this.renderMainButton()
        }
      </Animated.View>
    );
  }
}

FloatingAction.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    icon: PropTypes.any,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    textBackground: PropTypes.string,
    textColor: PropTypes.string,
    component: PropTypes.func
  })),
  color: PropTypes.string,
  distanceToEdge: PropTypes.number,
  visible: PropTypes.bool,
  overlayColor: PropTypes.string,
  position: PropTypes.oneOf(['right', 'left', 'center']),
  overrideWithAction: PropTypes.bool, // replace mainAction with first action from actions
  floatingIcon: PropTypes.any,
  showBackground: PropTypes.bool,
  openOnMount: PropTypes.bool,
  actionsPaddingTopBottom: PropTypes.number,
  onPressItem: PropTypes.func,
  onPressMain: PropTypes.func,
  iconHeight : PropTypes.number,
  iconWidth : PropTypes.number
};

FloatingAction.defaultProps = {
  actionsPaddingTopBottom: 8,
  overrideWithAction: false,
  visible: true,
  color: '#1253bc',
  overlayColor: 'rgba(68, 68, 68, 0.6)',
  position: 'right',
  distanceToEdge: 30,
  openOnMount: false,
  showBackground: true,
  iconHeight : 15,
  iconWidth : 15
};

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    zIndex: 10
  },
  rightActions: {
    alignItems: 'flex-end',
    right: -1000 // this magic number will make always disspear the text from screen
  },
  leftActions: {
    alignItems: 'flex-start',
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
    left: (DEVICE_WIDTH / 2) - 30
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 0
  },
  buttonContainer: {
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
    zIndex: 2,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute'
  },
  button: {
    zIndex: 3,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {},
  leftButton: {},
  centerButton: {
    left: (DEVICE_WIDTH / 2) - 28
  },
  buttonTextContainer: {
    borderRadius: 28,
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FloatingAction;
