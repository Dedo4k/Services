import React from "react";
import DashboardService, {IDashboardService} from "./DashboardService";
import ClockServiceComponent, {
    ClockServiceComponentProps
} from "../components/clock-service-component/ClockServiceComponent";

interface IClockService extends IDashboardService {
    timeZone: string;
}

class ClockService extends DashboardService {

    minWidth: number;
    minHeight: number;
    maxWidth?: number;
    maxHeight?: number;
    color?: string;

    timeZone: string;

    constructor({minWidth = 300, minHeight = 150, maxWidth, maxHeight, color = "#EFEFEF", timeZone}: IClockService) {
        super();
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.color = color;
        this.timeZone = timeZone;
    }

    buildComponent(): React.ReactNode {
        return React.createElement(ClockServiceComponent, {
            timeZone: this.timeZone,
            minWidth: this.minWidth,
            minHeight: this.minHeight,
            maxWidth: this.maxWidth,
            maxHeight: this.maxHeight,
            color: this.color,
            onDelete: this.delete
        } as ClockServiceComponentProps);
    }
}

export default ClockService;