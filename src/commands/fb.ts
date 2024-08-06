import child_process from "child_process";
import {Argv} from "yargs";
import {getCtripConfCheckList} from "../getCtripConfCheckList";

const command = 'fb'
const description = '打开你需要的 conf 发布 checklist'
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