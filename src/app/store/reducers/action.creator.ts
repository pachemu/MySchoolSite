import {ActionCreator} from "redux";
import {AuthActionCreators} from "./auth/action-creators";

export const allActionCreators = {
    ...AuthActionCreators
}