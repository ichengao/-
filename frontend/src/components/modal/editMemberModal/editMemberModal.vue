<template>
    <div class="modal-container create-member-card-modal" v-if="modalStatus">
        <el-dialog title="编辑" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form" class="form-box">
                <div class="form-lf">
                    <p>顾客资料</p>
                    <el-form-item prop="userName" label="顾客姓名" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入顾客姓名"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile" label="手机号码" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入手机号码"  class="pwd input-box" v-model="form.mobile" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="会员密码" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入会员密码" type="password" class="pwd input-box" v-model="form.password" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="birthday" label="会员生日" label-width="100px" class="form-item-box">
                        <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" class="form-date">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="weiXin" label="微信" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入会员微信号"  class="pwd input-box" v-model="form.weiXin" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px" class="gender-item">
                        <el-radio-group class="form-radio" v-model="form.sex" size="small">
                            <el-radio label="1" class="gender-list">男</el-radio>
                            <el-radio label="2" class="gender-list">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="level" label="重要性" label-width="100px" class="form-item-box form-item-phone">
                        <el-select v-model="form.level" placeholder="请选择重要程度" class="form-select">
                            <el-option
                            v-for="item in form.levelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="guestFromId" label="客户来源" label-width="100px" class="form-item-box form-item-phone">
                        <el-select v-model="form.guestFromId" placeholder="请选择客户来源" class="form-select">
                            <el-option
                            v-for="item in form.guestFromIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="address" label="联系地址" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入会员联系地址"  class="pwd input-box" v-model="form.address" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="remark" label="备注信息" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入会员备注信息" type="textarea" class="pwd form-textarea" v-model="form.remark" maxlength="20" ></el-input>
                    </el-form-item>
                </div>
                <div class="form-rgt">
                    <p>卡资料</p>
                    <el-form-item prop="memberNo" label="会员卡号" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入或者扫描"  class="pwd input-box" v-model="form.memberNo" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="memberTypeId" label="卡类型" label-width="100px" class="form-item-box form-item-phone">
                        <el-select v-model="form.memberTypeId" placeholder="请选择会员卡类型" class="form-select">
                            <el-option
                            v-for="item in form.memberTypeIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="gradeId" label="卡等级" label-width="100px" class="form-item-box form-item-phone">
                        <el-select v-model="form.gradeId" placeholder="请选择卡等级" class="form-select">
                            <el-option
                            v-for="item in form.gradeIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="createDate" label="开卡日期" label-width="100px" class="form-item-box form-item-phone">
                        <el-date-picker v-model="form.createDate" type="date" class="form-date" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="openAdmin" label="开卡员工" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入开卡员工"  class="pwd input-box" v-model="form.openAdmin" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="balance" label="开卡金额" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入开卡金额"  class="pwd input-box" v-model="form.balance" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="giveBalance" label="赠送金额" label-width="100px" class="form-item-box form-item-phone">
                        <el-input placeholder="请输入赠送金额"  class="pwd input-box" v-model="form.giveBalance" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="payType" label="收款方式" label-width="100px" class="form-item-box form-item-phone">
                       <el-select v-model="form.payType" placeholder="请选择收款方式" class="form-select">
                            <el-option
                            v-for="item in form.payTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="referencesId" label="推荐人" label-width="100px" class="form-item-box form-item-phone">
                       <el-select v-model="form.referencesId" placeholder="请选择推荐人"  class="form-select">
                            <el-option
                            v-for="item in form.referencesIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传头像" label-width="100px" class="form-item-box">
                        <el-upload 
                            class="avatar-uploader"
                            action="/zv-member/zv/upload/oss"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="form.headPicture" :src="form.headPicture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <div class="footer-lf">
                    <el-checkbox v-model="form.message">发送欢迎短信</el-checkbox>
                    <el-checkbox v-model="form.printTicket">打印小票</el-checkbox>
                </div>
                <div class="footer-rgt">
                    <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                    <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { requestGetMemberDetail,requestUpdateMemberDetail,requestGetGradelist,requestGetTypelist } from '@/services/service';
