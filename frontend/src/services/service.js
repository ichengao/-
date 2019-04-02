import axios from 'axios'
import { SERVER_URL } from '../common/config'

// 登录
export function requestLogin(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/login`,params)
}
// 注册
export function requestRegister(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/register`,params)
}

/**
 * 首页
 */
// 获取商店列表
export function requestShopList(){
    return axios.post(`${SERVER_URL}/zv-member/zv/home/shoplist`,{})
}
// 更新设置项
export function requestUpdateSetting(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/home/accountset`,params)
}
// 修改密码
export function requestUpdatePwd(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/changepwd`,params)
}
// 修改手机号码
export function requestUpdatePhone(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/changemobile`,params)
}
// 创建门店
export function requestaddShop(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/home/addshop`,params)
}
// 获取用户信息 
export function requestGetAccountInfo(){
    return axios.post(`${SERVER_URL}/zv-member/zv/home/accountinfo`,{})
}
// 上传图片
export function requestUploadImage(params){
    let config = {
        headers:{'Content-Type':false}
    };
    return axios.post(`/zv-member/zv/upload/oss`,params,config)
}

/**
 * 会员管理模块
 */
// 获取会员基础数据
export function requestGetMemberbaseData(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/data`,params)
}
// 获取会员列表
export function requestGetMemberList(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/list`,params)
}
// 删除会员 
export function requestDeleteMember(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/delete`,params)
}
// 会员开卡
export function requestCreateMemberCard(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/create`,params)
}
// 获取会员详细信息 
export function requestGetMemberDetail(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/detail`,params)
}
// 更新会员详细信息 
export function requestUpdateMemberDetail(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/update`,params)
}
// 获取会员卡等级
export function requestGetGradelist(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/card/gradelist`,params)
}
// 获取会员卡类型
export function requestGetTypelist(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/card/typelist`,params)
}
// 会员搜索
export function requestSearchMemberlist(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/search`,params)
}

/**
 * 充值模块
 * @param {*} params 
 */
// 会员充值
export function requestRecharge(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/order/recharge`,params)
} 
// 会员充值列表
export function requestGetSimplerecharge(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/order/simplerecharge`,params)
}


/**
 *   商品模块  
 *  */  
// 商品基础数据
export function requestGetProductData(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/data`,params)
}
// 商品列表 
export function requestGetProductList(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/goodslist`,params)
}
// 添加商品
export function requestAddProduct(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/add`,params)
}