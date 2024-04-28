import React from "react";
import DashboardElementComponent, {DashboardElementProps} from "./DashboardElementComponent";
import Dashboard from "../../Dashboard";
import {v4} from "uuid";

class DashboardElement {

    id: string;
    dashboard?: Dashboard;
    minWidth: number;
    minHeight: number;

    constructor() {
        this.id = v4();
        this.minWidth = 300;
        this.minHeight = 150;
    }

    isValid = () => {
        return true;
    }

    delete = () => {
        this.dashboard?.removeService(this);
    }

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardElementComponent, {
            color: "#EFEFEF",
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            onDelete: this.delete
        } as DashboardElementProps);
    }
}

export default DashboardElement;