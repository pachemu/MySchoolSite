import { lazy } from 'react';
import React from 'react'
const LazyMain = lazy(() =>
    import('./ui/Main')
);

export default LazyMain