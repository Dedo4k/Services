import React from "react";

import "./Square.css";
import Resizer, {ResizeDirection} from "../resizer/Resizer";

type SquareProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    minWidth: number,
    minHeight: number,
    color: string,
    onDragStart: (event: React.MouseEvent, target: Square) => void,
    onResizeStart: (event: React.MouseEvent<HTMLDivElement>, target: Square, resizeDirection: ResizeDirection) => void
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
            }), () => this.props.onDragStart(event, this))
        }
    };

    handleResize = (event: React.MouseEvent<HTMLDivElement>, resizeDirection: ResizeDirection) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onResizeStart && this.props.onResizeStart(event, this, resizeDirection);
    }

    render() {
        const styles = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`,
            minWidth: `${this.state.minWidth}px`,
            minHeight: `${this.state.minHeight}px`,
            top: `${this.state.y}px`,
            left: `${this.state.x}px`,
            backgroundColor: this.state.color,
            cursor: this.state.dragging ? "move" : "grab"
        }

        return (
            <div className={"square"} style={styles} onMouseDown={this.onMouseDown}>
                <Resizer direction={"top"} onMouseDown={this.handleResize}/>
                <Resizer direction={"right"} onMouseDown={this.handleResize}/>
                <Resizer direction={"bottom"} onMouseDown={this.handleResize}/>
                <Resizer direction={"left"} onMouseDown={this.handleResize}/>
            </div>
        );
    }
}

export default Square;