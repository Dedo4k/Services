import React from "react";

import "./Whiteboard.css";
import WhiteboardElement from "./whiteboard-element/WhiteboardElement";
import ScrollReducer from "./reducers/ScrollReducer";
import DragReducer from "./reducers/DragReducer";
import ResizeReducer from "./reducers/ResizeReducer";
import {ResizeDirection} from "./resizer/Resizer";
import ScaleReducer from "./reducers/ScaleReducer";

type WhiteboardProps = {
    width: number,
    height: number,
    children?: React.ReactNode
}

type WhiteboardState = WhiteboardProps & {
    scale: number
}

class Whiteboard extends React.Component<WhiteboardProps, WhiteboardState> {

    whiteboardContainerRef: React.RefObject<HTMLDivElement>;
    whiteboardRef: React.RefObject<HTMLDivElement>;
    scrollReducer: ScrollReducer;
    dragReducer: DragReducer;
    resizeReducer: ResizeReducer;
    scaleReducer: ScaleReducer;

    constructor(props: WhiteboardProps) {
        super(props);
        this.state = {
            ...props,
            scale: 1
        }
        this.whiteboardRef = React.createRef();
        this.whiteboardContainerRef = React.createRef();
        this.scrollReducer = new ScrollReducer(this);
        this.dragReducer = new DragReducer(this);
        this.resizeReducer = new ResizeReducer(this);
        this.scaleReducer = new ScaleReducer(this);
    }

    componentDidMount() {
        this.whiteboardRef.current?.addEventListener("wheel", this.scaleReducer.handleWheel, {passive: false});
    }

    componentWillUnmount() {
        this.whiteboardRef.current?.removeEventListener("wheel", this.scaleReducer.handleWheel);
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

    handleDragStart = (event: React.MouseEvent, target: WhiteboardElement) => {
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

    handleResizeStart = (event: React.MouseEvent<HTMLDivElement>, target: WhiteboardElement, resizeDirection: ResizeDirection) => {
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
            <div ref={this.whiteboardContainerRef} className={"whiteboard-container"}
                 onScroll={this.scrollReducer.handleScroll}>
                <div style={{position: "absolute"}}>{`${Math.round(this.state.scale * 100)}%`}</div>
                <div ref={this.whiteboardRef} className={"whiteboard"}
                     onMouseUp={this.handleMouseUp}
                     onMouseMove={this.handleMouseMove}
                     onMouseLeave={this.handleMouseLeave}
                     style={styles}>
                    {React.Children.map(this.props.children, (child) => (
                        <WhiteboardElement x={100} y={100} width={100} height={50} minWidth={100} minHeight={50}
                                           scale={this.state.scale}
                                           color={"red"}
                                           onDragStart={this.handleDragStart}
                                           onResizeStart={this.handleResizeStart}>
                            {child}
                        </WhiteboardElement>
                    ))}
                </div>
            </div>
        );
    }
}

export default Whiteboard;