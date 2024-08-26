import { lazy } from 'react';
import React from 'react'
const LazyMain = lazy(() =>
    import('./Main')
);

export default LazyMain