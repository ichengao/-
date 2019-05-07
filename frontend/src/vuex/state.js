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
    updateShopModal: { status: false, data: {} },             // 店铺信息更新
    createStaffModal: false,                                  // 新增员工
    createRoleModal: false,                                   // 新增岗位
    discountModalStatus: false,                               // 折扣弹框
    updateProductPriceModalStatus: false,                     // 改价弹框
    unprocessedOrderListModalStatus: false,                   // 待支付订单列表
    deductionTimesModalStatus: false,                         // 会员计次消费弹框
    memberManageModalStatus: false,                           // 会员管理弹框
    selectMemberModalStatus: false,                           // 选择会员弹框
    addResponsibilityManageStatus: false,                     // 新增岗位弹框
    updatePermissionModalStatus: {status: false, data: {}},   // 编辑岗位权限弹框
    permissionDetailModalStatus: {status: false, data: {}},   // 权限编辑详情弹框
};

export default state;
