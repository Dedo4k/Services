import DashboardElement from "../dashboard-element/DashboardElement";
import React from "react";
import DashboardClockComponent, {DashboardClockProps} from "./DashboardClockComponent";

class DashboardClock extends DashboardElement {

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardClockComponent, {onDelete: this.delete} as DashboardClockProps);
    }
}

export default DashboardClock;