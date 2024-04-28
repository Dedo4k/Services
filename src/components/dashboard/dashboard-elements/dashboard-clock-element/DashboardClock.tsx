import DashboardElement from "../dashboard-element/DashboardElement";
import React from "react";
import DashboardClockComponent, {DashboardClockProps} from "./DashboardClockComponent";

class DashboardClock extends DashboardElement {

    _timeZone?: string;

    constructor() {
        super();
    }

    timeZone = (timeZone: string) => {
        this._timeZone = timeZone;
    }

    isValid = () => {
        return !!this._timeZone;
    }

    buildComponent(): React.ReactNode {
        return React.createElement(DashboardClockComponent, {
            color: "#EFEFEF",
            timeZone: this?._timeZone,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            onDelete: this.delete
        } as DashboardClockProps);
    }
}

export default DashboardClock;