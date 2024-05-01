import React from "react";
import {IconButton as MIconButton, IconButtonOwnProps} from "@mui/material";

type IconButtonProps = IconButtonOwnProps & React.HTMLAttributes<HTMLButtonElement> & {};

class IconButton extends React.Component<IconButtonProps, any> {

    render() {
        return (
            <MIconButton className={"icon-button"} {...this.props}>{this.props.children}</MIconButton>
        );
    }
}

export default IconButton;