interface IVector2D {
    x: number;
    y: number;
    getAngel: () => number;
}
export declare class Vector2D implements IVector2D {
    x: number;
    y: number;
    constructor(x: number, y: number);
    getAngel(): number;
}
interface IBallOptions {
    radius?: number;
    color?: string;
    globalAlpha?: number;
    velocity?: Vector2D;
    position?: Vector2D;
    ctx: CanvasRenderingContext2D | null;
}
interface IBall extends IBallOptions {
    draw: () => void;
}
export declare class Ball implements IBall {
    radius: number;
    color: string;
    globalAlpha: number;
    velocity: Vector2D;
    position: Vector2D;
    ctx: CanvasRenderingContext2D | null;
    constructor(options: IBallOptions);
    draw(): void;
}
interface IFireworksOptions {
    canvas: HTMLCanvasElement;
    frequency?: number;
    density?: number;
    v0?: number;
    a?: number;
    auto?: boolean;
}
interface IFireworks extends IFireworksOptions {
    clearing?: boolean;
    launch: (options: IBallOptions) => void;
    blast: (position: Vector2D) => void;
}
interface IFireworksLuanchOptions extends Omit<IBallOptions, 'ctx'> {
}
declare class Fireworkds implements IFireworks {
    ctx: CanvasRenderingContext2D | null;
    canvas: HTMLCanvasElement;
    frequency: number;
    density: number;
    v0: number;
    auto: boolean;
    a: number;
    clearing: boolean;
    constructor(options: IFireworksOptions);
    clear: () => void;
    launch: (options?: IFireworksLuanchOptions) => void;
    blast: (position: Vector2D) => void;
}
export default Fireworkds;
