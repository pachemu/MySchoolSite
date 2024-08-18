import {lazy} from "react";
const lazyAbout = lazy(() => import('./About') )
export default lazyAbout;