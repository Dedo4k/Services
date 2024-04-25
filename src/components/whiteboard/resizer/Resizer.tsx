import React from "react";

import "./Resizer.css";

export type ResizeDirection =
    "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left"
    | "top-left";

type ResizerProps = {
    direction: ResizeDirection,
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => void
}

class Resizer extends React.Component<ResizerProps, any> {

    render() {
        return (
            <div className={`resizer ${this.props.direction}-resizer`}
                 onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => this.props.onMouseDown(event, this.props.direction)}></div>
        );
    }
}

export default Resizer;