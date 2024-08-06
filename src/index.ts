#! /usr/bin/env node
import yargs from 'yargs'
import npmd from "./commands/npmd";
import fb from "./commands/fb";
import publish from "./commands/publish";
import docs from "./commands/docs";
import count from "./commands/count";
import {CommandObject} from "./commands/interface";

// 导入命令
const commands: CommandObject = [npmd, fb, publish, docs, count]
const argv = yargs

commands.forEach(({command, description, handler}) => {
    argv.command(command, description, handler);
});

argv.usage(`      _                   _      _
     | |  _   _   _ __   | | __ (_)  _ __     __ _ 🚀☁️
  _  | | | | | | | '_ \\  | |/ / | | | '_ \\   / _\` |
 | |_| | | |_| | | | | | |   <  | | | | | | | (_| |
  \\___/   \\__,_| |_| |_| |_|\\_\\ |_| |_| |_|  \\__, |
                                             |___/
    `)
    .usage('欢迎使用junking,提升你的效率🌞,不来试试吗？')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 🌀苏一恒').argv;