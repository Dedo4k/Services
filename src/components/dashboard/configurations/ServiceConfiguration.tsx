import NumberProperty from "./properties/NumberProperty";
import StringProperty from "./properties/StringProperty";
import React from "react";
import {TextField} from "@mui/material";
import {ColorPicker} from "antd";

import "./ServiceConfiguration.css";

abstract class ServiceConfiguration {

    minWidth = new NumberProperty("minWidth", "Service minimal width in px");
    minHeight = new NumberProperty("minHeight", "Service minimal height in px");
    maxWidth = new NumberProperty("maxWidth", "Service maximal width in px");
    maxHeight = new NumberProperty("maxHeight", "Service maximal height in px");
    color = new StringProperty("color", "Service background color");

    renderProperties(accessor: (propName: string, value: any) => void): React.ReactNode {
        return (
            <>
                <div className={"service-configuration-properties-row"}>
                    <TextField onChange={(event) => accessor(this.minWidth.name, event.target.value)}
                               label={this.minWidth.name}></TextField>
                    <TextField onChange={(event) => accessor(this.maxWidth.name, event.target.value)}
                               label={this.maxWidth.name}></TextField>
                </div>
                <div className={"service-configuration-properties-row"}>
                    <TextField onChange={(event) => accessor(this.minHeight.name, event.target.value)}
                               label={this.minHeight.name}></TextField>
                    <TextField onChange={(event) => accessor(this.maxHeight.name, event.target.value)}
                               label={this.maxHeight.name}></TextField>
                </div>
                <div className={"service-configuration-properties-row"}>
                    <span>{this.color.name}</span><ColorPicker className={"service-color-picker"}
                                                               onChange={(value, hex) => accessor(this.color.name, hex)}/>
                </div>
            </>
        );
    }
}

export default ServiceConfiguration;