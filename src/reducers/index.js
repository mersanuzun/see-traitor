import { combineReducers } from "redux";
import githubUser from "./githubUser";
import appView from './appView.js';

export default combineReducers(
    {
        githubUser: githubUser,
        appView: appView
    }
)