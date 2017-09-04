import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

import FloatingActionItem from './FloatingActionItem';

import { getTouchableComponent } from './utils/touchable';

const DEVICE_WIDTH = Dimensions.get('window').width;

class FloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: props.visible
    };

    this.animation = new Animated.Value(0);
    this.visibleAnimation = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        Animated.spring(this.visibleAnimation, { toValue: 0 }).start();
      } if (!nextProps.visible) {
        Animated.spring(this.visibleAnimation, { toValue: 1 }).start();
      }
    }
  }

  animateButton = () => {
    if (!this.state.active) {
      Animated.spring(this.animation, { toValue: 1 }).start();

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

  reset = () => {
    Animated.spring(this.animation, { toValue: 0 }).start();

    this.setState({
      active: false
    });
  };

  handlePressItem = (itemName) => {
    const { onPressItem } = this.props;

    if (onPressItem) {
      onPressItem(itemName);
    }

    this.reset();
  };

  renderMainButton() {
    const { buttonColor, position } = this.props;

    const animatedVisibleView = {
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

    if (this.props.inanimate) {
      animatedViewStyle = {};
    }

    const Touchable = getTouchableComponent();

    return (
      <Animated.View
        style={[styles.buttonContainer, styles[`${position}Button`], { backgroundColor: buttonColor }, animatedVisibleView]}
      >
        <Touchable
          style={styles.button}
          activeOpacity={0.85}
          onPress={this.animateButton}
        >
          <Animated.View style={[styles.buttonTextContainer, animatedViewStyle]}>
            { this.props.floatingIcon && React.isValidElement(this.props.floatingIcon) ? this.props.floatingIcon : <Image style={styles.buttonIcon} source={require('../images/add.png')} /> }
          </Animated.View>
        </Touchable>
      </Animated.View>
    );
  }

  renderActions() {
    const { actions, position } = this.props;
    const { active } = this.state;

    const animatedActionsStyle = {
      opacity: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const actionsStyles = [styles.actions, styles[`${position}Actions`], animatedActionsStyle];

    if (this.state.active) {
      actionsStyles.push(styles[`${position}ActionsVisible`]);
    }

    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        {
          sortBy(actions, ['position']).map(action => (
            <FloatingActionItem
              key={action.name}
              {...action}
              position={position}
              active={active}
              onPress={this.handlePressItem}
            />
          ))
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
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.overlay, { backgroundColor: 'transparent' }]}
      >
        {
          this.state.active &&
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
  visible: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    buttonColor: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  })),
  position: PropTypes.oneOf(['right', 'left', 'center']),
  buttonColor: PropTypes.string,
  overlayColor: PropTypes.string,
  onPressItem: PropTypes.func
};

FloatingAction.defaultProps = {
  visible: true,
  buttonColor: '#1253bc',
  overlayColor: 'rgba(68, 68, 68, 0.6)',
  position: 'right'
};

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    zIndex: 3
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
    right: 38
  },
  leftActionsVisible: {
    left: 38
  },
  centerActionsVisible: {
    left: (DEVICE_WIDTH / 2) - 20
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    elevation: 0,
    zIndex: 1
  },
  buttonContainer: {
    zIndex: 2,
    width: 56,
    height: 56,
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
    position: 'absolute',
    bottom: 30
  },
  button: {
    zIndex: 3,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightButton: {
    right: 30
  },
  leftButton: {
    left: 30
  },
  centerButton: {
    left: (DEVICE_WIDTH / 2) - 28
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    resizeMode: 'contain'
  }
});

export default FloatingAction;
