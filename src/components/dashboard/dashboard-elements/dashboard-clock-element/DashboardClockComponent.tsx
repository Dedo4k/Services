import React from "react";
import DashboardElementComponent, {DashboardElementProps} from "../dashboard-element/DashboardElementComponent";

export type DashboardClockProps = DashboardElementProps & {};

class DashboardClockComponent extends DashboardElementComponent<DashboardClockProps, any> {

    renderChildren(): React.ReactNode {
        return (
            <div className={"dashboard-clock"}>
                <div>ClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClockClock</div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
                <div>
                    <button>ADd</button>
                </div>
            </div>
        );
    }
}

export default DashboardClockComponent;