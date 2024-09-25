import {lazy} from "react";

const LazyForm = lazy(() =>
    import("../../features/quiz/ui/QuizForm/QuizForm")
);

export default LazyForm