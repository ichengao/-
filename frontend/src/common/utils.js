// 获取时间   今日 昨日 本周 其它
export function getDate(params){
    let day = new Date();
    switch (params){
        case '01':
            return {
                startDate: day.toLocaleDateString().replace(/\//g,'-'),
                endDate: day.toLocaleDateString().replace(/\//g,'-'),
            }
        case '02':
            return {
                startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString().replace(/\//g,'-'),
                endDate: new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString().replace(/\//g,'-'),
            }
        case '03':
            return {
                startDate: new Date(day.setDate(day.getDate() - 7)).toLocaleDateString().replace(/\//g,'-'),
                endDate: new Date().toLocaleDateString().replace(/\//g,'-'),
            }
        case '04':
            return {
                startDate: '1990-1-1',
                endDate: new Date(day.setDate(day.getDate() - 7)).toLocaleDateString().replace(/\//g,'-'),
            }
    }
}
