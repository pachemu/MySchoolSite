declare module "*.module.scss" {
    const content: { [className: string]: string };
    export = content;
}
declare module "*.svg";
declare module "*.png";
declare module "*.gif";
declare module "*.img";
declare const __PLATFORM__: "dekstop" | "mobile";
declare const __MODE__: "development" | "production";

declare module NodeJS {
    interface Module {
        hot?: {
            accept(path?: string, callback?: () => void): void;
        };
    }
}
