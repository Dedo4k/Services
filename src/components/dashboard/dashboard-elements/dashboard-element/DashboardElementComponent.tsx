import React from "react";

export type DashboardElementProps = {
    onDelete: () => void;
}

export type DashboardElementState = {}

class DashboardElementComponent<P extends DashboardElementProps, S extends DashboardElementState> extends React.Component<P, S> {

    componentDidMount() {
        console.log("Mounted")
    }

    componentWillUnmount() {
        console.log("Unmounted")
    }

    render(): React.ReactNode {
        return (
            <div className={"dashboard-element"}>
                <button onClick={this.props.onDelete}>Delete</button>
            </div>
        );
    }
}

export default DashboardElementComponent;