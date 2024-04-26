import React from "react";

import "./MainPage.css";
import {Dashboard} from "../../components";

class MainPage extends React.Component<any, any> {

    render() {
        return (
            <div className={"main-page"}>
                <Dashboard/>
            </div>
        );
    }
}

export default MainPage;