<template>
    <div class="container add-product-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/product/'+currentId+'/addProduct'" active-class="active">
                    <div>新增商品</div>   
                </router-link>
                <router-link :to="'/product/'+currentId+'/addService'" active-class="active">
                    <div>新增服务</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <el-button class="header-button" @click="addNewCategory">新增分组</el-button>
                <el-button class="header-button" @click="handleDeleteTrees">批量删除</el-button>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容" class="input-with-select" v-model="searchData">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <div class="content-lf">
                <div class="content-list"> 
                    <ul>
                        <li>
                            <el-tree
                                class="tree-component"
                                show-checkbox
                                :data="initDataTree"
                                @check-change="handleCheckChange"
                                node-key="id"
                                default-expand-all
                                :expand-on-click-node="false"
                                :filter-node-method="filterNode"
                                ref='tree'
                                :render-content="renderContent">
                            </el-tree>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content-rgt">
                <div class="content-rgt-header">
                    新增商品
                </div>
                <div class="content-rgt-content" v-show="form.categoryId">
                    <el-form :model="form" :rules="dataRule" status-icon ref="form" class="form-box">
                        <div class="form-lf">
                            <p>1.商品资料</p>
                            <el-form-item prop="barcode" label="商品编号" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品编号"  class="input-box" v-model="form.barcode" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="goodsName" label="商品名称" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品名称"  class="input-box" v-model="form.goodsName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="商品品牌" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品品牌"  class="input-box" v-model="form.brand" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="助词码" label-width="100px" class="item-single">
                                <el-input placeholder="请输入助词码"  class="input-box" v-model="form.simpleName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="库存数量" label-width="100px" class="item-single">
                                <el-input placeholder="请输入库存数量"  class="input-box" v-model="form.count" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="库存单位" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品规格"  class="input-box" v-model="form.unit" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="商品规格" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品规格"  class="input-box" v-model="form.describe" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="生产地址" label-width="100px" class="item-single">
                                <el-input placeholder="请输入生产地址"  class="input-box" v-model="form.originPlace" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="质保天数" label-width="100px" class="item-single">
                                <el-input placeholder="请输入质保天数"  class="input-box" v-model="form.expDay" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="过期时间" label-width="100px" class="item-single">
                                <el-date-picker v-model="form.expDate" type="date" class="form-date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item prop="" label="备注" label-width="100px" class="item-single">
                                <el-input placeholder="请输入备注" class="input-box" type="textarea" v-model="form.remark" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                        <div class="form-rgt">
                            <p>2.价格资料</p>
                            <el-form-item prop="salePrice" label="销售单价" label-width="100px" class="item-single">
                                <el-input placeholder="请输入销售单价"  class="input-box" v-model="form.salePrice" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="stockPrice" label="出货价" label-width="100px" class="item-single">
                                <el-input placeholder="请输入出货价"  class="input-box" v-model="form.stockPrice" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="会员单价" label-width="100px" class="item-single">
                                <el-input placeholder="请输入会员单价"  class="input-box" v-model="form.memberPrice" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="最低单价" label-width="100px" class="item-single">
                                <el-input placeholder="请输入最低单价"  class="input-box" v-model="form.minPrice" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="最低折扣" label-width="100px" class="item-single">
                                <el-input placeholder="请输入最低折扣"  class="input-box" v-model="form.minDiscount" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="配送价" label-width="100px" class="item-single">
                                <el-input placeholder="请输入配送价"  class="input-box" v-model="form.deliveryPrice" maxlength="20" ></el-input>
                            </el-form-item>
                            <div class="item-box item-single">
                                <el-form-item prop="" label="销售提成" label-width="100px">
                                    <el-input placeholder="请输入配送价"  class="input-box" v-model="form.commission" maxlength="20" ></el-input>
                                </el-form-item>
                                <el-form-item prop="" class="item-select">
                                    <el-select v-model="form.commissionUnit" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.commissionUnitOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <el-form-item prop="" label="商品积分" label-width="100px" class="item-single">
                                <el-input placeholder="请输入商品积分"  class="input-box" v-model="form.integral" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="" label="上传图片" label-width="100px" class="item-single">
                                <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="form.goodsPicture" :src="form.goodsPicture" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="content-footer" v-show="form.categoryId">
                    <el-checkbox v-model="form.weight">是否称重</el-checkbox>
                    <div class="button-group">
                        <el-button class="ensure" @click="handleCommit">保存</el-button>
                        <el-button class="cancle">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { requestAddProduct,requestGetGoodsmenu,requestDeleteGoods } from '@/services/service';
