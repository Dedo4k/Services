import React from "react";

abstract class Property {
    abstract type: string;
    abstract name: string;
    abstract description: string;
}

export default Property;