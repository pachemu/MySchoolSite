import { lazy } from 'react';
import React from 'react'
const LazyGame = lazy(() =>
    import('./ui/Game')
);

export default LazyGame