import DashboardElement from "../dashboard-element/DashboardElement";
import React from "react";
import DashboardClockComponent, {DashboardClockProps} from "./DashboardClockComponent";
import Dashboard from "../../Dashboard";

class DashboardClock extends DashboardElement {

    // @ts-ignore
    _timeZones = Intl.supportedValuesOf("timeZone");
    timeZone: string;

    constructor(dashboard: Dashboard) {
        super(dashboard);
        this.timeZone = "Europe/Minsk";
    }

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardClockComponent, {
            color: "#EFEFEF",
            timeZone: this.timeZone,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            onDelete: this.delete
        } as DashboardClockProps);
    }
}

export default DashboardClock;