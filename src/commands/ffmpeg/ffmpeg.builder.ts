import { ICommandExecFfmpegInput } from "./ffmpeg.types";

export class FfmpegBuilder {
    private input?: string;
    private output?: string;
    private options: Map<string, string> = new Map();

    constructor() {
        this.options.set('-c:v', 'libx264');
    }

    inputPath(path: string) {
        this.input = path;
        return this;
    }

    setVideoSize(width: number, height: number) {
        this.options.set('-s', `${width}x${height}`);
        return this;
    }

    outputPath(path: string) {
        if (!this.input) {
            throw new Error('Input is not set');
        }

        this.output = path;
        return this;
    }

    build(): string[] {
        if (!this.input || !this.output) {
            throw new Error('Input and output are required');
        }

        const args: string[] = ['-i', this.input];

        this.options.forEach((value, key) => {
            args.push(key, value);
        });

        args.push(this.output);

        return args;
    }
}