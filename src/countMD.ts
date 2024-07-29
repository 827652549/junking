import fs from 'fs'
import path from 'path'

/**
 * 统计Markdown字数和行数
 * @param pathStr
 * @constructor
 */
function CountMD(pathStr = '.'){

// 获取命令行参数
  let parm = process.argv.splice(2)
// 第一个参数是路径
  let rootPath = pathStr
// 后面的所有参数都是文件后缀
  let types = ['.md','.MD','.markdown','.MarkDown','.Markdown','.MARKDOWN']
// 需要过滤的文件夹
  let filter = ['/node_modules']
// 统计结果
  let num = 0

// 文字总结果
  let wordsCount = 0

// 获取行数
  async function line(path:string) {
    let repBuffer = fs.readFileSync(path)
    const rep = repBuffer.toString()
    let len = rep.match(
      /([\u0800-\u4e00]+?|[\u4e00-\u9fa5]+?|[a-zA-Z0-9]+|[，："、【】。；「」《》？！…（）])/g
    ).length
    wordsCount += len
    let lines = rep.split('\n')
    console.log(path+' '+len+'字'+' '+lines.length+'行')
    num += lines.length
  }

// 递归所有文件夹统计
  async function start(pt:string) {
    let files = fs.readdirSync(pt)
    files
    .map(file => {
      return `${pt}/${file}`
    })
    .forEach(file => {
      let stat = fs.statSync(file)
      if (stat.isDirectory()) {
        for (let i = 0; i < filter.length; i++) {
          if (pt.search(`${filter[i]}`)!==-1){
            return
          }
        }
        start(file)
        return
      }
      let ext = path.extname(file)
      if (types.indexOf(ext) !== -1) {
        line(file)
      }
    })
  }

  (async () => {
    await start(rootPath)
    console.log(`总字数：${wordsCount}`)
    console.log(`总行数：${num}`)
  })()
}

export {CountMD}