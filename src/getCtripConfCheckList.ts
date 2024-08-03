const {execSync} = require('child_process');

export interface _expandable {
    content: string;
}

export interface Storage {
    value: string;
    representation: string;
    _expandable: _expandable;
}

export interface _expandable {
    editor: string;
    view: string;
    export_view: string;
    styled_view: string;
    anonymous_export_view: string;
}

export interface Body {
    storage: Storage;
    _expandable: _expandable;
}

export interface Extension {
    position: string;
}

export interface _link {
    webui: string;
    edit: string;
    tinyui: string;
    self: string;
}

export interface _expandable {
    container: string;
    metadata: string;
    operations: string;
    children: string;
    restrictions: string;
    history: string;
    ancestors: string;
    version: string;
    descendants: string;
    space: string;
}

export interface Result {
    id: string;
    type: string;
    status: string;
    title: string;
    body: Body;
    extensions: Extension;
    _links: _link;
    _expandable: _expandable;
}

export interface _link {
    self: string;
    base: string;
    context: string;
}

export interface RootObject {
    results: Result[];
    start: number;
    limit: number;
    size: number;
    _links: _link;
}

/**
 * 发布 checklist 链接 获取规则
 * 1. 如果今天是周二，则获取明天周三的链接（常规发布），如果没有则获取今天周二的，是紧急发布
 * 2. 如果今天是周三，则获取周三的链接
 * 3. 如果都不是，则获取当天的链接
 *
 * 目录结构：
 * - root
 *  - 2024 发布
 *   - 2024-03 SOP
 *    - 2024-03-01
 *    - 2024-03-02
 *    - 2024-04 SOP
 *    - 2024-04-01
 *    - 2024-04-02
 */
export function getCtripConfCheckList() {
    const date = new Date();
    const year = date.getFullYear() + '';
    const month = (date.getMonth() + 1 + '').padStart(2, '0');
    const day = date.getDate() + '';
    const whichWeek = date.getDay();

    try {
        // 当前的 conf pageid，默认为发布根目录
        let currConfPageId = '2278137425';


        // 使用 curl 进行 HTTP 请求
        // 获取根目录
        const data1: RootObject = getResponse(currConfPageId);
        // 获取当年度的目录
        currConfPageId = data1.results.find(e => e.title.includes(year))?.id || '';
        const data2: RootObject = currConfPageId && getResponse(currConfPageId);
        // 获取当月的目录
        currConfPageId = data2?.results.find(e => e.title.includes(`${year}-${month}`))?.id || '';
        const data3: RootObject = currConfPageId && getResponse(currConfPageId);

        // 获取当天的目录
        const formatToday = `${year}-${month}-${day.padStart(2, '0')}`;
        console.log('今天是',formatToday, '周', whichWeek)
        currConfPageId = '-'
        if (data3) {
            for (let i = 0; i < data3.results.length; i++) {
                const e = data3.results[i];
                const isToday = e.title.includes(formatToday);

                if ((whichWeek === 2 && isToday) || whichWeek === 3) {
                    const targetDay = whichWeek === 2
                        ? data3.results.find(e => e.title.includes(`${year}-${month}-${(parseInt(day) + 1).toString().padStart(2, '0')}`))
                        : e;

                    if (targetDay) {
                        openUrlByPageId(targetDay.id + '', '今天是周二，常规发布 checklist 已新建，打开次日的常规发布')
                        return
                    } else {
                        currConfPageId = e.id;
                        openUrlByPageId(e.id + '', '今天是周二，常规发布 checklist 未新建，打开今天的常规发布')
                        return
                    }
                    break;
                }
            }
            if (currConfPageId === '-') {
                openUrlByPageId(data3.results.at(-1)?.id || '', '非周二周三，打开当月最新的')
            }
        }
    } catch (error: any) {
        console.error(error);
        console.log(JSON.stringify({items: [{title: 'Error', subtitle: error.message, arg: ''}]}));
    }

    function getResponse(currConfPageId: string) {
        const headersStr = `-H "Content-Type: application/json" -H "Authorization: Bearer NTI5NTQ3OTEyNTU0Oghc5UoBGEVT44s69BEAmnznesoD"`;
        const url = `http://conf.ctripcorp.com/rest/api/content/${currConfPageId}/child/page`;
        return JSON.parse(execSync(`curl ${headersStr} ${url}`,{}));
    }

    function openUrlByPageId(pageId: string, message?: string) {
        const url = `http://conf.ctripcorp.com/pages/viewpage.action?pageId=${pageId}`
        try {
            console.log(message, url)
            execSync(`open ${url}`);
        } catch (e) {
            console.error(e)
        }
    }
}
