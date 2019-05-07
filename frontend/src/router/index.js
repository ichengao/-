import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const workDesk = ()=>import('@/components/workDesk/workDesk');
const shopList = ()=>import('@/components/workDesk/shopList');
const setting = ()=>import('@/components/workDesk/setting');
const shopDetail = ()=>import('@/components/shopDetail/shopDetail');
const memberManager = ()=>import('@/components/memberManager/memberManager');
const chargeComponent = ()=>import('@/components/charge/charge');
const chargeMoney = ()=>import('@/components/charge/chargeMoney');
const chargeTimers = ()=>import('@/components/charge/chargeTimers');
const timersExpire = ()=>import('@/components/charge/timersExpire');
const product = ()=>import('@/components/product/product');
const productList = ()=>import('@/components/product/productList');
const serviceList = ()=>import('@/components/product/serviceList');
const addProduct = ()=>import('@/components/product/addProduct');
const addService = ()=>import('@/components/product/addService');
const stockManage = ()=>import('@/components/stockManage/stockManage');
const supplierVendor = ()=>import('@/components/stockManage/supplierVendor');
const storeControl = ()=>import('@/components/stockManage/storeControl');
const purchaseStock = ()=>import('@/components/stockManage/purchaseStock');
const returnStock = ()=>import('@/components/stockManage/returnStock');
const inventoryProduct = ()=>import('@/components/stockManage/inventoryProduct');
const systemSetting = ()=>import('@/components/systemSetting/systemSetting');
const systemShopDetail = ()=>import('@/components/systemSetting/shopDetail');
const staffManage = ()=>import('@/components/systemSetting/staffManage');
const memberSetting = ()=>import('@/components/systemSetting/memberSetting');
const productSetting = ()=>import('@/components/systemSetting/productSetting');
const sellSetting = ()=>import('@/components/systemSetting/sellSetting');
const paySetting = ()=>import('@/components/systemSetting/paySetting');
const printSetting = ()=>import('@/components/systemSetting/printSetting');
const hardwareSetting = ()=>import('@/components/systemSetting/hardwareSetting');
const changeShiftsManage = ()=>import('@/components/systemSetting/staffManage/changeShiftsManage');
const loginLogManage = ()=>import('@/components/systemSetting/staffManage/loginLogManage');
const operatorLogManage = ()=>import('@/components/systemSetting/staffManage/operatorLogManage');
const operatorManage = ()=>import('@/components/systemSetting/staffManage/operatorManage');
const responsibilityManage = ()=>import('@/components/systemSetting/staffManage/responsibilityManage');
const staffDetailManage = ()=>import('@/components/systemSetting/staffManage/staffDetailManage');
const integralManage = ()=>import('@/components/integralManage/integralManage');
const integralChange = ()=>import('@/components/integralManage/integralChange');
const giftsExchange = ()=>import('@/components/integralManage/giftsExchange');
const giftsManage = ()=>import('@/components/integralManage/giftsManage');
const bindPayWay = ()=>import('@/components/systemSetting/paySetting/bindPayWay');
const paySettingDetail = ()=>import('@/components/systemSetting/paySetting/paySettingDetail');
const cashier = ()=>import('@/components/cashier/cashier');
const shopOverview = ()=>import('@/components/shopOverview/shopOverview');
const intelligentAnalysis = ()=>import('@/components/intelligentAnalysis/intelligentAnalysis');
const shopAnalysis = ()=>import('@/components/intelligentAnalysis/shopAnalysis');
const achievementAnalysis = ()=>import('@/components/intelligentAnalysis/shopAnalysis/achievementAnalysis');
const memberAnalysis = ()=>import('@/components/intelligentAnalysis/shopAnalysis/memberAnalysis');
const storeValueAnalysis = ()=>import('@/components/intelligentAnalysis/shopAnalysis/storeValueAnalysis');
const timersAnalysis = ()=>import('@/components/intelligentAnalysis/shopAnalysis/timersAnalysis');

