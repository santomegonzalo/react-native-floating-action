# react-native-floating-action

Material design action button for React Native

<img src="https://user-images.githubusercontent.com/2914973/27517002-84316402-59c4-11e7-987c-fd3b44af84ae.gif" width="350">

<img src="https://user-images.githubusercontent.com/2914973/27517000-841d17e0-59c4-11e7-8804-1192dbc98af5.gif" width="350">

<img src="https://user-images.githubusercontent.com/2914973/27517001-841df002-59c4-11e7-91e6-2a03bba66fe7.gif" width="350">

<img src="https://user-images.githubusercontent.com/2914973/27517003-8444c42a-59c4-11e7-9a8c-5e007708675b.gif" width="350">

<img src="https://user-images.githubusercontent.com/2914973/29421294-e74df51c-8374-11e7-96ca-62675075f8e8.gif" width="350">

## Installation

```
npm i react-native-floating-action --save
```
or 
```
yarn add react-native-floating-action
```

## Usage

To see how works, take a look into **example/FloatingAction**

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
    text: 'Language',
    icon: require('./images/ic_language_white.png'),
    name: 'bt_language',
    position: 1
  }, {
    text: 'Location',
    icon: require('./images/ic_room_white.png'),
    name: 'bt_room',
    position: 3
  }, {
    text: 'Video',
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

## Configuration

**FloatingAction**

| Property     | Type     | Default               | Description                                                                                                |
|--------------|----------|-----------------------|------------------------------------------------------------------------------------------------------------|
| actions      | array    | []                    | Actions to be show once user press the main button                                                         |
| buttonColor  | string   | #1253bc               | Color of the main button                                                                                   |
| visible      | boolean  | true                  | Hide or Show the component using an animation                                                                                   |
| overlayColor | string   | rgba(68, 68, 68, 0.6) | Color of the background overlay                                                                            |
| position     | string   | right                 | Position to render the main button and actions, options: (**left**, **right**, **center**)                 |
| onPressItem  | function |                       | Function to be call as soon as the user select an option from actions. Will return the name of the action. |

**Actions**

| Property | Type   | Default | Description                                                                                                                                                                                                                                                                |
|----------|--------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| color    | string | #1253bc | Color of the action button                                                                                                                                                                                                                                                 |
| icon     | any    |         | Icon to be rendered inside the action, will accept an URL or React.Image. If we want to send an URL we need to send it in this way: icon: **{ uri: 'https://imageurl.com' }** if we want to send a React.Image we will use it in this way: **icon: require('path/image')** |
| name     | string |         | Name of the icon, this name is used as parameter for **onPressItem** action                                                                                                                                                                                                |
| text     | string |         | Text to show near to the button. This option only works for **position = ['left', 'right']**                                                                                                                                                                               |

## TODO

- [x] first implementation
- [x] example
- [x] add colors configurations
- [x] add more positions like left, center and right
- [x] support hide or show the component with an animation
- [ ] add sizing configurations
- [ ] change plus icon to be customizable
