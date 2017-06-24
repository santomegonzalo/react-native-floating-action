import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';

import FloatingActionItem from './FloatingActionItem';

import { getTouchableComponent } from './utils/touchable';

class FloatingAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.animation = new Animated.Value(0);
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
    const animatedViewStyle = {
      transform: [{
        rotate: this.animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }]
    };

    const Touchable = getTouchableComponent();

    return (
      <Touchable
        style={[styles.button]}
        activeOpacity={0.85}
        onPress={this.animateButton}
      >
        <Animated.View style={[styles.buttonTextContainer, animatedViewStyle]}>
          <Image style={styles.buttonIcon} source={require('../images/add.png')} />
        </Animated.View>
      </Touchable>
    );
  }

  renderActions() {
    const { actions } = this.props;
    const { active } = this.state;

    const animatedActionsStyle = {
      opacity: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };

    const actionsStyles = [styles.actions, animatedActionsStyle];

    if (this.state.active) {
      actionsStyles.push(styles.actionsVisible);
    }

    return (
      <Animated.View style={actionsStyles} pointerEvents="box-none">
        {
          sortBy(actions, ['position']).map(action =>
            <FloatingActionItem key={action.name} {...action} active={active} onPress={this.handlePressItem} />
          )
        }
      </Animated.View>
    );
  }

  renderTappableBackground() {
    // TouchableOpacity don't require a child
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.overlay}
        onPress={this.reset}
      />
    );
  }

  render() {
    return (
      <View
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
      </View>
    );
  }
}

FloatingAction.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  })),
  onPressItem: PropTypes.func
};

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    bottom: 85,
    right: -1000,   // this magic number will make always disspear the text from screen
    alignItems: 'flex-end',
    zIndex: 3
  },
  actionsVisible: {
    right: 38
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(68, 68, 68, 0.6)',
    elevation: 5,
    zIndex: 1
  },
  button: {
    zIndex: 2,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a03037',
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    position: 'absolute',
    bottom: 30,
    right: 30
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
