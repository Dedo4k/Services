import ServiceDefinition from "./ServiceDefinition";
import ServiceConfiguration from "../configurations/ServiceConfiguration";
import DashboardService from "../services/DashboardService";
import ClockService from "../services/ClockService";
import ClockServiceConfiguration from "../configurations/ClockServiceConfiguration";

class ClockServiceDefinition extends ServiceDefinition {
    type: { new(props?: any): DashboardService };
    name: string;
    description: string;
    configuration: ServiceConfiguration;

    constructor() {
        super();
        this.type = ClockService;
        this.name = "Clock service";
        this.description = "This service displays current time of specified time zone";
        this.configuration = new ClockServiceConfiguration();
    }
}

export default ClockServiceDefinition;