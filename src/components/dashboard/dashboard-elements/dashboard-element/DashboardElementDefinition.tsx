import DashboardElementPropDefinition from "./DashboardElementPropDefinition";
import DashboardElement from "./DashboardElement";

class DashboardElementDefinition {
    type: { new(props?: any): DashboardElement };
    title: string;
    description: string;
    props: DashboardElementPropDefinition[];

    constructor(title: string, description: string) {
        this.type = DashboardElement;
        this.title = title;
        this.description = description;
        this.props = [];
    }
}

export default DashboardElementDefinition;