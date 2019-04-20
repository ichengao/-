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
};

export default actions;
