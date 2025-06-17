import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLoggerService implements IStreamLogger {
    private static instance: ConsoleLoggerService


    private constructor() { }

    static getInstance() {
        if (!ConsoleLoggerService.instance) {
            ConsoleLoggerService.instance = new ConsoleLoggerService()
        }
        return ConsoleLoggerService.instance
    }


    end(): void {
        console.log('Done')
    }

    log(...args: any[]): void {
        console.log(...args)
    }

    error(...args: any[]): void {
        console.log(...args)
    }
}