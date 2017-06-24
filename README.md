# react-native-floating-action

Material design action button for React Native

<img src="https://user-images.githubusercontent.com/2914973/27511657-4d5a565e-592a-11e7-85eb-fdd8065083fc.png" width="350">

<img src="https://user-images.githubusercontent.com/2914973/27511658-4d71ff16-592a-11e7-9f9a-627843f1a416.png" width="350">

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

