import {Argv} from "yargs";
import {getCtripConfCheckList} from "../getCtripConfCheckList";

const command = 'docs'
const description = '启动docsify'
export default {
    command: command,
    description: description,
    handler: (yargs: Argv) => {
        console.log('执行命令：💤', command, description);
        try {
            getCtripConfCheckList()
        } catch (e) {
            console.log('❌ fb 异常', e)
        }
    }
}