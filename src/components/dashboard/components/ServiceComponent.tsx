import React from "react";
import ServiceControlsComponent from "./ServiceControlsComponent";

import "./ServiceComponent.css";

export type ServiceComponentProps = {
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    color?: string;
    onDelete: () => void;
}

export type ServiceComponentState = {
    fullscreen: boolean;
    color?: string;
}

abstract class ServiceComponent<P extends ServiceComponentProps, S extends ServiceComponentState> extends React.Component<P, S> {

    toggleFullscreen = () => {
        this.setState((prev) => ({
            ...prev,
            fullscreen: !prev.fullscreen
        }));
    }

    abstract renderComponent(): React.ReactNode;

    render() {
        const style = {
            minWidth: `${this.props.minWidth}px`,
            minHeight: `${this.props.minHeight}px`,
            backgroundColor: this.props?.color
        }

        const contentStyle = {
            maxHeight: `max(${this.props.minHeight}px - 2rem, ${this.props.height}px - 2rem)`
        }

        return (
            <div className={`service-component ${this.state.fullscreen ? "fullscreen-service" : ""}`} style={style}>
                <ServiceControlsComponent onDelete={this.props.onDelete}
                                          onSettings={() => console.log("")}
                                          fullscreen={{
                                              isFullscreen: this.state.fullscreen,
                                              onFullscreen: this.toggleFullscreen
                                          }}/>
                <div className={"service-component-content"} style={contentStyle}>
                    {this.renderComponent()}
                </div>
            </div>
        );
    }
}

export default ServiceComponent;