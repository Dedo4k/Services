import React from "react";

import "./Square.css";

type SquareProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    onMouseDown: (event: React.MouseEvent, target: Square) => void
}

type SquareState = SquareProps & {
    dragging: boolean,
    resizing: boolean
}

class Square extends React.Component<SquareProps, SquareState> {

    constructor(props: SquareProps) {
        super(props);
        this.state = {
            ...props,
            dragging: false,
            resizing: false
        }
    }

    onMouseDown = (event: React.MouseEvent) => {
        if (!this.state.dragging) {
            this.setState((prev) => ({
                ...prev,
                dragging: true
            }), () => this.props.onMouseDown(event, this))
        }
    };

    render() {
        const styles = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
            top: `${this.state.y}px`,
            left: `${this.state.x}px`,
            backgroundColor: this.state.color,
            cursor: this.state.dragging ? "move" : "grab"
        }

        return (
            <div className={"square"} style={styles} onMouseDown={this.onMouseDown}></div>
        );
    }
}

export default Square;