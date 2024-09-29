import { lazy } from 'react';
const LazyConcepts = lazy(() =>
    import('./ui/Conspects')
);

export default LazyConcepts