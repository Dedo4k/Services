import React from "react";
import DashboardElement from "../dashboard-elements/dashboard-element/DashboardElement";
import {Button} from "../../index";
import {
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
import DashboardClockDefinition from "../dashboard-elements/dashboard-clock-element/DashboardClockDefinition";

import "./NewDashboardElement.css";
import DashboardElementDefinition from "../dashboard-elements/dashboard-element/DashboardElementDefinition";
import {DashboardElementProps} from "../dashboard-elements/dashboard-element/DashboardElementComponent";

type NewDashboardElementProps = {
    onServiceAdd: (service: DashboardElement) => void;
}

type NewDashboardElementState = {
    newServiceDialog: boolean;
    serviceConfigureDialog: boolean;
    selectedDefinition?: DashboardElementDefinition;
    serviceConfiguration?: DashboardElement;
    tempConfiguration?: {};
}

const availableServices = [
    new DashboardClockDefinition(
        "Clock service",
        "This service displays current time of specified time zone")
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
        this.toggleServiceConfigureDialog();
        this.toggleNewServiceDialog();
    }

    handleConfigure = (serviceDefinition: DashboardElementDefinition) => {
        this.setState((prev) => ({
            ...prev,
            selectedDefinition: serviceDefinition,
            serviceConfiguration: new serviceDefinition.type()
        }));
        this.toggleNewServiceDialog();
        this.toggleServiceConfigureDialog();
    }

    handleCreateService = () => {
        if (this.state.selectedDefinition) {
            this.props.onServiceAdd(new this.state.selectedDefinition.type(this.state.tempConfiguration as DashboardElementProps));
            this.toggleServiceConfigureDialog();
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
                                        <CardHeader title={availableService.title}
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
                <Dialog maxWidth={"md"} fullWidth open={this.state.serviceConfigureDialog}
                        onClose={this.toggleServiceConfigureDialog}>
                    <DialogTitle className={"new-dashboard-element-dialog-title"}>Service Configuration</DialogTitle>
                    <DialogContent className={"new-dashboard-element-dialog-content"}>
                        {
                            this.state.selectedDefinition?.props.map((prop, index) => {
                                const handle = (value: any) => this.setState((prev) => ({
                                    ...prev,
                                    tempConfiguration: {
                                        [prop.name]: value
                                    }
                                }))
                                return (
                                    <prop.type key={index} {...prop.props(handle)}></prop.type>
                                );
                            })
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button size={"small"} variant={"outlined"}
                                className={"new-dashboard-element-dialog-btn"}
                                onClick={this.backToNewServiceDialog}>Back to service selection</Button>
                        <Button size={"small"} variant={"contained"}
                                className={"new-dashboard-element-dialog-btn"}
                                onClick={this.handleCreateService}>Create service</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default NewDashboardElement;