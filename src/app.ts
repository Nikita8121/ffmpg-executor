import { PromptService } from "./core/prompt/prompt.service";

export class App {
    async run() {
        const res = await new PromptService().input<string>('Enter your name', 'input')
        console.log(res)
    }
}

const app = new App();
app.run();