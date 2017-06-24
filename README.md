# react-native-floating-action

Material design action button for React Native

## Installation

```
npm i react-native-floating-action --save
```
or 
```
yarn add react-native-floating-action
```

## Usage

To see how works you could take a look **example/FloatingAction**

**First step:** import the component:

```javascript
import { FloatingAction } from 'react-native-floating-action';
```

**Second step:** define the buttons

```javascript
  const actions = [{
    text: 'Accessibility',
    icon: require('./images/ic_accessibility_white.png'),
    name: 'bt_accessibility',
    position: 2
  }, {
    text: 'Select language',
    icon: require('./images/ic_language_white.png'),
    name: 'bt_language',
    position: 1
  }, {
    text: '',
    icon: require('./images/ic_room_white.png'),
    name: 'bt_room',
    position: 3
  }, {
    text: 'Start Video',
    icon: require('./images/ic_videocam_white.png'),
    name: 'bt_videocam',
    position: 4
  }];
```

**Third step:** use it

```javascript
    <View style={styles.container}>
      <Text style={styles.example}>
        Floating Action example
      </Text>
      <FloatingAction
        actions={actions}
        onPressItem={
          (name) => {
            console.log(`selected button: ${name}`);
          }
        }
      />
    </View>
```

##TODO

- [x] first implementation
- [x] example
- [ ] add colors configurations
- [ ] add sizing configurations
- [ ] change plus icon to be customizable
- [ ] add more positions like left, center and right

