import DashboardElementDefinition from "../dashboard-element/definitions/DashboardElementDefinition";
import DashboardClock from "./DashboardClock";
import AutocompletePropDefinition from "../dashboard-element/definitions/prop-definitions/AutocompletePropDefinition";
import {getTimeZones} from "../../../../utils";

class DashboardClockDefinition extends DashboardElementDefinition {

    constructor(title: string, description: string) {
        super(title, description);
        this.type = DashboardClock;
        this.props = [
            new AutocompletePropDefinition("timeZone",
                "Time Zone",
                getTimeZones().map((timezone) => ({label: timezone})))
        ]
    }
}

export default DashboardClockDefinition;