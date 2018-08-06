// Type definitions for react-native-floating-action

declare module 'react-native-floating-action' {
    import { Component } from 'react';

    type position = "right" | "left" | "center";

    declare class FloatingAction extends Component<IFloatingActionProps> {
    }

    export interface IActionProps {
        color?: string;
        icon?: JSX.Element;
        name: string;
        text?: string;
        textBackground?: string;
        textColor?: string;
        component?: () => void;
    }

    export interface IFloatingActionProps {
        actions?: IActionProps[];
        color?: string;
        distanceToEdge?: number;
        visible?: boolean;
        overlayColor?: string;
        position?: position;
        overrideWithAction?: boolean;
        floatingIcon?: JSX.Element;
        showBackground?: boolean;
        openOnMount?: boolean;
        actionsPaddingTopBottom?: number;
        iconHeight?: number;
        iconWidth?: number;
        listenKeyboard?: boolean;
        dismissKeyboardOnPress?: boolean;
        onPressItem?: () => void;
        onPressMain?: () => void;
    }

}
