import DashboardService from "../services/DashboardService";
import ServiceConfiguration from "../configurations/ServiceConfiguration";

abstract class ServiceDefinition {
    abstract type: { new(props?: any): DashboardService };
    abstract name: string;
    abstract description: string
    abstract configuration: ServiceConfiguration;
}

export default ServiceDefinition;