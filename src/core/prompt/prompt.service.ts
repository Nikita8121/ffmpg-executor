import inquirer from "inquirer";
import { PromptResult, PromptType } from "./prompt.type";



export class PromptService {
    public async prompt<T extends PromptType>(message: string, type: T): Promise<PromptResult<T>> {
        const { result } = await inquirer.prompt<{ result: PromptResult<T> }>([
            {
                type: type,
                name: 'result',
                message: message
            }
        ])

        return result
    }
}