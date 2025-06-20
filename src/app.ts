import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { CommandExecutor } from "./core/executor/command.executor";
import { FileService } from "./core/files/file.service";
import { PromptService } from "./core/prompt/prompt.service";
import { PromptType } from "./core/prompt/prompt.type";
import { ConsoleLoggerService } from "./out/console-logger/console-logger";

export class App {

    constructor(
        private readonly promptService: PromptService,
        private readonly ffmpgExecutor: FfmpegExecutor,
    ) { }


    private async selectCommand(): Promise<CommandExecutor<unknown>> {
        const command = await this.promptService.prompt('Enter command name from this list - ffmpeg', PromptType.Input)
        switch (command) {
            case 'ffmpeg':
                return this.ffmpgExecutor
            default:
                throw new Error('Command not found')
        }
    }

    async run() {
        const command = await this.selectCommand()
        await command.execute()
    }
}

const promptService = new PromptService()
const fileService = new FileService()
const logger = ConsoleLoggerService.getInstance()
const ffmpegExecutor = new FfmpegExecutor(logger, fileService, promptService)

const app = new App(promptService, ffmpegExecutor);
app.run();