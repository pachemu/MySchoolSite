import { lazy } from 'react';
import React from 'react'
const LazyLogin = lazy(() =>
    import('./ui/Login')
);

export default LazyLogin