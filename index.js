#! /usr/bin/env node
var child_process = require('child_process');
var argv = require('yargs')
    .command("npm源", '设置npm源为官方源', function (yargs) {
        console.log('执行命令：💤')
        console.log('npm config set registry https://registry.npmjs.org');
        child_process.execSync('npm config set registry https://registry.npmjs.org');
        console.log('✅ 将npm源更改为：官方npm源📁');
    })
    .command("taobao源", '设置npm源为淘宝源', function (yargs) {
        console.log('执行命令：💤')
        console.log('npm config set registry https://registry.npm.taobao.org');
        child_process.execSync('npm config set registry https://registry.npm.taobao.org');
        console.log('✅ 将npm源更改为：淘宝源🍑');
    })
    .command("publish", '发布包到npm官方', function (yargs) {
        yargs = yargs
            .demandCommand(1, '❌ 你必须在publish后面加上新版本号，如X.X.X');
        console.log('执行命令：💤');
        console.log('npm config set registry https://registry.npmjs.org');
        child_process.execSync('npm config set registry https://registry.npmjs.org');
        console.log('npm version ' + yargs.argv._[1]);
        child_process.execSync('npm version ' + yargs.argv._[1]);
        console.log('npm publish');
        child_process.execSync('npm publish');
        console.log('npm config set registry https://registry.npm.taobao.org');
        child_process.execSync('npm config set registry https://registry.npm.taobao.org');
        console.log('✅ 发布成功！🎉');
    })
    .command("docs", '启动docsify', function (yargs) {
        console.log('执行命令：💤')
        console.log('docsify serve docs');
        child_process.execSync('docsify serve docs',{stdio: 'inherit'});
        console.log('✅ docsify启动成功！ 🚗');
    })
    .command("push", '提交主分支到远程仓库', function (yargs) {
        yargs = yargs
            .demandCommand(1, '❌ 你必须在push后面加上commit说明');
        console.log('执行命令：💤')
        console.log('git add .');
        child_process.execSync('git add .');
        console.log('git commit -m '+yargs.argv._[1]+' .');
        child_process.execSync('git commit -m "'+yargs.argv._[1]+'" .');
        console.log('git push -u origin master');
        child_process.execSync('git push -u origin master');
        console.log('✅ git push 成功 🚗');
    })
    .usage(`      _                   _      _                 
     | |  _   _   _ __   | | __ (_)  _ __     __ _ 🚀☁️
  _  | | | | | | | '_ \\  | |/ / | | | '_ \\   / _\` |
 | |_| | | |_| | | | | | |   <  | | | | | | | (_| |
  \\___/   \\__,_| |_| |_| |_|\\_\\ |_| |_| |_|  \\__, |
                                             |___/ 
    `)
    .usage('欢迎使用junking,提升你的效率🌞,不来试试吗？')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 🌀苏一恒')
    .argv;
