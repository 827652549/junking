#! /usr/bin/env node
import {CountMD} from "./countMD";
import child_process from 'child_process'
import yargs from 'yargs'
import {getCtripConfCheckList} from "./getCtripConfCheckList";

interface Argv {
    [x: string]: unknown;
    _: (string | number)[];
    $0: string;
}

const argv = yargs.command('npmd', '打开 gitlab npm deploy 发布页面', function (yargs) {
    console.log('执行命令：💤', 'npmd', '打开 gitlab npm deploy 发布页面')
    // console.log('npm config set registry https://registry.npmjs.org')
    try {
        const git_remote_origin = child_process.execSync('git config --get remote.origin.url').toString().trim()
        const curr_branch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
        const gitlab_url = git_remote_origin.replace('git@', 'http://').replace('com:', 'com/').replace('.git', '/') + 'npm_deploys/' + curr_branch
        child_process.execSync(
            'open ' + gitlab_url)
        console.log('✅ 打开：官方npm deploy源📁：' + gitlab_url)
    } catch (e) {
        console.log('❌ 请在git项目根目录下执行此命令', e)
    }
})
    .command('fb', '打开你需要的 conf 发布 checklist', function (yargs) {
        console.log('执行命令：💤', 'fb', '打开你需要的 conf发布 checklist')
        // console.log('npm config set registry https://registry.npmjs.org')
        try {
            getCtripConfCheckList()
        } catch (e) {
            console.log('❌ fb 异常', e)
        }
    })
    .command('npm源', '设置npm源为官方源', function (yargs) {
        console.log('执行命令：💤')
        console.log('npm config set registry https://registry.npmjs.org')
        child_process.execSync(
            'npm config set registry https://registry.npmjs.org')
        console.log('✅ 将npm源更改为：官方npm源📁')
    }).command('taobao源', '设置npm源为淘宝源', function (yargs) {
        console.log('执行命令：💤')
        console.log('npm config set registry https://registry.npm.taobao.org')
        child_process.execSync(
            'npm config set registry https://registry.npm.taobao.org')
        console.log('✅ 将npm源更改为：淘宝源🍑')
    }).command('publish', '发布包到npm官方', function (yargs) {
        yargs = yargs.demandCommand(1, '❌ 你必须在publish后面加上新版本号，如X.X.X')
        console.log('执行命令：💤')
        console.log('npm config set registry https://registry.npmjs.org')
        child_process.execSync(
            'npm config set registry https://registry.npmjs.org')
        console.log('npm version ' + (yargs.argv as Argv)._[1])
        child_process.execSync('npm version ' + (yargs.argv as Argv)._[1])
        console.log('npm publish')
        child_process.execSync('npm publish')
        // console.log('npm config set registry https://registry.npm.taobao.org')
        // child_process.execSync(
        //     'npm config set registry https://registry.npm.taobao.org')
        console.log('✅ 发布成功！🎉')
    }).command('docs', '启动docsify', function (yargs) {
        console.log('执行命令：💤')
        console.log('docsify serve docs')
        child_process.execSync('docsify serve docs', {stdio: 'inherit'})
        console.log('✅ docsify启动成功！ 🚗')
    }).command('push', '提交主分支到远程仓库', function (yargs) {
        yargs = yargs.demandCommand(1, '❌ 你必须在push后面加上commit说明')
        console.log('执行命令：💤')
        console.log('git add .')
        child_process.execSync('git add .')
        console.log('git commit -m ' + (yargs.argv as Argv)._[1] + ' .')
        child_process.execSync('git commit -m "' + (yargs.argv as Argv)._[1] + '" .')
        console.log('git push -u origin master')
        child_process.execSync('git push -u origin master')
        console.log('✅ git push 成功 🚗')
    }).command('count', '统计Markdown文字字数（后可以跟上需要统计的目录绝对路径，或直接省略或.以遍历整个相对目录）', function (yargs) {
        console.log('执行命令：💤')
        let currPath
        if ((yargs.argv as Argv)._[1] === '.' || (yargs.argv as Argv)._[1] === undefined) {
            currPath = child_process.execSync('pwd').toString('utf8').trim()
        } else {
            currPath = (yargs.argv as Argv)._[1]
        }
        CountMD(currPath as string)
    }).usage(`      _                   _      _
     | |  _   _   _ __   | | __ (_)  _ __     __ _ 🚀☁️
  _  | | | | | | | '_ \\  | |/ / | | | '_ \\   / _\` |
 | |_| | | |_| | | | | | |   <  | | | | | | | (_| |
  \\___/   \\__,_| |_| |_| |_|\\_\\ |_| |_| |_|  \\__, |
                                             |___/
    `).usage('欢迎使用junking,提升你的效率🌞,不来试试吗？').help('h').alias('h', 'help').epilog('copyright 🌀苏一恒').argv;

