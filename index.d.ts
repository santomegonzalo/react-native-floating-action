// Type definitions for react-native-floating-action

declare module "react-native-floating-action" {
  import { Component } from "react";

  type positionType = "right" | "left" | "center";

  type shadowType = {
    shadowOpacity: number;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowColor: string;
    shadowRadius: number;
  };

  export class FloatingAction extends Component<IFloatingActionProps> {}

  export interface IActionProps {
    color?: string;
    icon?: JSX.Element;
    name: string;
    text?: string;
    textBackground?: string;
    textColor?: string;
    textElevation?: number;
    margin?: number;
    component?: () => void;
    render?: () => void;
    animated?: boolean;
    shadow?: shadowType;
  }

  export interface IFloatingActionProps {
    actions?: IActionProps[];
    color?: string;
    distanceToEdge?: number;
    visible?: boolean;
    overlayColor?: string;
    position?: positionType;
    overrideWithAction?: boolean;
    floatingIcon?: JSX.Element;
    showBackground?: boolean;
    openOnMount?: boolean;
    actionsPaddingTopBottom?: number;
    iconHeight?: number;
    iconWidth?: number;
    iconWeight?: number;
    listenKeyboard?: boolean;
    dismissKeyboardOnPress?: boolean;
    shadow?: shadowType;
    onPressItem?: (name?: string) => void;
    onPressMain?: () => void;
    onClose?: () => void;
    onOpen?: () => void;
    onStateChange?: () => void;
  }
}
