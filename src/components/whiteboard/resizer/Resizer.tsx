import React from "react";

import "./Resizer.css";

export type ResizeDirection = "top" | "right" | "bottom" | "left";

type ResizerProps = {
    direction: ResizeDirection,
    onMouseDown: (event: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => void
}

class Resizer extends React.Component<ResizerProps, any> {

    render() {
        return (
            <div className={`${this.props.direction}-resizer`}
                 onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => this.props.onMouseDown(event, this.props.direction)}></div>
        );
    }
}

export default Resizer;