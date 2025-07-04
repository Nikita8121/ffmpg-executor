import { ICommandExec } from "../../core/executor/command.types";

export interface ICommandExecFfmpegInput {
    width: number;
    height: number;
    path: string;
    name: string;
}


export interface ICommandExecFfmpeg extends ICommandExec {
    outputPath: string;
}