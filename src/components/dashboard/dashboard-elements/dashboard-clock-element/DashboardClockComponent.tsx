import React from "react";
import DashboardElementComponent, {DashboardElementProps} from "../dashboard-element/DashboardElementComponent";

export type DashboardClockProps = DashboardElementProps & {};

class DashboardClockComponent extends DashboardElementComponent<DashboardClockProps, any> {

    render(): React.ReactNode {
        return (
            <div className={"dashboard-clock"}>
                {super.render()}
                <div>Clock</div>
            </div>
        );
    }
}

export default DashboardClockComponent;