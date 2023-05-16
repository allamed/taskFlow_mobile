import registerRootComponent from 'expo/build/launch/registerRootComponent';


import {Provider} from "react-redux";

import React from "react";
import App from "./App";
import {store} from "./store";
function AppW(){
    return(
    <Provider store={store}>
        <App/>
    </Provider>);
}

registerRootComponent(AppW);