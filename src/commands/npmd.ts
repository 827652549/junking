import child_process from "child_process";
import {Argv} from "yargs";

const command = 'npmd'
const description = '打开 gitlab npm deploy 发布页面'
export default {
    command: command,
    description: description,
    handler: (yargs: Argv) => {
        console.log('执行命令：💤', command, description);
        try {
            const git_remote_origin = child_process.execSync('git config --get remote.origin.url').toString().trim();
            const curr_branch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
            const gitlab_url = git_remote_origin.replace('git@', 'http://').replace('com:', 'com/').replace('.git', '/') + 'npm_deploys/' + curr_branch;
            child_process.execSync('open ' + gitlab_url);
            console.log('✅ 打开：官方npm deploy源📁：' + gitlab_url);
        } catch (e) {
            console.log('❌ 请在git项目根目录下执行此命令', e);
        }
    }
}