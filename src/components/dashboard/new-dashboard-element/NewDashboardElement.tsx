import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

import "./NewDashboardElement.css";
import DashboardServiceConfiguration from "../service-configuration/DashboardServiceConfiguration";
import ClockServiceDefinition from "../definitions/ClockServiceDefinition";
import ServiceDefinition from "../definitions/ServiceDefinition";
import DashboardService from "../services/DashboardService";

type NewDashboardElementProps = {
    onServiceAdd: (service: DashboardService) => void;
}

type NewDashboardElementState = {
    newServiceDialog: boolean;
    serviceConfigureDialog: boolean;
    selectedDefinition?: ServiceDefinition;
}

const availableServices: ServiceDefinition[] = [
    new ClockServiceDefinition()
]

class NewDashboardElement extends React.Component<NewDashboardElementProps, NewDashboardElementState> {

    constructor(props: NewDashboardElementProps) {
        super(props);
        this.state = {
            newServiceDialog: false,
            serviceConfigureDialog: false
        }
    }

    toggleNewServiceDialog = () => {
        this.setState((prev) => ({
            ...prev,
            newServiceDialog: !prev.newServiceDialog
        }));
    }

    toggleServiceConfigureDialog = () => {
        this.setState((prev) => ({
            ...prev,
            serviceConfigureDialog: !prev.serviceConfigureDialog
        }));
    }

    backToNewServiceDialog = () => {
    }

    handleConfigure = (serviceDefinition: ServiceDefinition) => {
        this.setState((prev) => ({
            ...prev,
            selectedDefinition: serviceDefinition
        }));
        this.toggleServiceConfigureDialog();
    }

    handleCreateService = (configuration: {}) => {
        if (this.state.selectedDefinition) {
            this.props.onServiceAdd(new this.state.selectedDefinition.type(configuration));
            this.toggleNewServiceDialog();
        }
    }

    render() {
        return (
            <div className={"new-dashboard-element"}>
                <Button className={"control-panel-btn new-dashboard-element-btn"}
                        size={"small"} variant={"contained"}
                        startIcon={<i className={"ri-add-large-line"}/>}
                        onClick={this.toggleNewServiceDialog}>New Service</Button>
                <Dialog maxWidth={"md"} fullWidth open={this.state.newServiceDialog}
                        onClose={this.toggleNewServiceDialog}>
                    <DialogTitle className={"new-dashboard-element-dialog-title"}>New Service Creation</DialogTitle>
                    <DialogContent>
                        {
                            availableServices.map((availableService, index) => {
                                return (
                                    <Card key={index} className={"new-dashboard-element-option"}>
                                        <CardHeader title={availableService.name}
                                                    className={"new-dashboard-element-option-header"}/>
                                        <CardContent>
                                            <Typography>
                                                {availableService.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size={"small"} variant={"contained"}
                                                    className={"new-dashboard-element-dialog-btn"}
                                                    onClick={() => this.handleConfigure(availableService)}>Configure</Button>
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
                    </DialogContent>
                    <DialogActions></DialogActions>
                </Dialog>
                <DashboardServiceConfiguration open={this.state.serviceConfigureDialog}
                                               configuration={this.state.selectedDefinition?.configuration}
                                               onApply={this.handleCreateService}
                                               onClose={this.toggleServiceConfigureDialog}
                                               prevStep={{
                                                   title: "Back to service selection",
                                                   onPrevStep: this.backToNewServiceDialog
                                               }}/>

            </div>
        );
    }
}

export default NewDashboardElement;