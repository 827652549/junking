# junking-cli

命令行工具，提高工作效率，使用方法如下：



## 下载

```shell script
npm i -g junking
```

## 示例

### 简化npm更改源，快速发布包

你是否经历过繁琐地重置源和烦恼太长的地址，使用下面的命令吧！

```shell script
junking npm源                    设置npm源为官方源
junking taobao源                 设置npm源为淘宝源
junking publish [版本号X.X.X]     发布包到npm官方
junking docs                     启动docsify
junking push [注释]               提交主分支到远程仓库
junking count [路径（可省略）]     统计Markdown文字字数（后可以跟上需要统计的目录绝对路径，或直接省略或.以遍历整个相对目录）
junking npmd                      打开 npm 包对应的 ctrip gitlab 链接
```
### RoadMap
- [x] 优化代码结构， 聚合常量
- [x] 将每个功能拆分成独立的模块，而不是都聚在 index 中
- [ ] UT
- [ ] 优化发布版本号
- [ ] ares, 快速打开当前项目的 ares
- [ ] cp, 快速打开当前项目的 captain
- [ ] pp, 快速打开当前项目的 pipline