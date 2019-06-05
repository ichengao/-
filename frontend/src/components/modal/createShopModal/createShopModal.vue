<template>
    <div class="modal-container create-shop-modal" v-if="modalStatus">
        <el-dialog title="创建门店" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" >
                <el-form-item prop="shopName" label="门店名称" label-width="100px" class="form-item-box">
                    <el-input placeholder="请输入门店名称"  class="pwd input-box" v-model="form.shopName" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item prop="shopManager" label="店长姓名" label-width="100px" class="form-item-box">
                    <el-input placeholder="请输入店长姓名"  class="pwd input-box" v-model="form.shopManager" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="100px" class="gender-item">
                    <el-radio-group class="input-box" v-model="form.sex" size="small">
                        <el-radio label="1" class="gender-list">男</el-radio>
                        <el-radio label="2" class="gender-list">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号码" label-width="100px" class="form-item-box form-item-phone">
                    <el-input placeholder="请输入手机号码"  class="pwd input-box" v-model="form.mobile" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="登录密码" label-width="100px" class="form-item-box">
                    <el-input placeholder="请输入登录密码" type="password" class="pwd input-box" v-model="form.password" maxlength="20" ></el-input>
                </el-form-item>
                <el-form-item prop="businessBelong" label="所属行业" label-width="100px" class="form-select-box form-business-box">
                    <el-select v-model="form.businessBelong" placeholder="请选择" class="form-select">
                        <el-option
                        v-for="item in businessBelongOptions"
                        :key="item.dictKey"
                        :label="item.dictValue"
                        :value="item.dictKey">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传Logo" label-width="100px" class="form-item-box">
                    <el-upload
                        class="avatar-uploader"
                        action="/zv-member/zv/upload/oss"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.shopLogoPath" :src="form.shopLogoPath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="address" class="item-wrap form-item-box form-select-box" label="门店地址" label-width="100px">
                    <cityCascader class="input-box" />
                    <div>
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入详细地址"
                            class="form-area"
                            v-model="form.address">
                        </el-input>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { requestaddShop } from '@/services/service';
import cityCascader from '@/components/common/cityCascader'
import { Message } from 'element-ui';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { UPDATE_SHOP_LIST } from '@/components/eventEmitter/eventName'
export default {
    data(){
        return{
            dialogFormVisible: true,
            form: {
                shopName: '',
                shopManager: '',
                sex: '1',
                mobile: '',
                password: '',
                businessBelong: '',
                province: '啊范德萨',
                city: '阿斯蒂芬',
                address: '',
                shopLogoPath: '',
            },
            dataRule: {
                shopName: [
                    { required: true, message: '门店名称不能为空', trigger: 'blur' },
                ],
                shopManager: [
                    { required: true, message: '店长不能为空', trigger: 'blur' },
                ],
                businessBelong: [
                    { required: true, message: '所属行业不能为空', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '店铺地址不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '店长手机号码不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    components: {
        cityCascader
    },
    computed: {
        businessBelongOptions: {
            get(){
                return this.$store.state.dictList.SHOP_BELONG || []
            },
            set(){

            }
        },
        modalStatus: {
            get(){
                return this.$store.state.createShopModalStatus || false
            },
            set(){

            }
        },
    },
    watch: {
        modalStatus(oldVal,newVal){
            this.modalStatus = this.$store.state.createShopModalStatus
        },
        businessBelongOptions(oldVal,newVal){
            this.businessBelongOptions = this.$store.state.dictList.SHOP_BELONG;
            console.log(this.businessBelongOptions)
        },
    },
    methods: {
        handleItemChange(){},
        handleConfirm(){
            let _this = this;
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = {
                        shopName: this.form.shopName,
                        shopManager: this.form.shopManager,
                        sex: this.form.sex,
                        mobile: this.form.mobile,
                        password: this.form.password,
                        businessBelong: this.form.businessBelong,
                        province: this.form.province,
                        city: this.form.city,
                        address: this.form.address,
                        shopLogoPath: this.form.shopLogoPath
                    }
                    requestaddShop(params).then(function(res){
                        _this.handleCloseModal()
                        if(res.data.code == '0000'){
                            Message({
                                message: '新建成功',
                                type: 'success'
                            })
                            EventBus.$emit(UPDATE_SHOP_LIST)
                        }else{
                            Message({
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }).catch(function(){
                        Message({
                            message:'新建失败',
                            type: 'error'
                        });
                    })
                }
            })
        },
        handleCloseModal(){
            this.form = {
                shopName: '',
                shopManager: '',
                sex: '1',
                mobile: '',
                password: '',
                businessBelong: '',
                province: '啊范德萨',
                city: '阿斯蒂芬',
                address: '',
                cityOptions: [
                    {
                        label: '江苏',
                        cities: []
                    },
                    {
                        label: '浙江',
                        cities: []
                    }
                ],
                props: {
                    value: 'label',
                    children: 'cities'
                },
                businessBelongOptions: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
            }
            this.$store.dispatch('closecreateShopModal')
        },
        handleAvatarSuccess(res, file) {
            this.form.shopLogoPath = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG ) {
                Message.error('上传头像图片只能是jpg或png格式!');
            }
            if (!isLt2M) {
                Message.error('上传头像图片大小不能超过 2MB!');
            }
            return (isJPG || isPNG) && isLt2M;
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .avatar-uploader{
        margin-left: 20px;
        margin-top: 20px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border: 1px solid #ddd;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
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
    .input-box{
        width: 480px;
        margin-left: 20px;
        margin-top: 20px;
    }
    .gender-list{
        margin-right: 20px;
    }
    .form-select-box{
        // margin-top: 20px;
        .form-select{
            width: 480px;
            margin-left: 20px;
        }
        .form-area{
            width: 480px;
            margin-left: 20px;
            margin-top: 20px;
        }
        &.form-business-box{
            margin-top: 20px;
        }
    }
</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';

    .create-shop-modal{
        .el-form-item__error{
            left: 24px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
        .el-dialog__headerbtn{
            .el-dialog__close{
                &:hover{
                    color: $color !important;
                }
            }
        }
        .form-item-box{
            .el-form-item__label{
                margin-top: 20px;
            }
        }
        .gender-item{
            .el-form-item__label{
                margin-top: 10px;
            }
        }
    }

</style>
