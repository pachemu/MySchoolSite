import { lazy } from 'react';
import React from 'react'
const LazyConcepts = lazy(() =>
    import('./ui/Conspects')
);

export default LazyConcepts