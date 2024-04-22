import React from "react";

import "./Content.css";

type ContentProps = {
    children?: React.ReactNode
}

class Content extends React.Component<ContentProps, any> {

    render() {
        return (
            <div className={"content"}>
                {this.props.children}
            </div>
        );
    }
}

export default Content;