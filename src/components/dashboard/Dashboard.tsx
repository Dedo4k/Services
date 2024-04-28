import React, {Fragment} from "react";
import DashboardElement from "./dashboard-elements/dashboard-element/DashboardElement";
import {Whiteboard} from "../index";
import ControlPanel from "./control-panel/ControlPanel";
import NewDashboardElement from "./new-dashboard-element/NewDashboardElement";

type DashboardState = {
    services: DashboardElement[]
}

class Dashboard extends React.Component<any, DashboardState> {

    constructor(props: any) {
        super(props);
        this.state = {
            services: []
        }
    }

    addService = (service: DashboardElement) => {
        service.dashboard = this;
        this.setState((prev) => ({
            ...prev,
            services: prev.services.concat(service)
        }));
    }

    removeService = (service: DashboardElement) => {
        this.setState((prev) => ({
            ...prev,
            services: prev.services.filter((ell) => ell !== service)
        }));
    }

    render() {
        return (
            <div className={"dashboard"}>
                <ControlPanel>
                    <NewDashboardElement onServiceAdd={this.addService}/>
                </ControlPanel>
                <Whiteboard width={10000} height={10000}>
                    {this.state.services.map((service) =>
                        <Fragment key={service.id}>{service.buildComponent()}</Fragment>)}
                </Whiteboard>
            </div>
        );
    }
}

export default Dashboard;