import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../../app/store/StoreProvider";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector