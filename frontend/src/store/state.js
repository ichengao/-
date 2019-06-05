const state = {
    userInfo: {},                            // 用户信息
    dictList: {},                            // 数据字典
    shopList: [1],                           // 店铺头部
    systemSettingConfig: {},                 // 设置项数据
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
    updateStaffModalStatus: {state: false,data: {}},          // 编辑员工
    createAdminStaffModalStatus: false,                       // 新增管理员用户
    updateAdminStaffModal: {status: false,data: {}},          // 更新管理员用户
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
    selectMemberByHandModalStatus: false,                     // 手动选中会员弹框
    fastInchargeModalStatus: false,                           // 快捷充值弹框
    msgModuleForMemberChooseModalStatus: false,               // 优惠卷选择会员弹框
    msgTemplateModal: {status: false,data: {}},               // 选择模板弹框
    addCouponModalStatus: false,                              // 新建优惠卷
    editCouponModalStatus: {status: false,data: {}},          // 编辑优惠卷
    IssueCouponsModal: {status: false,data: {}},              // 发放优惠券
    updateMsgTemplate:  {status: false,data: {}},             // 更新短信模板
    UpdateProductModal: {status: false,data: {}},             // 更新商品
    UpdateServiceModal: {status: false,data: {}},             // 更新服务
    RepaymentModal: {status: false,data: {}},                 // 还款
    CheckStockModal: {status: false,data: {}},                // 查看库存
    StockorderModal: {status: false,data: {}},                // 供货记录
};

export default state;
