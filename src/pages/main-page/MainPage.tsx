import React from "react";

import "./MainPage.css";
import {Whiteboard} from "../../components";

class MainPage extends React.Component<any, any> {

    render() {
        return (
            <div className={"main-page"}>
                <Whiteboard width={10000} height={10000}/>
            </div>
        );
    }
}

export default MainPage;