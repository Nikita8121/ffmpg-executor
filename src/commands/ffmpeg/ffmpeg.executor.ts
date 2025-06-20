import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExec } from "../../core/executor/command.types";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { PromptType } from "../../core/prompt/prompt.type";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { ICommandExecFfmpeg, ICommandExecFfmpegInput } from "./ffmpeg.types";
import { StreamHandler } from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<ICommandExecFfmpegInput> {
    constructor(
        logger: IStreamLogger,
        private readonly fileService: FileService,
        private readonly promptService: PromptService,
    ) {
        super(logger);
    }

    protected async prompt(): Promise<ICommandExecFfmpegInput> {
        const width = await this.promptService.prompt('Width', PromptType.Number);
        const height = await this.promptService.prompt('Height', PromptType.Number);
        const path = await this.promptService.prompt('Path', PromptType.Input);
        const name = await this.promptService.prompt('Name', PromptType.Input);

        return { width, height, path, name };
    }

    protected build(input: ICommandExecFfmpegInput): ICommandExecFfmpeg {
        const { width, height, path, name } = input;
        const output = this.fileService.getFilePath(path, name, 'mp4');

        const builder = new FfmpegBuilder();

        return {
            command: 'ffmpeg',
            args: builder.inputPath(input.path).setVideoSize(width, height).outputPath(output).build(),
            outputPath: output
        }
    }

    protected async spawn(command: ICommandExecFfmpeg): Promise<ChildProcessWithoutNullStreams> {
        await this.fileService.deleteFileIfExists(command.outputPath);
        return spawn(command.command, command.args);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams): void {
        const handler = new StreamHandler(this.logger);
        handler.proccessOutput(stream);
    }
}