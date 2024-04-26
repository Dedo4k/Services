import React from "react";
import DashboardElementComponent, {DashboardElementProps} from "./DashboardElementComponent";
import Dashboard from "../../Dashboard";
import {v4} from "uuid";

class DashboardElement {

    id: string;
    dashboard: Dashboard;

    constructor(dashboard: Dashboard) {
        this.dashboard = dashboard;
        this.id = v4();
    }

    delete = () => {
        this.dashboard.removeService(this);
    }

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardElementComponent, {onDelete: this.delete} as DashboardElementProps);
    }
}

export default DashboardElement;