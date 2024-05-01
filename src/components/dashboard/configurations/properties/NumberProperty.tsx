import Property from "./Property";

class NumberProperty extends Property {
    type: string;
    name: string;
    description: string;

    constructor(name: string, description: string) {
        super();
        this.type = "number";
        this.name = name;
        this.description = description;
    }
}

export default NumberProperty;