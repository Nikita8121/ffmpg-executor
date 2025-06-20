export enum PromptType {
    Input = 'input',
    Number = 'number',
    Password = 'password'
}

export type PromptResult<T> = T extends PromptType.Number ? number : string