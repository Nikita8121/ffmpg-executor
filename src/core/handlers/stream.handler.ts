import { ChildProcessWithoutNullStreams } from "node:child_process";
import { IStreamLogger } from "./strem-logger.interface";

export class StreamHandler {
    constructor(private readonly logger: IStreamLogger) { }

    proccessOutput(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data.toString())
        })

        stream.stderr.on('data', (data) => {
            this.logger.error(data.toString())
        })

        stream.on('close', () => {
            this.logger.end()
        })
    }
}