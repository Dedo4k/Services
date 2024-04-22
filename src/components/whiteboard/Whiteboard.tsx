import React from "react";

import "./Whiteboard.css";
import Square from "./square/Square";
import ControlPanel from "./control-panel/ControlPanel";

type WhiteboardProps = {
    width: number,
    height: number
}

type WhiteboardState = WhiteboardProps & {
    dragging: boolean,
    draggingTarget?: Square,
    dragPrevX?: number,
    dragPrevY?: number,
    scrollPrevX?: number,
    scrollPrevY?: number
}

type ScrollDirection = "t" | "tr" | "r" | "br" | "b" | "bl" | "l" | "tl";

class Whiteboard extends React.Component<WhiteboardProps, WhiteboardState> {

    ref: React.RefObject<HTMLDivElement>;
    scrollIntervalId?: NodeJS.Timeout;
    scrollInterval = 0.5;
    scrollStep = 1;
    scrollEdge = 100;
    scrollDirection?: ScrollDirection;

    constructor(props: any) {
        super(props);
        this.state = {
            ...props,
            dragging: false
        }
        this.ref = React.createRef();
    }

    handleDragStart = (event: React.MouseEvent, target: Square) => {
        event.preventDefault();
        if (!this.state.dragging && target) {
            this.setState((prev) => ({
                ...prev,
                dragging: true,
                draggingTarget: target,
                dragPrevX: event.clientX,
                dragPrevY: event.clientY,
                scrollPrevX: this.ref.current?.parentElement?.scrollLeft,
                scrollPrevY: this.ref.current?.parentElement?.scrollTop
            }));
        }
    }

    handleDragEnd = (event: React.MouseEvent) => {
        if (this.state.dragging) {
            this.state.draggingTarget?.setState((prev) => ({
                ...prev,
                dragging: false
            }), () => this.setState((prev) => ({
                ...prev,
                dragging: false,
                draggingTarget: undefined
            })));
        }
        clearInterval(this.scrollIntervalId);
    }

    handleMouseMove = (event: React.MouseEvent) => {
        if (this.state.dragging && this.state.draggingTarget && this.state.dragPrevX && this.state.dragPrevY) {
            const {clientX, clientY} = event;

            const offsetX = clientX - this.state.dragPrevX!;
            const offsetY = clientY - this.state.dragPrevY!;
            this.dragTo(offsetX, offsetY, () => {
                this.setState((prev) => ({
                    ...prev,
                    dragPrevX: clientX,
                    dragPrevY: clientY
                }));
                const {offsetTop, offsetLeft} = this.ref.current!;
                const {offsetWidth, offsetHeight} = this.ref.current?.parentElement!;

                const posTop = clientY - offsetTop!;
                const posLeft = clientX - offsetLeft!;

                if (posTop < this.scrollEdge && posLeft < this.scrollEdge) {
                    this.scrollTo("tl");
                } else if (posTop > offsetHeight - this.scrollEdge && posLeft < this.scrollEdge) {
                    this.scrollTo("bl");
                } else if (posTop < this.scrollEdge && posLeft > offsetWidth - this.scrollEdge) {
                    this.scrollTo("tr");
                } else if (posTop > offsetHeight - this.scrollEdge && posLeft > offsetWidth - this.scrollEdge) {
                    this.scrollTo("br");
                } else if (posTop < this.scrollEdge) {
                    this.scrollTo("t");
                } else if (posLeft < this.scrollEdge) {
                    this.scrollTo("l");
                } else if (posTop > offsetHeight - this.scrollEdge) {
                    this.scrollTo("b");
                } else if (posLeft > offsetWidth - this.scrollEdge) {
                    this.scrollTo("r");
                } else {
                    clearInterval(this.scrollIntervalId);
                    this.scrollDirection = undefined;
                }
            });
        }
    }

    handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        if (this.state.dragging && this.state.draggingTarget) {
            const {scrollTop, scrollLeft} = event.currentTarget;

            const offsetX = scrollLeft - this.state.scrollPrevX!;
            const offsetY = scrollTop - this.state.scrollPrevY!;
            this.dragTo(offsetX, offsetY, () => this.setState((prev) => ({
                ...prev,
                scrollPrevX: scrollLeft,
                scrollPrevY: scrollTop
            })));
        }
    }

    dragTo = (offsetX: number, offsetY: number, callback?: () => void) => {
        if (this.state.dragging && this.state.draggingTarget) {
            this.state.draggingTarget.setState((prev) => ({
                ...prev,
                x: 0 <= prev.x + offsetX ? prev.x + prev.width + offsetX <= this.state.width ? prev.x + offsetX : this.state.width - prev.width! : 0,
                y: 0 <= prev.y + offsetY ? prev.y + prev.height + offsetY <= this.state.height ? prev.y + offsetY : this.state.height - prev.height! : 0
            }), callback);
        }
    }

    scrollTo = (direction: ScrollDirection) => {
        if (this.scrollDirection === direction) {
            return;
        }

        this.scrollDirection = direction;

        clearInterval(this.scrollIntervalId);
        switch (direction) {
            case "t": {
                this.scroll(0, -this.scrollStep);
                break;
            }
            case "tr": {
                this.scroll(this.scrollStep, -this.scrollStep);
                break;
            }
            case "r": {
                this.scroll(this.scrollStep, 0);
                break;
            }
            case "br": {
                this.scroll(this.scrollStep, this.scrollStep);
                break;
            }
            case "b": {
                this.scroll(0, this.scrollStep);
                break;
            }
            case "bl": {
                this.scroll(-this.scrollStep, this.scrollStep);
                break;
            }
            case "l": {
                this.scroll(-this.scrollStep, 0);
                break;
            }
            case "tl": {
                this.scroll(-this.scrollStep, -this.scrollStep);
                break;
            }
        }
    }

    scroll = (x: number, y: number) => {
        this.scrollIntervalId = setInterval(() => {
            const {scrollWidth, scrollHeight, scrollTop, scrollLeft} = this.ref.current?.parentElement!;
            const scrollToTop = scrollTop + y;
            const scrollToLeft = scrollLeft + x;
            if (!this.state.dragging) {
                clearInterval(this.scrollIntervalId);
            } else {
                this.ref.current?.parentElement?.scrollTo({
                    left: 0 <= scrollToLeft ? scrollToLeft <= scrollWidth ? scrollToLeft : 0 : 0,
                    top: 0 <= scrollToTop ? scrollToTop <= scrollHeight ? scrollToTop : 0 : 0,
                });
            }
        }, this.scrollInterval);
    }

    render() {
        const styles = {
            width: `${this.state.width}px`,
            height: `${this.state.height}px`
        }

        return (
            <div className={"whiteboard-container"} onScroll={this.handleScroll}>
                <div ref={this.ref} className={"whiteboard"}
                     onMouseUp={this.handleDragEnd}
                     onMouseMove={this.handleMouseMove}
                     onMouseLeave={this.handleDragEnd}
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