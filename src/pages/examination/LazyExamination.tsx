import { lazy } from 'react';
import React from 'react'
const LazyExamination = lazy(() =>
    import('./ui/Examination')
);

export default LazyExamination