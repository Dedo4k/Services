import Dashboard from "../Dashboard";
import React from "react";
import {v4} from "uuid";

export interface IDashboardService {
    minWidth: number;
    minHeight: number;
    maxWidth?: number;
    maxHeight?: number;
    color?: string;
}

abstract class DashboardService {
    dashboard?: Dashboard;
    id = v4();
    abstract minWidth: number;
    abstract minHeight: number;
    abstract maxWidth?: number;
    abstract maxHeight?: number;
    abstract color?: string;

    delete = (): void => {
        this.dashboard?.removeService(this);
    }

    abstract buildComponent(): React.ReactNode;
}

export default DashboardService;