import React from "react";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";
import {SERVICES_LOGO} from "../../resources";

class Sidebar extends React.Component<any, any> {

    render() {

        return (
            <div className={"sidebar"}>
                <NavLink type={"button"} to={"/"} className={({isActive, isPending}) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }>
                    <div className={"logo"}>
                        <img src={SERVICES_LOGO} alt="sidebar-logo"/>
                        <h2>SERVICES</h2>
                    </div>
                </NavLink>
                <div className={"nav-section"}>
                    <NavLink type={"button"} to={"/"} className={({isActive, isPending}) =>
                        "nav-item " + (isPending ? "pending" : isActive ? "active" : "")
                    }>
                        <i className="ri-home-4-line"></i>
                        <h3>Main</h3>
                    </NavLink>
                    <NavLink type={"button"} to={"/first"} className={({isActive, isPending}) =>
                        "nav-item " + (isPending ? "pending" : isActive ? "active" : "")
                    }>
                        <i className="ri-user-6-line"></i>
                        <h3>First</h3>
                    </NavLink>
                    <NavLink type={"button"} to={"/second"} className={({isActive, isPending}) =>
                        "nav-item " + (isPending ? "pending" : isActive ? "active" : "")
                    }>
                        <i className="ri-history-line"></i>
                        <h3>Second</h3>
                    </NavLink>
                </div>
                <div className={"user-section"}>
                    <NavLink type={"button"} to={"/first"} className={({isActive, isPending}) =>
                        "nav-item " + (isPending ? "pending" : isActive ? "active" : "")
                    }>
                        <i className="ri-user-6-line"></i>
                        <h3>First</h3>
                    </NavLink>
                    <NavLink type={"button"} to={"/second"} className={({isActive, isPending}) =>
                        "nav-item " + (isPending ? "pending" : isActive ? "active" : "")
                    }>
                        <i className="ri-history-line"></i>
                        <h3>Second</h3>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Sidebar;