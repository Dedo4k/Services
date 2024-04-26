import React from "react";

import "./WhiteboardElement.css";
import Resizer, {ResizeDirection} from "../resizer/Resizer";

type WhiteboardElementProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    minWidth: number,
    minHeight: number,
    color: string,
    children?: React.ReactNode,
    onDragStart: (event: React.MouseEvent, target: WhiteboardElement) => void,
    onResizeStart: (event: React.MouseEvent<HTMLDivElement>, target: WhiteboardElement, resizeDirection: ResizeDirection) => void
}

type WhiteboardElementState = WhiteboardElementProps & {
    dragging: boolean,
    resizing: boolean
}

class WhiteboardElement extends React.Component<WhiteboardElementProps, WhiteboardElementState> {

    constructor(props: WhiteboardElementProps) {
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
                <Resizer direction={"top-right"} onMouseDown={this.handleResize}/>
                <Resizer direction={"right"} onMouseDown={this.handleResize}/>
                <Resizer direction={"bottom-right"} onMouseDown={this.handleResize}/>
                <Resizer direction={"bottom"} onMouseDown={this.handleResize}/>
                <Resizer direction={"bottom-left"} onMouseDown={this.handleResize}/>
                <Resizer direction={"left"} onMouseDown={this.handleResize}/>
                <Resizer direction={"top-left"} onMouseDown={this.handleResize}/>
                {this.props.children}
            </div>
        );
    }
}

export default WhiteboardElement;