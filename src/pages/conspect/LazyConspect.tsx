import { lazy } from 'react';
const LazyConspect = lazy(() =>
    import('./ui/Conspect')
);

export default LazyConspect