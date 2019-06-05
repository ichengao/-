import axios from 'axios'
import { SERVER_URL } from '../common/config'

// 登录
export function requestLogin(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/login`,params)
}
// 退出登录
export function requestLogout(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/logout`,params)
}
// 注册
export function requestRegister(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/action/register`,params)
}
// 获取验证码
export function requestGetRegisterCode(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/msg/register`,params)
}
// 获取功能列表
export function requestGetShopGetcontent(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/getcontent`,params)
}
/**
 * 字典模块
 */
// 获取数据字典
export function requestGetDictList(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/dict/list`,params)
}
// 获取字典
export  function requestGetDictShopList(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/dict/shopdict`,params)
}
// 获取省
export function requestGetProvice(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/common/province`,params)
}
// 获取市
export function requestGetCity(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/common/city`,params)
}
// 获取区
export function requestGetDistrict(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/common/district`,params)
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
// 更新会员卡等级
export function requestUpdateGradelist(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/card/updategrade`,params)
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
// 会员冲次
export function requestRechargetimes(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/order/rechargetimes`,params)
}
// 会员充次列表
export function requestGetSimplerechargetimes(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/order/simplerechargetimes`,params)
}
// 会员充次列表
export function requestGetTimescardlist(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/member/timescardlist`,params)
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
// 更新商品
export function requestUpdateProduct(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/update`,params)
}
// 添加商品大类
export function requestAddcategory(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/addcategory`,params)
}
// 获取商品大类
export function requestGetGoodsmenu(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/goodsmenu`,params)
}
// 删除商品或目录
export function requestDeleteGoods(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/del`,params)
}
// 获取服务列表
export function requestGetServerlist(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/serverlist`,params)
}
// 还款
export function requestGetRefund(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/refund`,params)
}

/**
 * 积分模块
 */
// 积分新增或删除
export function requestGetIntegralOperate(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/integral/operate`,params)
}
// 积分操作日志
export function requestGetIntegralList(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/integral/list`,params)
}

/**
 * 礼品模块
 */
// 查看礼品
export function requestGetGiftList(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/gift/list`,params)
}
// 新增礼品
export function requestAddGift(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/gift/add`,params)
}
// 更新礼品
export function requestUpdateGift(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/gift/update`,params)
}
// 删除礼品
export function requestDeleteGift(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/gift/del`,params)
}


/**
 * 库存管理，供应商管理
 */
// 供应商列表
export function requestGetWarehouseSupplierlist(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/supplierlist`,params)
}
// 新增供应商
export function requestAddsupplier(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/addsupplier`,params)
}
// 删除供应商
export function requestDelsupplier(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/delsupplier`,params)
}
// 更新供应商
export function requestUpdatesupplier(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/updatesupplier`,params)
}
// 仓库列表
export function requestGetWarehouselist(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/list`,params)
}
// 新增仓库
export function requestAddWarehouse(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/add`,params)
}
// 删除仓库
export function requestDelwarehouse(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/del`,params)
}
// 更新仓库
export function requestUpdatewarehouse(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/warehouse/update`,params)
}
// 创建进货订单
export function requestCreateStockOrder(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/stock`,params)
}

/**
 * 商品盘点
 */
// 商品盘点列表
export function requestGetInventorylist(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/inventorylist`,params)
}
// 更新商品数量
export function requestUpdateInventory(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/inventoryadjust`,params)
}
// 商品盘点日志
export function requestInventoryLog(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/inventorylog`,params)
}
// 查看库存
export function requestGoodsstockprice(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/goods/goodsstockprice`,params)
}
// 供货记录
export function requestStockorder(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/stockorder`,params)
}
// 采购进货订单详情
export function requestStockorderdetail(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/stockorderdetail`,params)
}
// 采购退货
export function requestStockReturn(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/return`,params)
}
// 采购退货订单列表
export function requestStockReturnList(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/purchase/returnorder`,params)
}

/**
 * 系统设置模块
 */
// 获取店铺资料
export function requestGetShopDetail(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/detail`,params)
}
// 更新店铺资料
export function requestUpdateShopDetail(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/update`,params)
}
// 新增员工
export function requestCreateStaff(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/add`,params)
}
// 获取所有员工
export function requestGetAllStaff(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/list`,params)
}
// 删除员工
export function requestDeleteStaff(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/del`,params)
}
// 更新员工
export function requestUpdateStaff(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/update`,params)
}
// 获取管理员用户
export function requestGetAdminStaff(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/adminstaff`,params)
}
// 新增管理员用户
export function requestCreateAdminStaff(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/addadmin`,params)
}
// 删除管理员用户
export function requestDeleteAdminStaff(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/deladmin`,params)
}
// 更新管理员用户
export function requestUpdateAdminStaff(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/updateadmin`,params)
}
// 获取员工操作日志
export function requestGetStaffAccesslog(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/accesslog`,params)
}
// 获取交接班纪录
export function requestGetStaffSuccessionlog(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/successionlog`,params)
}
// 新增岗位
export function requestCreateRole(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/addrole`,params)
}
// 获取岗位列表
export function requestGetRoleList(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/rolelist`,params)
}
// 删除岗位
export function requestDeleteRole(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/staff/delrole`,params)
}
// 获取设置
export function requestGetContent(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/getcontent`,params)
}
// 更新设置内容
export function requestUpdateContent(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/updatecontent`,params)
}
// 更新设置状态
export function requestUpdateState(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/shop/updatestate`,params)
}


/**
 * 门店概况
 */
export function requestStatisticsData1(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/statistics/data1`,params)
}
export function requestStatisticsData2(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/statistics/data2`,params)
}
export function requestStatisticsData3(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/statistics/data3`,params)
}
export function requestStatisticsData4(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/statistics/data4`,params)
}

/**
 * 收银台模块
 */
// 待支付订单列表
export function requestGetUnprocessedOrderList(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/order/simplerladingbill`,params)
}


/**
 * 报表模块
 */
// 业绩汇总报表
export function requestGetReportPerformance(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/report/performance`,params)
}
// 业绩汇总报表导出
export function requestExportReportPerformance() {
    return '/zv-member/zv/report/performanceexport'
}

/**
 * ai营销模块
 */
// 获取剩余短信条数
export function requestGetMsgReamin(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/msgremain`,params)
}
// 获取短信模板
export function requestGetMsgTemplate(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/msgtemplate`,params)
}
// 发送短信
export function requestSendMsg(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/sendmsg`,params)
}
// 获取短信配置列表
export function requestGetMsgConfig(params){
    return axios.post(`${SERVER_URL}/zv-member/zv/market/msgconfig`,params)
}
// 获取优惠券列表
export function requestGetCouponList(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/couponrecord`,params)
}
// 获取优惠卷
export function requestGetCoupon(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/getcoupon`,params)
}
// 优惠券发放记录data
export function requestGetCouponData(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/couponredata`,params)
}
// 新增优惠卷
export function requestAddCoupon(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/addcoupon`,params)
}
// 删除优惠券
export function requestDelCoupon(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/delcoupon`,params)
}
// 更新优惠卷
export function requestUpdateCoupon(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/updatecoupon`,params)
}
// 发放优惠券
export function requestGrantCoupon(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/grantcoupon`,params)
}
// 优惠券发放纪录
export function requestCouponRecord(params) {
    return axios.post(`${SERVER_URL}/zv-member/zv/market/couponrecord`,params)
}
