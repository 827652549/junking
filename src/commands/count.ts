import child_process from "child_process";
import {Argv} from "yargs";
import {getCtripConfCheckList} from "../getCtripConfCheckList";
import {CountMD} from "../countMD";
import {MyArgv} from "./interface";

const command = 'count'
const description = '统计Markdown文字字数（后可以跟上需要统计的目录绝对路径，或直接省略或.以遍历整个相对目录）'
export default {
    command: command,
    description: description,
    handler: (yargs: Argv) => {
        console.log('执行命令：💤', command, description);
        let currPath
        if ((yargs.argv as MyArgv)._[1] === '.' || (yargs.argv as MyArgv)._[1] === undefined) {
            currPath = child_process.execSync('pwd').toString('utf8').trim()
        } else {
            currPath = (yargs.argv as MyArgv)._[1]
        }
        CountMD(currPath as string)
    }
}