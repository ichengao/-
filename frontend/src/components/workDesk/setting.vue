<template>
    <div>
        <div class="section-position">
            <span>当前位置：</span> 设置 
        </div>
        <div class="setting-wrap">
            <el-form ref="form" class="setting-form" :model="form" :rules="dataRule" status-icon >
                <div class="form-lf">
                    <div class="form-logo">
                        <img :src="form.shopLogoPath" alt="">
                        <div>
                            <el-button type="success" class="upload-btn" @click="handleClickLogo">上传品牌logo</el-button>
                        </div>
                        <input type="file" accept="image/png, image/jpeg" @change="handleChangeLogo" ref="logoFile">
                    </div>
                    <div class="form-user">
                        <img :src="form.adminHeadPath" alt="">
                        <div>
                            <el-button type="success" class="upload-btn" @click="handleClickUserImage">上传头像</el-button>
                        </div>
                        <input type="file" @change="handleChangeUserImage" accept="image/png, image/jpeg" ref="userFile">
                    </div>
                    <div class="change-pwd">
                        <span @click="handleOpenChangePwdModal">修改密码</span>
                    </div>
                </div>
                <div class="form-rgt">
                    <el-form-item prop="shopBrand" class="item-wrap">
                        <span>品牌名称</span>
                        <el-input placeholder="请输入品牌名称" label="" class="user input-box element-setting-wrap" v-model="form.shopBrand" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item prop="adminName" class="item-wrap">
                        <span>真实姓名</span>
                        <el-input placeholder="真实姓名" class="user input-box" v-model="form.adminName" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item prop="nickName" class="item-wrap">
                        <span>账号昵称</span>
                        <el-input placeholder="请输入您的昵称" class="user input-box" v-model="form.nickName" maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item prop="sex" class="item-wrap">
                        <span>性&emsp;&emsp;别</span>
                        <el-radio-group class="input-box" v-model="form.sex" size="small">
                            <el-radio label="1" class="gender-list">男</el-radio>
                            <el-radio label="2" class="gender-list">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="mobile" class="item-wrap">
                        <span>手机号码</span>
                        <el-input class="user input-box" v-model="form.mobile" disabled="" maxlength="20"></el-input>
                        <span @click="handleOpenChangePhoneModal" class="btn-change-mobile">修改手机号</span>
                    </el-form-item>
                    <el-form-item prop="email" class="item-wrap">
                        <span>电子邮件</span>
                        <el-input class="user input-box" v-model="form.email" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item prop="address" class="item-wrap">
                        <span>联系地址</span>
                        <el-cascader
                            :options="form.cityOptions"
                            @active-item-change="handleItemChange"
                            :props="form.props"
                            class="input-box"
                        ></el-cascader>
                        <div>
                            <span class="form-indent">联系地址</span>
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入详细地址"
                                class="form-area"
                            v-model="form.address">
                            </el-input>
                        </div>
                    </el-form-item>
                    <div class="submit-wrap">
                        <el-button type="success" class="setting-submit" @click="handleSubmit">保存</el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
