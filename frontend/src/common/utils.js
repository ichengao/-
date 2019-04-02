// 获取时间   今日 昨日 本周 其它
export function getDate(params){
    let day = new Date();
    switch (params){
        case '01':
            return day.format("yyyy-MM-dd");
            break;
        case '02':
            day.setDate(day.getDate() - 1);
            return day.format("yyyy-MM-dd");
        case '03':
            day.setDate(day.getDate() - 7);
            return day.format("yyyy-MM-dd");
        case '04':
 
    }
}