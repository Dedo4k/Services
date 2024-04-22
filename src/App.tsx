import React from 'react';

import './App.css';
import {Content, Sidebar} from "./layouts";
import {Route, Routes} from "react-router-dom";
import {FirstPage, MainPage, SecondPage} from "./pages";

class App extends React.Component<any, any> {

  render() {
    return (
        <div className={"app"}>
          {/*<Header/>*/}
          <Sidebar/>
          <Content>
            <Routes>
              <Route path={"/"} element={<MainPage/>}/>
              <Route path={"/first"} element={<FirstPage/>}/>
              <Route path={"/second"} element={<SecondPage/>}/>
            </Routes>
          </Content>
        </div>
    );
  }
}

export default App;
