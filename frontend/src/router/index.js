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
                path: 'systemSetting/:id',
                component: systemSetting,
                redirect: 'systemSetting/:id/systemShopDetail',
                children: [
                    {
                        path: 'systemShopDetail',
                        component: systemShopDetail,
                        name: 'systemShopDetail'
                    }
                ]
            }
        ]
    },
)
