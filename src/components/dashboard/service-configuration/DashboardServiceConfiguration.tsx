import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import ServiceConfiguration from "../configurations/ServiceConfiguration";

import "./DashboardServiceConfiguration.css";

type DashboardServiceConfigurationProps = {
    open: boolean;
    configuration?: ServiceConfiguration;
    onApply: (configuration: {}) => void;
    onClose: () => void;
    prevStep?: {
        title: string;
        onPrevStep: () => void;
    },
};

type DashboardServiceConfigurationState = {
    configuration: {};
};

class DashboardServiceConfiguration extends React.Component<DashboardServiceConfigurationProps, DashboardServiceConfigurationState> {

    constructor(props: DashboardServiceConfigurationProps) {
        super(props);
        this.state = {
            configuration: {}
        }
    }

    setProperty = (propName: string, value: any) => {
        this.setState((prev) => ({
            ...prev,
            configuration: {
                ...prev.configuration,
                [propName]: value
            }
        }));
    }

    handlePrevStep = () => {
        this.props.prevStep && this.props.prevStep.onPrevStep();
        this.props.onClose();
    }

    handleApply = () => {
        this.props.onApply(this.state.configuration);
        this.props.onClose();
    }

    render() {
        return (
            <div className="dashboard-service-configuration">
                <Dialog maxWidth={"md"} fullWidth open={this.props.open}
                        onClose={this.props.onClose}>
                    <DialogTitle className={"dashboard-service-configuration-dialog-title"}>Service
                        Configuration</DialogTitle>
                    <DialogContent className={"dashboard-service-configuration-dialog-content"}>
                        <div className="service-configuration-properties">
                            {
                                this.props.configuration?.renderProperties(this.setProperty)
                            }
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {
                            this.props.prevStep &&
                            <Button size={"small"} variant={"outlined"}
                                    className={"dashboard-service-configuration-dialog-btn"}
                                    onClick={this.handlePrevStep}>{this.props.prevStep.title}</Button>
                        }
                        <Button size={"small"} variant={"contained"}
                                className={"dashboard-service-configuration-dialog-btn"}
                                onClick={this.handleApply}>Create service</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DashboardServiceConfiguration;