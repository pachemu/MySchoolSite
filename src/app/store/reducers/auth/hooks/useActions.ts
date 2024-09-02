import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../StoreProvider";
import {bindActionCreators} from "redux";
import {allActionCreators} from "../../action.creator";

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(allActionCreators, dispatch)
}