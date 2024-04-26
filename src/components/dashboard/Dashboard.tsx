import React, {Fragment} from "react";
import DashboardElement from "./dashboard-elements/dashboard-element/DashboardElement";
import {Whiteboard} from "../index";
import DashboardClock from "./dashboard-elements/dashboard-clock-element/DashboardClock";

type DashboardState = {
    services: DashboardElement[]
}

class Dashboard extends React.Component<any, DashboardState> {

    constructor(props: any) {
        super(props);
        this.state = {
            services: [new DashboardElement(this)]
        }
    }

    addService(service: DashboardElement) {
        this.setState((prev) => ({
            ...prev,
            services: prev.services.concat(service)
        }));
    }

    removeService(service: DashboardElement) {
        this.setState((prev) => ({
            ...prev,
            services: prev.services.filter((ell) => ell !== service)
        }));
    }

    render() {
        return (
            <div className={"dashboard"}>
                <button onClick={() => this.addService(new DashboardClock(this))}>Add</button>
                <Whiteboard width={10000} height={10000}>
                    {this.state.services.map((service) =>
                        <Fragment key={service.id}>{service.buildComponent()}</Fragment>)}
                </Whiteboard>
            </div>
        );
    }
}

export default Dashboard;