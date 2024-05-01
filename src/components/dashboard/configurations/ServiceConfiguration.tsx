import NumberProperty from "./properties/NumberProperty";
import StringProperty from "./properties/StringProperty";
import React from "react";
import {FormControl, FormHelperText, FormLabel, InputAdornment, TextField} from "@mui/material";
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
                    <TextField type={"number"}
                               className={"service-configuration-property"} size={"small"}
                               onChange={(event) => accessor(this.minWidth.name, event.target.value)}
                               label={this.minWidth.name}
                               helperText={this.minWidth.description}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">px</InputAdornment>,
                               }}></TextField>
                    <TextField type={"number"}
                               className={"service-configuration-property"} size={"small"}
                               onChange={(event) => accessor(this.maxWidth.name, event.target.value)}
                               label={this.maxWidth.name}
                               helperText={this.maxWidth.description}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">px</InputAdornment>,
                               }}></TextField>
                </div>
                <div className={"service-configuration-properties-row"}>
                    <TextField type={"number"} className={"service-configuration-property"} size={"small"}
                               onChange={(event) => accessor(this.minHeight.name, event.target.value)}
                               label={this.minHeight.name}
                               helperText={this.minHeight.description}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">px</InputAdornment>,
                               }}></TextField>
                    <TextField type={"number"} className={"service-configuration-property"} size={"small"}
                               onChange={(event) => accessor(this.maxHeight.name, event.target.value)}
                               label={this.maxHeight.name}
                               helperText={this.maxHeight.description}
                               InputProps={{
                                   endAdornment: <InputAdornment position="end">px</InputAdornment>,
                               }}></TextField>
                </div>
                <div className={"service-configuration-properties-row"}>
                    <FormControl className={"service-configuration-property"}>
                        <FormLabel>{this.color.name}</FormLabel>
                        <ColorPicker className={"service-color-picker"}
                                     onChange={(value, hex) => accessor(this.color.name, hex)}
                                     defaultValue={"#0f1f38"}
                                     showText/>
                        <FormHelperText>{this.color.description}</FormHelperText>
                    </FormControl>
                </div>
            </>
        );
    }
}

export default ServiceConfiguration;