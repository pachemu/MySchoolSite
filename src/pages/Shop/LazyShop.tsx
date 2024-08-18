import React, {lazy, Suspense} from "react";
const lazyShop = lazy(() => import('./Shop') )
export default lazyShop