<template>
    <el-cascader
        :options="cityOptions"
        @active-item-change="handleItemChange"
        :props="props"
    ></el-cascader>
</template>
<script>
    import { requestGetProvice,requestGetCity,requestGetDistrict } from '@/services/service'
    export default {
        data(){
            return{
                cityOptions: [
                    // {
                    //     label: '江苏',
                    //     cities: []
                    // },
                    // {
                    //     label: '浙江',
                    //     cities: []
                    // }
                ],
                props: {
                    value: 'addrId',
                    label: 'addrName',
                    children: 'cities'
                },
            }
        },
        created(){
            this.initData();
        },
        methods: {
            initData(){
                requestGetProvice().then(res=>{
                    res.data.data.forEach(item=>{
                        let obj = Object.assign({},item,{cities: []});
                        this.cityOptions.push(obj)
                    })
                })
            },
            handleItemChange(id){
                let params = {
                    provinceId: id
                };
                requestGetCity(params).then(res=>{
                    this.cityOptions.forEach((item,idx)=>{
                        if(item.addrId == id){
                            res.data.data.forEach(item1=>{
                                let obj = Object.assign({},item1,{cities: []});
                                this.cityOptions[idx].cities.push(obj)
                            })
                        }
                    })
                })
            }
        }
    }
</script>
