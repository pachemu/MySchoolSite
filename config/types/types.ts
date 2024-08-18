export interface Options {
    mode: "development" | "production" | "none";
    port: number;
    paths: {
        html: string;
        entry: string;
        output: string;
        src: string;
        public: string;
    };
    analyzer?: boolean;
    platform?: "mobile" | "dekstop";
};
