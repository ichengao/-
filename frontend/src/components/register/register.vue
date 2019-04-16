<template>
    <div class="container">
        <div class="container-box">
            <div class="container-header">
                <p class="header-title">众维智能</p>
                <p class="header-content">众维智能众维智能众维智能</p>
            </div>
            <div class="container-content">
                <h3 class="page-title">注册</h3>
                <el-form ref="form" class="login-form" :model="form" :rules="dataRule" status-icon @keyup.enter.native="doRegister" >
                    <el-form-item prop="mobile">
                        <el-input placeholder="手机号码" class="user input-box" v-model.number="form.mobile" prefix-icon="el-icon-mobile-phone" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="code_box">
                        <el-input placeholder="验证码" class="code input-box" v-model="form.code" prefix-icon="el-icon-message" maxlength="20" ></el-input>
                        <el-button :disabled='!form.isCanGet' v-show="!form.isGetCode" @click="getCode">获取验证码</el-button>
                        <el-button plain v-show="form.isGetCode" v-text='form.getCodeTime + "s"' class="code-time"></el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="密码"  class="pwd input-box" type="password" v-model="form.password" prefix-icon="el-icon-goods" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="confirm_password">
                        <el-input placeholder="确认输入密码" class="pwd input-box" type="password" v-model="form.confirm_password" prefix-icon="el-icon-goods" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="shop_brand">
                        <el-input placeholder="品牌名称"  class="input-box" v-model="form.shop_brand" prefix-icon="el-icon-news" maxlength="20" ></el-input>
                    </el-form-item>
                    
                    <el-button type="success" class="login-submit" @click="doRegister">注册</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import { requestRegister,requestGetRegisterCode } from '../../services/service';
import md5 from 'js-md5';
import { Message } from 'element-ui';
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
                return this.form.isCanGet = false;
            }
            if(value.length < 11 || value.length > 12 || (!Number(value)) ){
                callback(new Error(' '))
                return this.form.isCanGet = false;
            } else {
                callback()
                return this.form.isCanGet = true;
            }
        };
        // 确认输入密码校验
        let checkConfirmPwd = (rule, value, callback)=>{
            if(value != this.form.password){
                callback(new Error('两次输入的密码不一致'));
            }else{
                callback();
            }
        };
        return{
            form: {
                mobile: '',
                password: '',
                confirm_password: '',
                shop_brand: '',
                code: '',
                isCanGet: false,     // 是否可获取验证码
                isGetCode: false,    // 是否已获取验证码
                getCodeTime: 30,      // 倒计时时间
                initGetCodeTime: 30,  // 倒计时时间初始化
                timer: null,         // 倒计时定时器
            },
            dataRule: {
                mobile: [
                    { validator: checkMobile,trigger: 'blur' },
                    { validator: checkMobileValue,trigger: 'change' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                ],
                confirm_password: [
                    { required: true, message: '重复密码不能为空', trigger: 'blur' },
                    { validator: checkConfirmPwd,trigger: 'blur' }
                ],
                shop_brand: [
                    { required: true, message: '品牌名称不能为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        getCodeStatus(){
            return (this.form.mobile.trim() != '') 
        }
    },
    methods: {
        // 获取验证码
        getCode(){
            if(!this.form.isCanGet){
                return
            };
            let params = {
                mobile: this.form.mobile
            };
            requestGetRegisterCode(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message.success('短信已发送,请注意查收!');
                    this.form.isGetCode = true;
                    clearInterval(this.form.timer);
                    this.form.timer = setInterval(()=>{
                        if(this.form.getCodeTime > 1){
                            this.form.getCodeTime --;
                        }else{
                            this.form.isGetCode = false;
                            this.form.getCodeTime = this.form.initGetCodeTime;
                            clearInterval(this.form.timer);
                        }
                    },1000)
                }else{
                    Message.error(res.data.msg);
                }
            }).catch(()=>{
                Message.error('发送失败,请重试!');
            });
        },
        // 注册
        doRegister(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = {
                        mobile: this.form.mobile + '',
                        shopBrand: this.form.shop_brand,
                        password: md5(this.form.password),
                        code: this.form.code
                    }
                    requestRegister(params).then(function(res){
                        if(res.data.msg == '注册成功！'){
                            window.location.href='/login.html';
                        }else{
                            Message.error(res.data.msg);
                        }
                    }).catch(function(){
                        Message.error('注册失败！');
                    })
                }
            }) 
        }
    }
}
</script>
<style lang="scss">
    @import '../../assets/scss/common.scss';
    
    .container{
        background: url('../../assets/images/login_bg.jpg') 0 0 no-repeat;
        background-size: cover;
        .container-box{
            min-height: 100vh;
            background-color: rgba(0,0,0,.5); 
            padding-bottom: 30px;
            .container-header{
                text-align: center;
                padding: 50px 20px 20px;
                .header-title{
                    margin: 0 0 15px;
                    font-size: 38px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #fff;
                }
                .header-content{
                    font-size: 16px;
                    line-height: 1.5;
                    color: #909399;
                }
            }
            .container-content{
                width: 360px;
                padding: 15px 30px;
                background-color: #fff;
                text-align: center;
                margin: 0 auto;
                h3{
                    margin: 10px 0;
                    padding-bottom: 30px;
                }
                .login-form{
                    .pwd-control{
                        display: flex;
                        margin-top: 20px;
                        justify-content: space-between;
                    }
                    .login-submit{
                        margin-top: 20px;
                        width: 100%;
                        background-color: $color;
                        border-color: $color;
                    }
                    .code-time{
                        width: 102px;
                    }
                    .code{
                        width: 243px;
                    }
                }
                .do-reg{
                    text-align: center;
                    padding: 20px 0;
                    a{
                        color: $color;
                    }
                }
            }
        }
        
    }
</style>
