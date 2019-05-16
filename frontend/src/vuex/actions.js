const actions = {
    // 修改用户信息
    updataUserInfo({state,commit},params){
        commit('updataUserInfo',params)
    },
    // 打开修改密码框
    openChangePwdModal({state,commit}){
        commit('changePwdModalStatus', true);
    },
    // 关闭修改密码框
    closeChangePwdModal({state,commit}){
        commit('changePwdModalStatus', false);
    },
    // 打开修改手机号框
    openChangePhoneModal({state,commit}){
        commit('changePhoneModalStatus', true);
    },
    // 关闭修改手机号框
    closeChangePhoneModal({state,commit}){
        commit('changePhoneModalStatus', false);
    },
    // 打开创建店铺框
    opencreateShopModal({state,commit}){
        commit('createShopModalStatus', true);
    },
    // 关闭创建店铺框
    closecreateShopModal({state,commit}){
        commit('createShopModalStatus', false);
    },
    // 打开会员开卡弹框
    opencreateMemberCardStatus({state,commit}){
        commit('createMemberCardStatus',true)
    },
    // 关闭会员开卡弹框
    closecreateMemberCardStatus({state,commit}){
        commit('createMemberCardStatus',false)
    },
    // 打开会员开卡编辑弹框
    openEditMemberCardStatus({state,commit},params){
        commit('editMemberCardStatus',{status: true,memberId: params})
    },
    // 关闭会员开卡编辑弹框
    closeEditMemberCardStatus({state,commit}){
        commit('editMemberCardStatus',{status: false,memberId: ''})
    },
    // 商品大类弹框
    openPruductCategoryModal({state,commit}){
        commit('createPruductCategoryStatus',true)
    },
    // 商品大类弹框
    closePruductCategoryModal({state,commit}){
        commit('createPruductCategoryStatus',false)
    },
    // 服务大类弹框
    openServiceCategoryModal({state,commit}){
        commit('createServiceCategoryStatus',true)
    },
    // 服务大类弹框
    closeServiceCategoryModal({state,commit}){
        commit('createServiceCategoryStatus',false)
    },
    // 新建礼品弹框
    openCreateGiftsModal({state,commit}){
        commit('createGiftsModalStatus',true)
    },
    // 新建礼品弹框
    closeCreateGiftsModal({state,commit}){
        commit('createGiftsModalStatus',false)
    },
    // 新建礼品弹框
    openExchangeIntegralModalStatus({state,commit}){
        commit('exchangeIntegralModalStatus',true)
    },
    // 新建礼品弹框
    closeExchangeIntegralModalStatus({state,commit}){
        commit('exchangeIntegralModalStatus',false)
    },
    // 设置数据字典
    setDictList({state,commit},params){
        commit('dictList',params)
    },
    // 新建供应商弹框
    openCreateSupplierVendorModal({state,commit}){
        commit('createSupplierVendorModalStatus',true)
    },
    // 新建供应商弹框
    closeCreateSupplierVendorModal({state,commit}){
        commit('createSupplierVendorModalStatus',false)
    },
    // 修改供应商弹框
    openEditSupplierVendorModal({state,commit},params){
        commit('editSupplierVendorModalStatus',{status: true,data: params})
    },
    // 修改供应商弹框
    closeEditSupplierVendorModal({state,commit}){
        commit('editSupplierVendorModalStatus',{status: false,data: {}})
    },
    // 新建仓库弹框
    openCreateStoreControlModal({state,commit}){
        commit('createStoreControlModalStatus',true)
    },
    // 新建仓库弹框
    closeCreateStoreControlModal({state,commit}){
        commit('createStoreControlModalStatus',false)
    },
    // 修改仓库弹框
    openEditStoreControlModal({state,commit},params){
        commit('editStoreControlModalStatus',{status: true,data: params})
    },
    // 修改仓库弹框
    closeEditStoreControlModal({state,commit}){
        commit('editStoreControlModalStatus',{status: false,data: {}})
    },
    // 修改产品数量
    openUpdateProductQuantityModal({state,commit},params){
        commit('updateProductQuantityStatus',{status: true,data: params})
    },
    // 修改产品数量
    closeUpdateProductQuantityModal({state,commit}){
        commit('updateProductQuantityStatus',{status: false,data: {}})
    },
    // 商品盘点记录
    openInventoryRecordListModal({state,commit},params){
        commit('inventoryRecordListModalStatus',{status: true,data: params})
    },
    // 商品盘点记录
    closeInventoryRecordListModal({state,commit}){
        commit('inventoryRecordListModalStatus',{status: false,data: {}})
    },
    // 店铺更新
    openUpdateShopModal({state,commit},params){
        commit('updateShopModal',{status: true,data: params})
    },
    // 店铺更新
    closeUpdateShopModal({state,commit}){
        commit('updateShopModal',{status: false,data: {}})
    },
    // 新增员工
    openCreateStaffModal({state,commit},params){
        commit('createStaffModal',true)
    },
    // 新增员工
    closeCreateStaffModal({state,commit}){
        commit('createStaffModal',false)
    },
    // 编辑员工
    openUpdateStaffModalStatus({state,commit},params){
        commit('updateStaffModalStatus',{status: true,data: params})
    },
    // 编辑员工
    closeUpdateStaffModalStatus({state,commit},params){
        commit('updateStaffModalStatus',{status: false,data: params})
    },
    // 新增管理员
    openCreateAdminStaffModal({state,commit},params){
        commit('createAdminStaffModalStatus',true)
    },
    // 新增管理员
    closeCreateAdminStaffModal({state,commit},params){
        commit('createAdminStaffModalStatus',false)
    },
    // 更新管理员
    openUpdateAdminStaffModal({state,commit},params){
        commit('updateAdminStaffModal',{status: true,data: params})
    },
    // 新增管理员
    closeUpdateAdminStaffModal({state,commit},params){
        commit('updateAdminStaffModal',{status: false,data: {}})
    },
    // 新增岗位
    openCreateRoleModal({state,commit},params){
        commit('createRoleModal',true)
    },
    // 新增岗位
    closeCreateRoleModal({state,commit}){
        commit('createRoleModal',false)
    },
    // 折扣弹框
    openDiscountModal({state,commit},params){
        commit('discountModalStatus',true)
    },
    // 折扣弹框
    closeDiscountModal({state,commit}){
        commit('discountModalStatus',false)
    },
    // 改价弹框
    openUpdateProductPriceModal({state,commit},params){
        commit('updateProductPriceModalStatus',true)
    },
    // 改价弹框
    closeUpdateProductPriceModal({state,commit}){
        commit('updateProductPriceModalStatus',false)
    },
    // 待支付订单
    openUnprocessedOrderListModal({state,commit},params){
        commit('unprocessedOrderListModalStatus',true)
    },
    // 改价弹框
    closeUnprocessedOrderListModalStatus({state,commit}){
        commit('unprocessedOrderListModalStatus',false)
    },
    // 会员计次消费弹框
    openDeductionTimesModal({state,commit},params){
        commit('deductionTimesModalStatus',true)
    },
    // 会员计次消费弹框
    closeDeductionTimesModal({state,commit}){
        commit('deductionTimesModalStatus',false)
    },
    // 会员管理弹框
    openMemberManageModal({state,commit},params){
        commit('memberManageModalStatus',true)
    },
    // 会员管理弹框
    closeMemberManageModal({state,commit}){
        commit('memberManageModalStatus',false)
    },
    // 选择会员弹框
    openSelectMemberModal({state,commit}){
        commit('selectMemberModalStatus',true)
    },
    // 会员管理弹框
    closeSelectMemberModal({state,commit}){
        commit('selectMemberModalStatus',false)
    },
    // 新增岗位弹框
    openAddResponsibilityManage({state,commit}){
        commit('addResponsibilityManageStatus',true)
    },
    // 新增岗位弹框
    closeAddResponsibilityManage({state,commit}){
        commit('addResponsibilityManageStatus',false)
    },
    // 编辑岗位权限弹框
    openUpdatePermissionModal({state,commit},params){
        commit('updatePermissionModalStatus',{status: true,data: params})
    },
    // 编辑岗位权限弹框
    closeUpdatePermissionModal({state,commit}){
        commit('updatePermissionModalStatus',{status: false,data: {}})
    },
    // 编辑岗位权限详情弹框
    openPermissionDetailModal({state,commit},params){
        commit('permissionDetailModalStatus',{status: true,data: params})
    },
    // 编辑岗位权限详情弹框
    closePermissionDetailModal({state,commit}){
        commit('permissionDetailModalStatus',{status: false,data: {}})
    },
};

export default actions;