import { Message } from 'element-ui';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { addCategoryStatus } from '@/components/eventEmitter/eventName';
export default {
    data(){
        return{
            form: {
                type: '01',
                goodsId: '',
                shopId: '',
                barcode: '',
                categoryId: '',
                goodsName: '',
                brand: '',
                simpleName: '',     // 助词码
                count: '',
                unit: '',
                describe: '',
                originPlace: '',
                expDay: '',
                expDate: '',
                remark: '',
                salePrice: '',
                stockPrice: '',
                memberPrice: '',
                minPrice: '',
                minDiscount: '',
                deliveryPrice: '',
                commission: '',
                commissionUnit: '',
                integral: '',
                goodsPicture: '',
                weight: false
            },
            currentId: '',
            options: {
                commissionUnitOptions: [
                    {
                        label: '%',
                        value: '%'
                    }
                ],
            },
            initDataTree: [],
            dataRule: {
                barcode: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
                goodsName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
                salePrice: [{ required: true, message: '销售单价不能为空', trigger: 'blur' }],
                stockPrice: [{ required: true, message: '进货价不能为空', trigger: 'blur' }],
            },
            searchData: '',
            goodsIds: [],
            categoryIds: []
        }
    },
    mounted(){
        this.currentId = this.$route.params.id;
        this.initData();
        EventBus.$on(addCategoryStatus,()=>{
            this.initData();
        });
    },
    methods: {
        initData(){
            let params = {
                shopId: this.$route.params.id,
                type: '01'
            };
            requestGetGoodsmenu(params).then((res)=>{
                this.initDataTree = [];
                let data = res.data.data;
                data.map(item=>{
                    item.id = item.categoryId;
                    item.label = item.name;
                    item.level = 1;
                    item.children = [];
                    if(item.goodsNameDTOS){
                        item.goodsNameDTOS.map(littleItem=>{
                            littleItem.id = littleItem.goodsId;
                            littleItem.label = littleItem.goodsName;
                            littleItem.level = 2;
                            item.children.push(littleItem);
                        })
                    }
                    this.initDataTree.push(item)
                })
            })
        },
        // 树过滤器
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 初始化数据
        initFormData(){
            this.form = {
                type: '01',
                goodsId: '',
                shopId: '',
                barcode: '',
                categoryId: '',
                goodsName: '',
                brand: '',
                simpleName: '',     // 助词码
                count: '',
                unit: '',
                describe: '',
                originPlace: '',
                expDay: '',
                expDate: '',
                remark: '',
                salePrice: '',
                stockPrice: '',
                memberPrice: '',
                minPrice: '',
                minDiscount: '',
                deliveryPrice: '',
                commission: '',
                commissionUnit: '',
                integral: '',
                goodsPicture: '',
                weight: false
            };
        },
        // 操作渲染
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    {
                        node.level == 1 ? 
                        <span>
                            <el-button size="mini" type="text" on-click={ () => this.addProductToCategory(node, data) }>新增商品</el-button>
                        </span> : 
                        <span>
                            <el-button size="mini" type="text" on-click={ () => this.disabledProduct(node, data) }>禁用</el-button>
                            <el-button size="mini" type="text" on-click={ () => this.deleteProduct(node, data) }>删除</el-button>
                        </span>
                    }
                </span>
            );
        },
        addProductToCategory(node, data){
            this.initFormData();
            this.form.categoryId = node.data.categoryId;
        },
        disabledProduct(node, data){},
        // 删除操作
        deleteProduct(node, data){
            let params = {
                shopId: this.$route.params.id,
                goodsIds: [node.data.id]
            }
            requestDeleteGoods(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.initData()
                }else{
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(()=>{
                Message({
                    message: '删除失败',
                    type: 'error'
                });
            })
        },
        handleSearch(){
            this.$refs.tree.filter(this.searchData);
        },
        handleCommit(){
            this.$refs['form'].validate((valid)=>{
                if(valid){
                    let params = {
                        categoryId: '',
                        goodsName: '',
                        barcode: '',
                        brand: '',
                        simpleName: '',     // 助词码
                        count: '',
                        unit: '',
                        describe: '',
                        originPlace: '',
                        expDay: '',
                        expDate: '',
                        remark: '',
                        salePrice: '',
                        stockPrice: '',
                        memberPrice: '',
                        minPrice: '',
                        minDiscount: '',
                        deliveryPrice: '',
                        commission: '',
                        commissionUnit: '',
                        integral: '',
                        goodsPicture: '',
                        weight: false,
                        goodsId: ''
                    }
                    params = Object.assign({},params,this.form,{'shopId': this.$route.params.id});
                    requestAddProduct(params).then((res)=>{
                        if(res.data.code == '0000'){
                            Message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.initData();
                            this.form.categoryId = '';
                        }else{
                            Message({
                                message: res.data.msg,
                                type: 'error'
                            })
                        }
                    }).catch(()=>{
                        Message({
                            message: '新增失败',
                            type: 'success'
                        })
                    })
                }
            })
        },
        // 选中状态切换
        handleCheckChange(param1, param2,param3){
            if(param1.level == 2){
                let idx = this.goodsIds.indexOf(Number(param1.goodsId));
                if(param2){
                    idx && this.goodsIds.push(Number(param1.goodsId))
                }else{
                    idx && this.goodsIds.splice(idx,1);
                }
            }
            if(param1.level == 1){
                let idx = this.categoryIds.indexOf(Number(param1.categoryId));
                if(param2){
                    idx && this.categoryIds.push(Number(param1.categoryId))
                }else{
                    idx && this.categoryIds.splice(idx,1);
                }
            }
        },
        // 批量删除
        handleDeleteTrees(){
            if((this.goodsIds.length == 0)&&(this.categoryIds.length == 0)){
                Message({
                    message: '请选择',
                    type: 'error'
                });
                return
            }
            let params = {
                shopId: this.$route.params.id,
                goodsIds: this.goodsIds.join(','),
                categoryIds: this.categoryIds.join(',')
            }
            requestDeleteGoods(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.initData()
                }else{
                    Message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            }).catch(()=>{
                Message({
                    message: '删除失败',
                    type: 'error'
                });
            })
        },
        handleAvatarSuccess(){
        },
        beforeAvatarUpload(){},
        addNewCategory(){
            this.$store.dispatch('openPruductCategoryModal')
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        .section-header{
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .section-header-lf{
                display: flex;
                a{
                    div{
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }
                    &.active{
                        div{
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
            .section-header-center{
                .header-button{
                    @include buttonType1();
                }
            }
        }
        .section-content{
            margin-top: 10px;
            display: flex;
            flex: 1;
            .content-lf{
                width: 28%;
                background: #fff;
                padding: 20px 20px 0;
                .content-list{
                    min-height: calc(100vh - 200px);
                }
                
            }
            .content-rgt{
                margin-left: 10px;
                width: 72%;
                background: #fff;
                .content-rgt-header{
                    font-size: 20px;
                    color: $color;
                    padding: 20px;
                }
                .content-rgt-content{
                    .form-box{
                        display: flex;
                        justify-content: space-between;
                        .form-lf{
                            width: 50%;
                            padding: 10px;
                            .item-single{
                                width: 100%;
                            }
                            p{
                                color: $color-level1;
                                padding-left: 30px;
                                margin-bottom: 20px;
                            }
                        }
                        .form-rgt{
                            width: 50%;
                            padding: 10px;
                            .item-single{
                                width: 100%;
                            }
                            p{
                                color: $color-level1;
                                padding-left: 30px;
                                margin-bottom: 20px;
                            }
                            .item-box{
                                display: flex;
                                justify-content: space-between;
                                .item-select{
                                    margin-left: 10px;
                                }
                            }
                        }
                        
                        
                    }
                }
                .content-footer{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 40px;
                    .ensure{
                        @include buttonType1()
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    @import '@/assets/scss/common.scss';
    .add-product-container{
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
        .tree-component{
            .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background-color: $color;
                border-color: $color;
            }
        }
    }
    
</style>
