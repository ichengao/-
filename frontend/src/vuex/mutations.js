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
}

export default mutations;
