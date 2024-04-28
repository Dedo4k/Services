import React from "react";
import {Button as MButton, ButtonOwnProps} from "@mui/material";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonOwnProps & {};

class Button extends React.Component<ButtonProps, any> {

    render() {

        return (
            <MButton className={"button"} {...this.props}>{this.props.children}</MButton>
        );
    }
}

export default Button;