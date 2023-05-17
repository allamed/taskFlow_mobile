import registerRootComponent from 'expo/build/launch/registerRootComponent';


import {Provider} from "react-redux";

import React from "react";
import Main from "./main";
import {store} from "./store";
function AppW(){
    return(
    <Provider store={store}>
        <Main/>
    </Provider>);
}

registerRootComponent(AppW);