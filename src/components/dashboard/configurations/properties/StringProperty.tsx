import Property from "./Property";

class StringProperty extends Property {

    type: string;
    description: string;
    name: string;

    constructor(name: string, description: string) {
        super();
        this.type = "string";
        this.name = name;
        this.description = description;
    }
}

export default StringProperty;