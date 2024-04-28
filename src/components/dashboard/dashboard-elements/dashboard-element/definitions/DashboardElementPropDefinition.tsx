import {Autocomplete} from "@mui/material";
import React from "react";

export const PropDefinition = {
    autocomplete: Autocomplete,
    input: <div></div>,
    textField: <div></div>
};

class DashboardElementPropDefinition {
    type: any;
    name: string;
    label: string;

    constructor(name: string, label: string) {
        this.type = PropDefinition.textField;
        this.name = name;
        this.label = label;
    }

    props(handler: any) {
        return {};
    }
}

export default DashboardElementPropDefinition;