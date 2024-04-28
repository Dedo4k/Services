import DashboardElementPropDefinition, {PropDefinition} from "../DashboardElementPropDefinition";
import {AutocompleteProps, TextField} from "@mui/material";

class AutocompletePropDefinition extends DashboardElementPropDefinition {

    options: { label: string }[];

    constructor(name: string, label: string, options: { label: string }[]) {
        super(name, label);
        this.type = PropDefinition.autocomplete;
        this.options = options;
    }

    props(handler: any): {} {
        return {
            options: this.options,
            renderInput: params => <TextField {...params}/>,
            onChange: (event, value) => handler(value.label)
        } as AutocompleteProps<any, any, any, any>;
    }
}

export default AutocompletePropDefinition;