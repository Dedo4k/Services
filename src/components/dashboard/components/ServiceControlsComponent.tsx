import React from "react";
import {IconButton} from "@mui/material";

type ServiceControlsComponentProps = {
    onDelete: () => void;
    onSettings: () => void;
    fullscreen: {
        isFullscreen: boolean;
        onFullscreen: () => void;
    };
}

class ServiceControlsComponent extends React.Component<ServiceControlsComponentProps, any> {

    render() {
        return (
            <div className={"service-controls-component"}>
                <IconButton className={"icon-btn"} size={"small"} onClick={this.props.onSettings}>
                    <i className={"ri-settings-4-line"}/></IconButton>
                {
                    !this.props.fullscreen.isFullscreen &&
                    <IconButton className={"icon-btn"} hidden={!this.props.fullscreen.isFullscreen} size={"small"}
                                onClick={this.props.fullscreen.onFullscreen}>
                        <i className={"ri-window-line"}/></IconButton>
                }
                {
                    this.props.fullscreen.isFullscreen &&
                    <IconButton className={"icon-btn"} hidden={this.props.fullscreen.isFullscreen} size={"small"}
                                onClick={this.props.fullscreen.onFullscreen}>
                        <i className={"ri-subtract-line"}/></IconButton>
                }
                <IconButton className={"icon-btn"} size={"small"} onClick={this.props.onDelete}>
                    <i className={"ri-close-line"}/></IconButton>
            </div>
        );
    }
}

export default ServiceControlsComponent;