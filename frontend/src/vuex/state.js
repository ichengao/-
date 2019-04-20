const state = {
    userInfo: {},                            // 用户信息
    dictList: {},                            // 数据字典
    changePwdModalStatus1: false,            // 是否显示密码修改弹框changePwdModal
    changePhoneModalStatus: false,           // 是否显示修改手机号弹框
    createShopModalStatus: false,            // 是否显示新建店铺弹框
    createMemberCardStatus: false,           // 是否显示会员开卡弹框
    editMemberCardStatus: {status: false,memberId: ''},  // 是否显示会员开卡编辑弹框
    createPruductCategoryStatus: false,      // 商品种类弹框
    createServiceCategoryStatus: false,      // 新增服务弹框
    createGiftsModalStatus: false,           // 新增礼品弹框
    exchangeIntegralModalStatus: false,      // 兑换记录弹框
    createSupplierVendorModalStatus: false,  // 新增供应商弹框
    editSupplierVendorModalStatus: {status: false, data: {}}, // 修改供应商弹框
    createStoreControlModalStatus: false,                     // 新增仓库
    editStoreControlModalStatus: {status: false, data: {}},   // 修改仓库弹框
    updateProductQuantityStatus: {status: false, data: {}},   // 修改数量弹框
    inventoryRecordListModalStatus: {status: false, data: {}},// 盘点纪录弹框
};

export default state;
