import ServiceConfiguration from "./ServiceConfiguration";
import StringProperty from "./properties/StringProperty";
import React from "react";
import {Autocomplete, FormControl, FormHelperText, TextField} from "@mui/material";
import {getTimeZones} from "../../../utils";

class ClockServiceConfiguration extends ServiceConfiguration {

    timeZone = new StringProperty("timeZone", "Timezone name");

    renderProperties(accessor: (propName: string, value: any) => void): React.ReactNode {
        return (
            <>
                {super.renderProperties(accessor)}
                <div className={"service-configuration-properties-row"}>
                    <FormControl fullWidth className="service-configuration-property">
                        <Autocomplete size={"small"}
                                      renderInput={params => <TextField {...params} label={this.timeZone.name}/>}
                                      options={getTimeZones().map((timezone) => ({label: timezone}))}
                                      onChange={(event, value) => accessor(this.timeZone.name, value?.label)}/>
                        <FormHelperText>{this.timeZone.description}</FormHelperText>
                    </FormControl>
                </div>
            </>
        );
    }
}

export default ClockServiceConfiguration;