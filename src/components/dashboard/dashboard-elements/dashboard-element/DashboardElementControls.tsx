import React from "react";
import IconButton from "../../../icon-button/IconButton";

class DashboardElementControls extends React.Component<any, any> {

    render() {
        return (
            <div className={"dashboard-element-controls"}>
                <IconButton size={"small"}><i className={"ri-settings-4-line"}/></IconButton>
                <IconButton size={"small"}><i className={"ri-window-line"}/></IconButton>
                <IconButton size={"small"}><i className={"ri-subtract-line"}/></IconButton>
                <IconButton size={"small"}><i className={"ri-close-line"}/></IconButton>
            </div>
        );
    }
}

export default DashboardElementControls;