export default new Router(
    {
        scrollBehavior (to, from, savedPosition) {
            return { x: 0, y: 0 }
        },
        routes: [
            {
                path: '/',
                component: workDesk,
                children: [
                    {
                        path: '/',
                        name: 'shopList',
                        component: shopList,
                    },
                    {
                        path: '/setting',
                        name: 'setting',
                        component: setting,
                    }
                ]
            },
            {
              path: '/shopdetail/:id',
              component: shopDetail,
              redirect: '/shopdetail/:id/member',
              children: [
                {
                  path: 'member',
                  component: memberManager,
                  name: 'memberManager'
                },
                {
                  path: 'charge',
                  component: chargeComponent,
                  children: [
                    {
                      path: 'chargeMoney',
                      component: chargeMoney,
                      name: 'chargeMoney'
                    },
                    {
                      path: 'chargeTimers',
                      component: chargeTimers,
                      name: 'chargeTimers'
                    },
                  ]
                },
                {
                  path: 'timersExpire',
                  component: timersExpire,
                  name: 'timersExpire'
                },
                  {
                      path: 'integral',
                      component: integralManage,
                      children: [
                          {
                              path: 'integralChange',
                              component: integralChange,
                              name: integralChange
                          },
                          {
                              path: 'giftsExchange',
                              component: giftsExchange,
                              name: giftsExchange
                          }
                      ]
                  },
                  {
                      path: 'giftsManage',
                      component: giftsManage,
                      name: giftsManage
                  }
              ]
            },
            {
              path: '/product/:id',
              component: product,
              redirect: '/product/:id/productList',
              children: [
                {
                  path: 'productList',
                  component: productList,
                  name: 'productList'
                },
                {
                  path: 'serviceList',
                  component: serviceList,
                  name: 'serviceList'
                },
                {
                  path: 'addProduct',
                  component: addProduct,
                  name: 'addProduct'
                },
                {
                  path: 'addService',
                  component: addService,
                  name: 'addService'
                }
              ]
            },
            {
              path: '/stockManage/:id',
              component: stockManage,
              redirect: '/stockManage/:id/supplierVendor',
              children: [
                {
                  path: 'supplierVendor',
                  component: supplierVendor,
                  name: 'supplierVendor'
                },
                {
                  path: 'storeControl',
                  component: storeControl,
                  name: 'storeControl'
                },
                {
                  path: 'purchaseStock',
                  component: purchaseStock,
                  name: 'purchaseStock'
                },
                {
                  path: 'returnStock',
                  component: returnStock,
                  name: 'returnStock'
                },
                {
                  path: 'inventoryProduct',
                  component: inventoryProduct,
                  name: 'inventoryProduct'
                }
              ]
            },
            {
                path: '/systemSetting/:id',
                component: systemSetting,
                redirect: '/systemSetting/:id/systemShopDetail',
                children: [
                    {
                        path: 'systemShopDetail',
                        component: systemShopDetail,
                        name: 'systemShopDetail'
                    },
                    {
                        path: 'staffManage',
                        component: staffManage,
                        redirect: '/systemSetting/:id/staffManage/responsibilityManage',
                        children: [
                            {
                                path: 'responsibilityManage',
                                component: responsibilityManage,
                                name: 'responsibilityManage'
                            },
                            {
                                path: 'staffDetailManage',
                                component: staffDetailManage,
                                name: 'staffDetailManage'
                            },
                            {
                                path: 'operatorManage',
                                component: operatorManage,
                                name: 'operatorManage'
                            },
                            {
                                path: 'operatorLogManage',
                                component: operatorLogManage,
                                name: 'operatorLogManage'
                            },
                            {
                                path: 'loginLogManage',
                                component: loginLogManage,
                                name: 'loginLogManage'
                            },
                            {
                                path: 'changeShiftsManage',
                                component: changeShiftsManage,
                                name: 'changeShiftsManage'
                            },
                        ]
                    },
                    {
                        path: 'memberSetting',
                        component: memberSetting,
                        name: 'memberSetting'
                    },
                    {
                        path: 'productSetting',
                        component: productSetting,
                        name: 'productSetting'
                    },
                    {
                        path: 'sellSetting',
                        component: sellSetting,
                        name: 'sellSetting'
                    },
                    {
                        path: 'paySetting',
                        component: paySetting,
                        redirect: '/systemSetting/:id/paySetting/bindPayWay',
                        children: [
                            {
                                component: bindPayWay,
                                path: 'bindPayWay',
                                name: 'bindPayWay'
                            },
                            {
                                component: paySettingDetail,
                                path: 'paySettingDetail',
                                name: 'paySettingDetail'
                            }
                        ]
                    },
                    {
                        path: 'printSetting',
                        component: printSetting,
                        name: 'printSetting'
                    },
                    {
                        path: 'hardwareSetting',
                        component: hardwareSetting,
                        name: 'hardwareSetting'
                    },
                ]
            },
            {
                path: '/cashier/:id',
                component: cashier,
                name: 'cashier'
            },
            {
                path: '/shopOverview/:id',
                component: shopOverview,
                name: 'shopOverview'
            },
            {
                path: '/intelligentAnalysis/:id',
                component: intelligentAnalysis,
                redirect: '/intelligentAnalysis/:id/shopAnalysis/achievementAnalysis',
                children: [
                    {
                        component: shopAnalysis,
                        path: 'shopAnalysis',
                        children: [
                            {
                                name: 'achievementAnalysis',
                                component: achievementAnalysis,
                                path: 'achievementAnalysis',
                            },{
                                name: 'memberAnalysis',
                                component: memberAnalysis,
                                path: 'memberAnalysis',
                            },{
                                name: 'storeValueAnalysis',
                                component: storeValueAnalysis,
                                path: 'storeValueAnalysis',
                            },{
                                name: 'timersAnalysis',
                                component: timersAnalysis,
                                path: 'timersAnalysis',
                            }
                        ]
                    },

                ]
            }
        ]
    },
)
