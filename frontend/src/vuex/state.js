const state = {
    userInfo: {},                         // 用户信息
    changePwdModalStatus1: false,         // 是否显示密码修改弹框changePwdModal
    changePhoneModalStatus: false,        // 是否显示修改手机号弹框
    createShopModalStatus: false,         // 是否显示新建店铺弹框
    createMemberCardStatus: false,        // 是否显示会员开卡弹框
    editMemberCardStatus: {status: false,memberId: ''},  // 是否显示会员开卡编辑弹框
    createPruductCategoryStatus: false,   // 商品种类弹框
    createServiceCategoryStatus: false,   // 新增服务弹框
    createGiftsModalStatus: false,        // 新增礼品弹框
    exchangeIntegralModalStatus: false,  // 兑换记录弹框
};

export default state;
