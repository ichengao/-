<template>
    <div class="modal-container update-product-modal" v-if="modalStatus">
        <el-dialog class="dialog-box" title="编辑商品" :visible.sync="modalStatus" @close='handleCloseModal' >
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
                            action="/zv-member/zv/upload/oss"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            >
                            <img v-if="form.goodsPicture" :src="form.goodsPicture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_PRODUCT_LIST } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    import { requestUpdateProduct } from '@/services/service'
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
        computed: {
            modalStatus: {
                get(){
                    return this.$store.state.UpdateProductModal.status || false
                },
                set(){

                }
            }
        },
        watch: {
            modalStatus(oldVal,newVal){
                this.modalStatus = this.$store.state.UpdateProductModal.status;
                if(this.modalStatus){
                    this.form = Object.assign({},this.form,this.$store.state.UpdateProductModal.data,{createDate: ''})
                }
            }
        },
        methods: {
            handleCloseModal(){
                this.$store.dispatch('closeUpdateProduct');
            },
            handleAvatarSuccess(res, file){
                this.form.goodsPicture = res.data.url;
            },
            handleConfirm(){
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
                        };
                        params = Object.assign({},params,this.form,{'shopId': this.$route.params.id});
                        requestUpdateProduct(params).then((res)=>{
                            if(res.data.code == '0000'){
                                Message.success('更新成功');
                            }else{
                                Message.error(res.data.msg)
                            }
                            EventBus.$emit(UPDATE_PRODUCT_LIST);
                            this.handleCloseModal();
                        }).catch(()=>{
                            Message.error('更新失败');
                        })
                    }
                })

            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .update-product-modal{
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
        .avatar{
            width: 100px;
            height: 100px;
        }
        .dialog-btn{
            padding: 10px 15px;
            &:first-child{
                &:hover{
                    color: $color;
                    border-color: $color-level1;
                    background-color: $color-level2;
                }
            }
            &:last-child{
                background: $color;
                border-color: $color;
            }
        }
    }
</style>

