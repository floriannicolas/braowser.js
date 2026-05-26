export interface IBrowser {
    name: string | undefined;
    version: string | undefined;
    major: string | undefined;
}

export interface IOS {
    name: string | undefined;
    version: string | undefined;
}

export interface IEngine {
    name: string | undefined;
    version: string | undefined;
}

export interface IDevice {
    model: string | undefined;
    vendor: string | undefined;
    type: 'mobile' | 'tablet' | undefined;
}

export interface ICPU {
    architecture: string | undefined;
}

export interface IResult {
    ua: string;
    browser: IBrowser;
    cpu: ICPU;
    device: IDevice;
    engine: IEngine;
    os: IOS;
}

export declare class Braowser {
    constructor(ua?: string);
    getUA(): string;
    setUA(ua: string): this;
    getBrowser(): IBrowser;
    getOS(): IOS;
    getEngine(): IEngine;
    getDevice(): IDevice;
    getCPU(): ICPU;
    isMobile(): boolean;
    isTouch(): boolean;
    getResult(): IResult;
    getResultAsync(): Promise<IResult>;
    applyHtmlClasses(target?: Element | null): this;
}

export default Braowser;
