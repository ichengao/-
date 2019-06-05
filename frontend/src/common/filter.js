// 时间戳转化
let timeStampTrans = value => {
    value = Number(value);
    if(value < 0 ){return ''}
    let dateArr = new Date(value).toLocaleDateString().split('/');
    let newDateArr = [];
    dateArr.map(item=>{
        item = item.length == 1 ? `0${item}` : item;
        newDateArr.push(item)
    });
    return newDateArr.join('-');
};

export { timeStampTrans }
