import React from "react";

import "./Whiteboard.css";
import Square from "./square/Square";
import ControlPanel from "./control-panel/ControlPanel";
import ScrollReducer from "./reducers/ScrollReducer";
import DragReducer from "./reducers/DragReducer";

type WhiteboardProps = {
    width: number,
    height: number
}

type WhiteboardState = WhiteboardProps & {}

class Whiteboard extends React.Component<WhiteboardProps, WhiteboardState> {

    ref: React.RefObject<HTMLDivElement>;
    scrollReducer: ScrollReducer;
    dragReducer: DragReducer;

    constructor(props: any) {
        super(props);
        this.state = {
            ...props,
            dragging: false
        }
        this.ref = React.createRef();
        this.scrollReducer = new ScrollReducer(this);
        this.dragReducer = new DragReducer(this);
    }

    handleDragStart = (event: React.MouseEvent, target: Square) => {
        event.preventDefault();
        if (!this.dragReducer.dragging && target) {
            this.dragReducer.dragInit(target, event);
            this.scrollReducer.scrollInit();
        }
    }

    handleMouseUp = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging) {
            this.handleDragEnd();
        }
    }

    handleMouseLeave = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging) {
            this.handleDragEnd();
        }
    }

    handleMouseMove = (event: React.MouseEvent) => {
        if (this.dragReducer.dragging && this.dragReducer.draggingTarget) {
            this.dragReducer.handleDrag(event);
        }
    }

    handleDragEnd = () => {
        this.dragReducer.dragStop();
        this.scrollReducer.stopScroll()
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
                    <Square x={100} y={100} width={50} height={50} color={"red"}
                            onMouseDown={this.handleDragStart}/>
                    <Square x={200} y={200} width={50} height={50} color={"green"}
                            onMouseDown={this.handleDragStart}/>
                </div>
            </div>
        );
    }
}

export default Whiteboard;