import React from "react";
import DashboardElementComponent, {DashboardElementProps} from "../dashboard-element/DashboardElementComponent";

export type DashboardClockProps = DashboardElementProps & {
    timeZone: string
};

type DashboardClockState = DashboardClockProps & {
    date: Date
}

class DashboardClockComponent extends DashboardElementComponent<DashboardClockProps, DashboardClockState> {

    private intervalId?: NodeJS.Timeout;

    constructor(props: DashboardClockProps) {
        super(props);
        this.state = {
            ...this.props,
            date: new Date()
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.setState((prev) => ({
            date: new Date()
        })), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    renderChildren(): React.ReactNode {
        return (
            <div className={"dashboard-clock"}>
                <h1>{this.state.timeZone}</h1>
                <h3>{this.state.date.toLocaleString(undefined, {timeZone: this.state.timeZone})}</h3>
            </div>
        );
    }
}

export default DashboardClockComponent;