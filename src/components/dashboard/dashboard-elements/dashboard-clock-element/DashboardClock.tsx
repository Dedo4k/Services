import DashboardElement from "../dashboard-element/DashboardElement";
import React from "react";
import DashboardClockComponent, {DashboardClockProps} from "./DashboardClockComponent";

class DashboardClock extends DashboardElement {

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardClockComponent, {
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            onDelete: this.delete
        } as DashboardClockProps);
    }
}

export default DashboardClock;