import { requestUpdateSetting,requestUploadImage } from '@/services/service';
import { Message } from 'element-ui'
import defaultImage from '@/assets/images/icon_logo.png'
export default {
    name: 'setting',
    data(){
        return {
            form: {
                shopBrand: '',
                adminName: '',
                nickName: '',
                sex: '1',
                mobile: '',
                email: '',
                address: '',
                adminHeadPath: defaultImage,
                shopLogoPath: defaultImage,
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
                }
            },
            dataRule: {
                shopBrand: { required: true, message: '品牌名称不能为空', trigger: 'blur' },
                adminName: { required: true, message: '真实姓名不能为空', trigger: 'blur' },
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            setTimeout(()=>{
                let obj = {}
                if(!this.$store.state.userInfo.sex){
                    obj.sex = '1' 
                }
                if(!this.$store.state.userInfo.adminHeadPath){
                    obj.adminHeadPath=defaultImage
                }
                if(!this.$store.state.userInfo.shopLogoPath){
                    obj.shopLogoPath=defaultImage
                }
                this.form = Object.assign({},this.form,this.$store.state.userInfo,obj)
            },1000)
        },
        handleItemChange(){

        },
        handleClickLogo(){
            this.$refs.logoFile.click()
        },
        handleChangeLogo(e){
            let _this = this;
            let form = new FormData(e.target.files[0]);
            form.append('file', e.target.files[0])
            requestUploadImage(form).then(function(res){
                if(res.data.code == '0000'){
                    _this.form.shopLogoPath = res.data.data.url
                }else{
                    Message.error('上传失败')
                }
            }).catch(function(){
                Message.error('上传失败')
            })
        },
        handleClickUserImage(){
            this.$refs.userFile.click()
        },
        handleChangeUserImage(e){
            let _this = this;
            let form = new FormData(e.target.files[0]);
            form.append('file', e.target.files[0])
            requestUploadImage(form).then(function(res){
                if(res.data.code == '0000'){
                    _this.$set(_this.form,'adminHeadPath',res.data.data.url)
                    console.log(_this.form)
                }else{
                    Message.error('上传失败')
                }
            }).catch(function(err){
                console.log(err)
                Message.error('上传失败')
            })
        },
        handleSubmit(){
            let _this = this
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let params = {
                        shopBrand: this.form.shopBrand,
                        adminName: this.form.adminName,
                        nickName: this.form.nickName,
                        sex: this.form.sex,
                        mobile: this.form.mobile,
                        email: this.form.email,
                        address: this.form.address,
                        province: this.form.province,
                        city: this.form.city,
                        adminHeadPath: this.form.adminHeadPath,
                        shopLogoPath: this.form.shopLogoPath
                    }
                    requestUpdateSetting(params).then(function(res){
                        if(res.data.code == '0000'){
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
        handleOpenChangePwdModal(){
            this.$store.dispatch('openChangePwdModal')
        },
        handleOpenChangePhoneModal(){
            this.$store.dispatch('openChangePhoneModal')
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/common.scss';

    .section-position{
        padding: 20px 30px;
        span{
            color:#ababab; 
        }
    }
    .setting-wrap{
        margin: 0 30px 30px;
        background: #fff;
        border-radius: 5px;
        min-height: 600px;
        padding: 40px 50px;
        .setting-form{
            display: flex;
            .form-lf{
                width: 25%;
                text-align: center;
                img{
                    width: 131px;
                    height: 131px;
                    border-radius: 50%;
                    margin-top: 30px;
                }
                input{
                    display: none;
                }
                .upload-btn{
                    width: 131px;
                    height: 40px;
                    background: $color;
                    border-color: $color;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 20px;
                }
                .change-pwd{
                    margin-top: 30px;
                    span{
                        font-size: 16px;
                        cursor: pointer;
                    }
                }
            }
            .form-rgt{
                width: 70%;
                margin-left: 40px;
                .item-wrap{
                    margin-top: 20px;
                    span{
                        font-size: 16px;
                    }
                    .input-box{
                        width: 60%;
                        margin-left: 20px;
                    }
                    .gender-list{
                        margin-right: 20px;
                    }
                    .form-area{
                        width: 60%;
                        margin-left: 20px;
                        margin-top: 20px;
                    }
                    .btn-change-mobile{
                        cursor: pointer;
                        margin-left: 20px;
                    }
                    .form-indent{
                        color: transparent;
                    }
                }
                .submit-wrap{
                    .setting-submit{
                        width: 65px;
                        height: 40px;
                        cursor: pointer;
                        background: $color;
                        border-color: $color;
                        margin: 30px 0 0 40%;
                    }
                }
                
            }
        }
    } 
</style>
<style lang='scss'>
    .setting-wrap{
        .el-form-item__error{
            left: 92px;
        }
    }
</style>