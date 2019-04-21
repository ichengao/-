const mutations = {
    updataUserInfo(state,payload){
        state.userInfo = Object.assign({},state.userInfo,payload)
    },
    changePwdModalStatus(state,payload){
        state.changePwdModalStatus1 = payload
    },
    changePhoneModalStatus(state,payload){
        state.changePhoneModalStatus = payload
    },
    createShopModalStatus(state,payload){
        state.createShopModalStatus = payload
    },
    createMemberCardStatus(state,payload){
        state.createMemberCardStatus = payload
    },
    editMemberCardStatus(state,payload){
        state.editMemberCardStatus = payload
    },
    createPruductCategoryStatus(state,payload){
        state.createPruductCategoryStatus = payload
    },
    createServiceCategoryStatus(state,payload){
        state.createServiceCategoryStatus = payload
    },
    createGiftsModalStatus(state,payload){
        state.createGiftsModalStatus = payload
    },
    exchangeIntegralModalStatus(state,payload){
        state.exchangeIntegralModalStatus = payload
    },
    dictList(state,payload){
        state.dictList = Object.assign({},state.dictList,payload)
    },
    createSupplierVendorModalStatus(state,payload){
        state.createSupplierVendorModalStatus = payload;
    },
    editSupplierVendorModalStatus(state,payload){
        state.editSupplierVendorModalStatus = Object.assign({},state.editSupplierVendorModalStatus,payload);
    },
    createStoreControlModalStatus(state,payload){
        state.createStoreControlModalStatus = payload;
    },
    editStoreControlModalStatus(state,payload){
        state.editStoreControlModalStatus = Object.assign({},state.editStoreControlModalStatus,payload);
    },
    updateProductQuantityStatus(state,payload){
        state.updateProductQuantityStatus = Object.assign({},state.updateProductQuantityStatus,payload);
    },
    inventoryRecordListModalStatus(state,payload){
        state.inventoryRecordListModalStatus = Object.assign({},state.inventoryRecordListModalStatus,payload);
    },
    updateShopModal(state,payload){
        state.updateShopModal = Object.assign({},state.updateShopModal,payload);
    },
}

export default mutations;
