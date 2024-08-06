import child_process from "child_process";
import {Argv} from "yargs";
import {getCtripConfCheckList} from "../getCtripConfCheckList";
import {MyArgv} from "./interface";

const command = 'publish'
const description = '发布包到npm官方'
export default {
    command: command,
    description: description,
    handler: (yargs: Argv) => {
        console.log('执行命令：💤', command, description);
        yargs = yargs.demandCommand(1, '❌ 你必须在publish后面加上新版本号，如X.X.X')
        console.log('npm config set registry https://registry.npmjs.org')
        child_process.execSync(
            'npm config set registry https://registry.npmjs.org')
        console.log('npm version ' + (yargs.argv as MyArgv)._[1])
        child_process.execSync('npm version ' + (yargs.argv as MyArgv)._[1])
        console.log('npm publish')
        child_process.execSync('npm publish')
        console.log('✅ 发布成功！🎉')
    }
}