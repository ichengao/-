<template>
    <div class="modal-container change-phone-modal" v-if='modalStatus'>
        <el-dialog title="修改手机号" :visible.sync="modalStatus" @close='handleCloseModal' >
            <el-form :model="form" :rules="dataRule" status-icon ref="form"  v-if="form.step == 1">
                <div class="step1">
                    <p>第一步：验证您的手机号</p>
                    <el-form-item label="原始手机号" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入原始手机号" disabled class="pwd input-box" v-model="oldMobile" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="oldCode" label="验证码" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入验证码"  class="code-input input-box" v-model="form.oldCode" maxlength="20" ></el-input>
                        <el-button v-show="!form.isGetCode" @click="getCode" class="code-time">获取验证码</el-button>
                        <el-button plain v-show='form.isGetCode' v-text='form.getCodeTime + "s"' class="code-time code-time1"></el-button>
                    </el-form-item>
                    <div slot="footer" class="dialog-section1-footer">
                        <el-button type="primary" class="dialog-btn" @click="toNext">下一步</el-button>
                    </div>
                </div>
            </el-form>
            <el-form :model="form1" :rules="dataRule1" status-icon ref="form1" v-else>
                <div class="step2">
                    <p>第二步：输入新手机号</p>
                    <!-- 未知bug  添加个元素后正常校验 -->
                    <el-form-item label="新手机号" v-show="false" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入新手机号" class="input-box" v-model="form1.test" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile" label="新手机号" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入新手机号" class="input-box" v-model="form1.mobile" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newCode" label="验证码" label-width="100px"  class="form-item-box">
                        <el-input placeholder="请输入验证码"  class="code-input  input-box" v-model="form1.newCode" maxlength="20" ></el-input>
                        <el-button v-show="!form1.isGetCode" :disabled="!form1.isCanGet"  @click="getCode1" class="code-time">获取验证码</el-button>
                        <el-button plain v-show='form1.isGetCode' v-text='form1.getCodeTime + "s"' class="code-time code-time1"></el-button>
                    </el-form-item>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                        <el-button type="primary" @click="handleConfirm" class="dialog-btn">确 定</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import md5 from 'js-md5';
import { requestUpdatePhone } from '@/services/service';
import { Message } from 'element-ui'
export default {
    data(){
        // 手机号码校验
        let checkMobile = (rule, value, callback)=>{
            value = value + ''
            if(value.trim().length == 0){
                return callback(new Error('手机号码不能为空'));
            }
            if(value.length < 11 || value.length > 12 || (!Number(value)) ){
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        // 手机号码实时校验
        let checkMobileValue = (rule, value, callback)=>{
            value = value + ''
            if(value.trim().length == 0){
                callback(new Error(' '))
                return this.form1.isCanGet = false;
            }
            if(value.length < 11 || value.length > 12 || (!Number(value)) ){
                callback(new Error(' '))
                return this.form1.isCanGet = false;
            } else {
                callback()
                return this.form1.isCanGet = true;
            }
        };
        return{
            form: {
                oldCode: '',
                step: 1,
                isCanGet: false,
                getCodeTime: 30,
                timer: null
            },
            form1: {
                mobile: '',
                newCode: '',
                test: '',
                isCanGet: false,
                isGetCode: false,
                getCodeTime: 30,
                timer: null
            },
            dataRule: {
                oldCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                ]
            },
            dataRule1: {
                mobile: [
                    { validator: checkMobile,trigger: 'blur' },
                    { validator: checkMobileValue,trigger: 'change' }
                ],
                newCode: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {
        modalStatus: {
            get(){
                return this.$store.state.changePhoneModalStatus || false
            },
            set(){

            }
        },
        oldMobile: {
            get(){
                return this.$store.state.userInfo.mobile
            }
        }
    },
    watch: {
        modalStatus(oldVal,newVal){
            this.modalStatus = this.$store.state.changePhoneModalStatus
        }
    },
    methods: {
        handleConfirm(){
            let _this = this
            this.$refs['form1'].validate((valid)=>{
                if(valid){
                    let params = {
                        mobile: this.form1.mobile,
                        oldCode: this.form.oldCode,
                        newCode: this.form1.newCode
                    }
                    requestUpdatePhone(params).then(function(res){
                        _this.handleCloseModal()
                        if(res.data.msg == 'success'){
                            Message.success('修改成功');
                        }else{
                            Message.error(res.data.msg);
                        }
                    }).catch(function(){
                        Message.error('修改失败');
                    })
                }
            })
        },
        handleCloseModal(){
            this.form = {
                oldCode: '',
                step: 1,
                isCanGet: false,
                getCodeTime: 30,
                timer: null
            }
            this.form1 = {
                mobile: '',
                newCode: '',
                test: '',
                isCanGet: false,
                isGetCode: false,
                getCodeTime: 30,
                timer: null
            }
            this.$store.dispatch('closeChangePhoneModal')
        },
        getCode(){
            this.form.isGetCode = true;
            clearInterval(this.form.timer);
            this.form.timer = setInterval(()=>{
                if(this.form.getCodeTime > 0){
                    this.form.getCodeTime --
                }else{
                    clearInterval(this.form.timer)
                    this.form.isGetCode = false;
                    this.form.getCodeTime = 30;
                }
            },1000)
        },
        getCode1(){
            if(!this.form1.isCanGet){
                return
            }
            this.form1.isGetCode = true;
            clearInterval(this.form1.timer);
            this.form1.timer = setInterval(()=>{
                if(this.form1.getCodeTime > 0){
                    this.form1.getCodeTime --
                }else{
                    clearInterval(this.form1.timer)
                    this.form1.isGetCode = false;
                    this.form1.getCodeTime = 30;
                }
            },1000)
        },
        toNext(){
            this.$refs['form'].validate((valid)=>{
                if(valid){
                    this.form.step = 2;
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    @import '../../../assets/scss/common.scss';
    .dialog-section1-footer{
        text-align: right;
        margin-top: 20px;
        margin-right: 21px;

        .dialog-btn{
            padding: 10px 15px;
            background: $color;
            border-color: $color;
        }
    }
    .dialog-footer{
        text-align: right;
        margin-top: 20px;
        margin-right: 21px;
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
    .code-time{
        height: 40px;
        width: 112px;
        &.code-time1{
            margin-left: 0;
        }
    }

    .input-box{
        width: 500px;
        margin-left: 20px;
        margin-top: 20px;
        &.code-input{
            width: 384px;
        }
    }

</style>

<style lang="scss">
    @import '../../../assets/scss/common.scss';

    .change-phone-modal{
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
    }


</style>
