import { ChildProcessWithoutNullStreams } from "node:child_process";
import { IStreamLogger } from "../handlers/stream-logger.interface";
import { ICommandExec } from "./command.types";

export abstract class CommandExecutor<Input> {
    constructor(protected readonly logger: IStreamLogger) { }

    public async execute(): Promise<void> {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = await this.spawn(command);
        this.processStream(stream);
    }

    protected abstract prompt(): Promise<Input>;

    protected abstract build(input: Input): ICommandExec;

    protected abstract spawn(command: ICommandExec): Promise<ChildProcessWithoutNullStreams>;

    protected abstract processStream(stream: ChildProcessWithoutNullStreams): void;

}