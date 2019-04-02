import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const workDesk = ()=>import('@/components/workDesk/workDesk')
const shopList = ()=>import('@/components/workDesk/shopList')
const setting = ()=>import('@/components/workDesk/setting')
const shopDetail = ()=>import('@/components/shopDetail/shopDetail')
const memberManager = ()=>import('@/components/memberManager/memberManager')
const chargeComponent = ()=>import('@/components/charge/charge')
const chargeMoney = ()=>import('@/components/charge/chargeMoney')
const chargeTimers = ()=>import('@/components/charge/chargeTimers')
const chargeList = ()=>import('@/components/charge/chargeList')
const product = ()=>import('@/components/product/product')
const productList = ()=>import('@/components/product/productList')
const serviceList = ()=>import('@/components/product/serviceList')
const addProduct = ()=>import('@/components/product/addProduct')
const addService = ()=>import('@/components/product/addService')
const stockManage = ()=>import('@/components/stockManage/stockManage')
const supplierVendor = ()=>import('@/components/stockManage/supplierVendor')
const storeControl = ()=>import('@/components/stockManage/storeControl')

export default new Router(
    {
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
              path: 'chargeListWS',
              components: chargeList,
              name: chargeList
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
            }
          ]
        }
      ]
    },
)
