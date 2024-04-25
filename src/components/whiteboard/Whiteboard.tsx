import React from "react";

import "./Whiteboard.css";
import Square from "./square/Square";
import ControlPanel from "./control-panel/ControlPanel";
import ScrollReducer from "./reducers/ScrollReducer";
import DragReducer from "./reducers/DragReducer";
import ResizeReducer from "./reducers/ResizeReducer";
import {ResizeDirection} from "./resizer/Resizer";

type WhiteboardProps = {
    width: number,
    height: number
}

type WhiteboardState = WhiteboardProps & {}

class Whiteboard extends React.Component<WhiteboardProps, WhiteboardState> {

    ref: React.RefObject<HTMLDivElement>;
    scrollReducer: ScrollReducer;
    dragReducer: DragReducer;
    resizeReducer: ResizeReducer;

    constructor(props: any) {
        super(props);
        this.state = {
            ...props,
            dragging: false
        }
        this.ref = React.createRef();
        this.scrollReducer = new ScrollReducer(this);
        this.dragReducer = new DragReducer(this);
        this.resizeReducer = new ResizeReducer(this);
    }

    handleMouseUp = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging) {
            this.handleDragEnd();
        }
        if (this.resizeReducer.resizing) {
            this.resizeReducer.resizeStop();
        }
    }

    handleMouseLeave = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging) {
            this.handleDragEnd();
        }
        if (this.resizeReducer.resizing) {
            this.resizeReducer.resizeStop();
        }
    }

    handleMouseMove = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging && this.dragReducer.draggingTarget) {
            this.dragReducer.handleDrag(event);
        }
        if (this.resizeReducer.resizing && this.resizeReducer.resizingTarget) {
            this.resizeReducer.handleResize(event);
        }
    }

    handleDragStart = (event: React.MouseEvent, target: Square) => {
        event.preventDefault();
        if (!this.dragReducer.dragging && target) {
            this.dragReducer.dragStart(target, event);
            this.scrollReducer.scrollStart();
        }
    }

    handleDragEnd = () => {
        this.dragReducer.dragStop();
        this.scrollReducer.scrollStop();
    }

    handleResizeStart = (event: React.MouseEvent<HTMLDivElement>, target: Square, resizeDirection: ResizeDirection) => {
        if (!this.resizeReducer.resizing && target) {
            this.resizeReducer.resizeStart(event, target, resizeDirection);
            this.scrollReducer.scrollStart();
        }
    }

    render() {
        const styles = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }

        return (
            <div className={"whiteboard-container"} onScroll={this.scrollReducer.handleScroll}>
                <div ref={this.ref} className={"whiteboard"}
                     onMouseUp={this.handleMouseUp}
                     onMouseMove={this.handleMouseMove}
                     onMouseLeave={this.handleMouseLeave}
                     style={styles}>
                    <ControlPanel/>
                    <Square x={100} y={100} width={100} height={50} minWidth={100} minHeight={50} color={"red"}
                            onDragStart={this.handleDragStart}
                            onResizeStart={this.handleResizeStart}/>
                    <Square x={200} y={200} width={50} height={100} minWidth={50} minHeight={100} color={"green"}
                            onDragStart={this.handleDragStart}
                            onResizeStart={this.handleResizeStart}/>
                </div>
            </div>
        );
    }
}

export default Whiteboard;