import yargs from "yargs";

export interface MyArgv {
    [x: string]: unknown;

    _: (string | number)[];
    $0: string;
}

export type CommandObject = { command: string, description: string, handler: (yargs: yargs.Argv) => void }[]