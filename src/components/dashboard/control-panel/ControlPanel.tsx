import React from "react";

import "./ControlPanel.css";

class ControlPanel extends React.Component<any, any> {

    render() {
        return (
            <div className={"control-panel"}>
                <button>Add</button>
                <button>Delete</button>
                <button>Find</button>
                <button>Edit</button>
            </div>
        );
    }
}

export default ControlPanel;