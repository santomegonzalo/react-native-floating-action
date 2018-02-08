/// <reference types="react" />

declare module "react-native-floating-action" {

  import { ImageURISource, ImageRequireSource, NativeMethodsMixin } from 'react-native';

  export interface Action {
    /** Icon to be rendered inside the action, will accept an URL or React.Image.
     * If we want to send an URL we need to send it in this way: icon: { uri: 'https://imageurl.com' }
     * if we want to send a React.Image we will use it in this way: icon: require('path/image') */
    icon:	JSX.Element | ImageURISource | ImageRequireSource;
    /** Name of the icon, this name is used as parameter for onPressItem action */
    name: string;
    /** Text to show near to the button. This option only works for position 'left' or 'right' */
    text?: string;
    /** Color of the action button (#1253bc) */
    buttonColor?: string;
    /** Position to render the main button and actions, options: 'left', 'right', 'center' */
    position: 'left' | 'right' | 'center';
  }

  export interface FloatingActionProperties {
    /** Actions to be show once user press the main button */
    actions?:	Action[];
    /** Color of the main button (#1253bc) */
    buttonColor?: string;
    /** Distance from button to edge (30) */
    distanceToEdge?:	number;
    /** Hide or Show the component using an animation (true) */
    visible?: boolean;
    /** Color of the background overlay (rgba(68, 68, 68, 0.6)) */
    overlayColor?: string;
    /** Position to render the main button and actions, options: 'left', 'right', 'center' (right) */
    position?: 'left' | 'right' | 'center';
    /** Override the main action with the first action inside list actions, will not show other action (false) */
    overrideWithAction?: boolean;
    /** ReactElement */
    floatingIcon?: JSX.Element | ImageURISource | ImageRequireSource;
    /** Show or Hide background after open it (true) */
    showBackground?: boolean;
    /** Open component after mounting it, useful on some weird cases like tutorials (false) */
    openOnMount?: boolean;
    /** Change distance between actions (8) */
    actionsPaddingTopBottom?: number;
    /** Function to be call as soon as the user select an option from actions. Will return the name of the action. */
    onPressItem?: (action: string) => any;
    /** Function to be call as soon as use click main button and will return true or false depeneding of the state. */
    onPressMain?: (state: boolean) => any;

    // undocummented in the readme
    actionsTextBackground?: string;
    actionsTextColor?: string;
  }

  export interface FloatingActionStatic extends NativeMethodsMixin, React.ClassicComponentClass<FloatingActionProperties> {
  }

  export const FloatingAction: FloatingActionStatic;
  export type FloatingAction = FloatingActionStatic;

}
