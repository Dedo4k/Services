import React, {Fragment} from "react";
import DashboardElementControls from "./DashboardElementControls";

import "./DashboardElement.css";

export type DashboardElementProps = {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    scale: number;
    color?: string;
    onDelete: () => void;
}

export type DashboardElementState = {
    color?: string
}

class DashboardElementComponent<P extends DashboardElementProps, S extends DashboardElementState> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    componentDidMount() {
        console.log("Mounted")
    }

    componentWillUnmount() {
        console.log("Unmounted")
    }

    renderChildren(): React.ReactNode {
        return <Fragment></Fragment>;
    }

    render(): React.ReactNode {
        const style = {
            minWidth: `${this.props.minWidth}px`,
            minHeight: `${this.props.minHeight}px`,
            backgroundColor: this.props?.color
        }

        const contentStyle = {
            maxHeight: `max(${this.props.minHeight}px - 2rem, ${this.props.height * this.props.scale}px - 2rem)`
        }

        return (
            <div className={"dashboard-element"} style={style}>
                <DashboardElementControls/>
                <div className={"dashboard-element-content"} style={contentStyle}>
                    {this.renderChildren()}
                </div>
            </div>
        );
    }
}

export default DashboardElementComponent;