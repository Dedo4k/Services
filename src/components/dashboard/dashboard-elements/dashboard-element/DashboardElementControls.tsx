import React from "react";
import IconButton from "../../../common/icon-button/IconButton";

type DashboardElementControlsProps = {
    onDelete: () => void;
    onSettings: () => void;
    fullscreen: {
        isFullscreen: boolean;
        onFullscreen: () => void;
    };
}

class DashboardElementControls extends React.Component<DashboardElementControlsProps, any> {

    render() {
        return (
            <div className={"dashboard-element-controls"}>
                <IconButton size={"small"} onClick={this.props.onSettings}><i
                    className={"ri-settings-4-line"}/></IconButton>
                {
                    !this.props.fullscreen.isFullscreen &&
                    <IconButton hidden={!this.props.fullscreen.isFullscreen} size={"small"}
                                onClick={this.props.fullscreen.onFullscreen}><i
                        className={"ri-window-line"}/></IconButton>
                }
                {
                    this.props.fullscreen.isFullscreen &&
                    <IconButton hidden={this.props.fullscreen.isFullscreen} size={"small"}
                                onClick={this.props.fullscreen.onFullscreen}><i
                        className={"ri-subtract-line"}/></IconButton>
                }
                <IconButton size={"small"} onClick={this.props.onDelete}><i className={"ri-close-line"}/></IconButton>
            </div>
        );
    }
}

export default DashboardElementControls;