import React from "react";

import "./ControlPanel.css";

type ControlPanelProps = {
    children?: React.ReactNode
}

class ControlPanel extends React.Component<ControlPanelProps, any> {

    render() {
        return (
            <div className={"control-panel"}>
                {this.props.children}
            </div>
        );
    }
}

export default ControlPanel;