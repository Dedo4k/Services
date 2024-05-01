import React from "react";
import ServiceComponent, {ServiceComponentProps, ServiceComponentState} from "../ServiceComponent";

export type ClockServiceComponentProps = ServiceComponentProps & {
    timeZone: string
}

type ClockServiceComponentState = ServiceComponentState & {
    timeZone: string;
    date: Date;
}

class ClockServiceComponent extends ServiceComponent<ClockServiceComponentProps, ClockServiceComponentState> {

    private intervalId?: NodeJS.Timeout;

    constructor(props: ClockServiceComponentProps) {
        super(props);
        this.state = {
            timeZone: props.timeZone,
            date: new Date(),
            fullscreen: false
        } as ClockServiceComponentState;
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.setState({
            date: new Date()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    renderComponent() {
        return (
            <div className={"clock-service"}>
                <h1>{this.state.timeZone}</h1>
                <h3>{this.state.date.toLocaleString(undefined, {timeZone: this.state.timeZone})}</h3>
            </div>
        );
    }
}

export default ClockServiceComponent;