import { Message } from 'element-ui'
import { LEVEL_OPTIONS,SERVER_URL } from '@/common/config'
export default { 
    data(){
        return{
            form: {
                message: false,
                printTicket: false,
                userName: '',
                sex: '1',
                mobile: '',
                password: '',
                birthday: '',
                weiXin: '',
                level: '',
                levelOptions: LEVEL_OPTIONS, //1-5
                guestFromId: '',  // 客户来源
                guestFromIdOptions: [],
                address: '',
                remark: '',
                memberNo: '',
                memberTypeId: '',
                memberTypeIdOptions: [],
                gradeId: '',
                gradeIdOptions: [],
                createDate: '',
                openAdmin: '',
                balance: '',
                giveBalance: '',
                payType: '',
                payTypeOptions: [],
                referencesId: '',
                headPicture: '',
            },
            dataRule: {
                userName: [
                    { required: true, message: '顾客姓名不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                ],
                memberNo: [
                    { required: true, message: '会员卡号不能为空', trigger: 'blur' },
                ],
                memberTypeId: [
                    { required: true, message: '卡类型不能为空', trigger: 'blur' },
                ],
                gradeId: [
                    { required: true, message: '卡等级不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        modalStatus: {
            get(){
                return this.$store.state.editMemberCardStatus.status || false
            },
            set(){

            }
        },
        modalData: {
            get(){
                if(this.$store.state.editMemberCardStatus.memberId){
                    this.initData()
                }
            },
            set(){

            }
        }
    },
    watch: {
        modalStatus(oldVal,newVal){
            this.modalStatus = this.$store.state.editMemberCardStatus.status
        },
        modalData(oldVal,newVal){
            this.modalData = this.$store.state.editMemberCardStatus.memberId
        }
    },
    methods: {
        initData(){
            let _this = this
            let params = {
                shopId: this.$route.params.id,
                memberId: this.$store.state.editMemberCardStatus.memberId
            }
            requestGetMemberDetail(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.form = Object.assign({},_this.form,res.data.data)
                }
            })
            requestGetGradelist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.form.gradeIdOptions = res.data.data
                }
            })
            requestGetTypelist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.form.guestFromIdOptions = res.data.data
                }
            })
        },
        handleItemChange(){},
        handleConfirm(){
            let _this = this;
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = {
                        shopId: this.$route.params.id,
                        memberId: this.$store.state.editMemberCardStatus.memberId,
                        message: this.form.message,
                        printTicket: this.form.printTicket,
                        userName: this.form.userName,
                        sex: this.form.sex,
                        mobile: this.form.mobile,
                        password: this.form.password,
                        birthday: this.form.birthday,
                        weiXin: this.form.weiXin,
                        level: this.form.level,
                        guestFromId: this.form.guestFromId,  // 客户来源
                        address: this.form.address,
                        remark: this.form.remark,
                        memberNo: this.form.memberNo,
                        memberTypeId: this.form.memberTypeId,
                        gradeId: this.form.gradeId,
                        openAdmin: this.form.openAdmin,
                        balance: this.form.balance,
                        giveBalance: this.form.giveBalance,
                        payType: this.form.payType,
                        referencesId: this.form.referencesId,
                        headPicture: this.form.headPicture,
                    }
                    requestUpdateMemberDetail(params).then(function(res){
                        _this.handleCloseModal()
                        if(res.data.code == '0000'){
                            Message({
                                message: '新建成功',
                                type: 'success'
                            })
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
            this.$store.dispatch('closeEditMemberCardStatus')
        },
        handleAvatarSuccess(res, file) {
            this.form.headPicture = res.data.url;
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
    @import '@/assets/scss/common.scss';
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
        width: 185px;
        margin-left: 10px;
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
    .form-box{
        display: flex;
        justify-content: space-between;
        .form-lf{
            width: 45%;
            p{
                padding-left: 20px;
                color: $color;
            }
            .form-date{
                width: 185px;
                margin-left: 10px;
                margin-top: 20px;
            }
            .form-select{
                width: 185px;
                margin-left: 10px;
                margin-top: 20px;
            }
            .form-textarea{
                width: 185px;
                margin-left: 10px;
                margin-top: 20px;
                height: 58px;
            }
            .form-radio{
                width: 185px;
                margin-left: 10px;
                margin-top: 34px;
            }
        }
        .form-rgt{
            width: 45%;
            margin-right: 5%;
            p{
                padding-left: 20px;
                color: $color;
            }
            .form-date{
                width: 185px;
                margin-left: 10px;
                margin-top: 20px;
            }
            .form-select{
                width: 185px;
                margin-left: 10px;
                margin-top: 20px;
            }
            .avatar-uploader{
                margin-left: 10px;
                margin-top: 20px;
                border: 1px solid #ddd;
                width: 58px;
                height: 58px;
                text-align: center;
                line-height: 58px;
            }
        }
    }
    .dialog-footer{
        display: flex;
        justify-content: space-between;
    }
</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';

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
            margin-top: 20px;
        }
    }
    .create-member-card-modal{
        .el-form-item__error{
            left: 24px;
        }
        .el-form-item{
            margin-bottom: 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label{
            color: $color;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
            background-color: $color;
            border-color: $color;
        }
    }
    
</style>