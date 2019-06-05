<template>
    <div class="add-responibility-container">
        <div class="container-header">
            <el-button class="btn-return" @click="handleReturn">返回</el-button>
        </div>
        <div class="container-content">
            <el-form :model="form" :rules="dataRule" status-icon ref="form" class="form-box">
                <div class="section1">
                    <el-form-item prop="userName" label="岗位名称" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入岗位名称"  class="pwd input-box" v-model="form.roleName" maxlength="20" ></el-input>
                    </el-form-item>
                    <el-form-item prop="userName" label="岗位备注" label-width="100px" class="form-item-box">
                        <el-input placeholder="请输入岗位备注"  class="pwd input-box" v-model="form.remark" maxlength="20" ></el-input>
                    </el-form-item>
                </div>
                <div class="section2" v-if="data.indexOf(0) != -1">
                    <div class="section2-header">
                        <div class="section2-lf">单项提成</div>
                        <div class="section2-rgt"></div>
                    </div>
                    <div class="section2-content">
                        <div>
                            <el-form-item prop="userName" label="开卡提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入1-100"  class="pwd input-box" v-model.number="singleCommission.openCard" maxlength="20" >
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="充值提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入1-100"  class="pwd input-box" v-model.number="singleCommission.incharge" maxlength="20" >
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="充次提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入1-100"  class="pwd input-box" v-model.number="singleCommission.inchargeTimers" maxlength="20" >
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="商品提成" label-width="100px" class="form-item-box">
                                <el-input placeholder="请输入1-100"  class="pwd input-box" v-model.number="singleCommission.shop" maxlength="20" >
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="section3" v-if="data.indexOf(1) != -1">
                    <div class="section3-header">
                        <div class="section3-lf">个人汇总提成</div>
                        <div class="section2-rgt">

                        </div>
                    </div>
                    <div class="section3-content">
                        <div>
                            <el-form-item prop="userName" label="业绩提成" label-width="100px" class="form-item-box">
                                <el-select v-model="section2Option" placeholder="请选择">
                                    <el-option
                                        v-for="item in section2Options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div></div>
                        </div>
                        <div v-for="(item,idx) in personalCommition" :key="idx">
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥{{item.low}}至</span>
                                <el-input placeholder="请输入金额" class="input-box" v-model="item.high" maxlength="20" @change="handlePersonChange($event,idx)" @blur="handlePersonBlur($event,idx)" v-if="(idx+1) != personalCommition.length"></el-input>
                                <span v-else>无穷大</span>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例" v-model="item.rate" maxlength="20" >
                                    <template slot="append">%</template>
                                </el-input>
                            </el-form-item>
                            <el-button class="el-icon-plus btn-add" v-if="idx == 0" @click="handlePersionalAdd"></el-button>
                            <el-button class="el-icon-minus btn-add" v-else-if="idx == personalCommition.length -2" @click="handlePersionaldelete"></el-button>
                        </div>

                        <div class="section3-btn">
                            <el-button class="btn-ensure" @click="handleSavePersonData">确定</el-button>
                        </div>
                        <div class="section3-list">
                            <ul>
                                <li v-for="(item,idx) in commitionTypeList" :key="idx">
                                    <div class="section-list-header">
                                        <div class="section-lf">
                                            <span v-if="item.type == '01'">开卡业绩</span>
                                            <span v-else-if="item.type == '02'">充值业绩</span>
                                            <span v-else-if="item.type == '03'">充次业绩</span>
                                            <span v-else>商品业绩</span>
                                        </div>
                                        <div class="section-rgt">
                                            <span class="el-icon-close"></span>
                                        </div>
                                    </div>
                                    <div class="section-list-content" v-for="(simItem,simIdx) in item.list" :idx="simIdx">
                                        <span>提成区段¥{{simItem.low}}至</span>
                                        <span>至¥{{simItem.high}}</span>
                                        <span>此区段提成比例：{{simItem.rate}}%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="section3" v-if="data.indexOf(2) != -1">
                    <div class="section3-header">
                        <div class="section3-lf">店面业绩汇总提成</div>
                        <div class="section2-rgt">

                        </div>
                    </div>
                    <div class="section3-content">
                        <div>
                            <el-form-item prop="userName" label="业绩提成" label-width="100px" class="form-item-box">
                                <el-select v-model="section2Option" placeholder="请选择">
                                    <el-option
                                        v-for="item in section2Options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div></div>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-plus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                            <el-button class="el-icon-minus btn-add"></el-button>
                        </div>
                        <div>
                            <el-form-item prop="userName" label="提成区段" label-width="100px" class="form-item-box">
                                <span class="area-money">￥0</span>
                                <el-input placeholder="请输入金额" class="pwd input-box" v-model="form.userName" readonly maxlength="20" ></el-input>
                            </el-form-item>
                            <el-form-item prop="userName" label="此区段提成比例" label-width="120px" class="form-item-box">
                                <el-input placeholder="请输入0-100的提成比例"  class="pwd input-box" v-model="form.userName" maxlength="20" ></el-input>
                            </el-form-item>
                        </div>
                        <div class="section3-btn">
                            <el-button class="btn-ensure">确定</el-button>
                        </div>
                        <div class="section3-list">
                            <ul>
                                <li>
                                    <div class="section-list-header">
                                        <div class="section-lf">充值业绩</div>
                                        <div class="section-rgt">
                                            <span class="el-icon-close"></span>
                                        </div>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥0至</span>
                                        <span>至¥2</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                    <div class="section-list-content">
                                        <span>提成区段¥3至</span>
                                        <span>至¥无限</span>
                                        <span>此区段提成比例：2%</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="container-footer">
            <el-button class="btn-save-return" @click="handleSave">保存并返回</el-button>
        </div>
    </div>
</template>
<script>
    import { requestCreateRole } from '@/services/service';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                section2Options: [
                    {
                        label: '开卡业绩',
                        value: '01',
                        disabled: false
                    },
                    {
                        label: '充值业绩',
                        value: '02',
                        disabled: false
                    },
                    {
                        label: '商品业绩',
                        value: '03',
                        disabled: false
                    },
                    {
                        label: '充次业绩',
                        value: '04',
                        disabled: false
                    },
                ],
                section2Option: '',
                section2Area: [
                    // {
                    //     start: 0,
                    //     end: 1,
                    //     percent: 0,
                    // }
                ],
                section3Area: [
                    // {
                    //     start: 0,
                    //     end: 1,
                    //     percent: 0,
                    // }
                ],
                section3Options: [
                    {
                        label: '开卡业绩',
                        value: '01',
                        disabled: false
                    },
                    {
                        label: '充值业绩',
                        value: '02',
                        disabled: false
                    },
                    {
                        label: '商品业绩',
                        value: '03',
                        disabled: false
                    },
                    {
                        label: '充次业绩',
                        value: '04',
                        disabled: false
                    },
                ],
                section3Option: '',
                singleCommission: {       // 单项提成
                    openCard: '',
                    incharge: '',
                    inchargeTimers: '',
                    shop: ''
                },
                personalCommition: [
                    {
                        low: 0,
                        rate: '',
                        high: '',
                        "type":"01",
                        "commissionId":'',
                        businessType: '01',
                    },
                    {
                        low: 0,
                        rate: '',
                        high: 100000000000,
                        "type":"01",
                        "commissionId":'',
                        businessType: '01',
                    }
                ],
                personalCommitionInit: [
                    {
                        low: 0,
                        rate: '',
                        high: '',
                        "type":"01",
                        "commissionId":'',
                        businessType: '01',
                    },
                    {
                        low: 0,
                        rate: '',
                        high: 1000000000,
                        "type":"01",
                        "commissionId":'',
                        businessType: '01',
                    }
                ],         // 选项数据初始化
                commitionTypeList:[
                    // {
                    //     type: '01',
                    //     list: [
                    //         {
                    //             low: 0,
                    //             rate: 0,
                    //             high: 0
                    //         }
                    //     ]
                    // }
                ],

                form: {
                    roleName: '',
                    remark: '',
                    commissions: {
                        // 01 开卡业务 02 充值业务 03 冲次业绩04 商品业绩
                        // "01": [{
                        //             "type":"01",
                        //             "commissionId":'',
                        //             "low": "213",
                        //             businessType: '01',
                        //             rate: '10',
                        //             "high":"215",
                        //         }]

                    }
                },
                dataRule: {

                }
            }
        },
        props: ['data'],
        methods: {
            handleReturn(){
                this.$parent.currentMode = true
            },
            handleSelectionChange(){},
            handleSave(){
                if(!this.form.roleName){
                    return Message.error('请输入岗位名称');
                }
                this.commitionTypeList.forEach(item=>{
                    this.form.commissions[`${item.type}`] = item.list;
                });
                let params1 = Object.assign({},this.form,{shopId: this.$route.params.id});
                requestCreateRole(params1).then((res)=>{
                    if(res.data.code == '0000'){
                        this.$parent.currentMode = true;
                        this.$parent.initData();
                    }
                })
            },
            // 个人汇总新增
            handlePersionalAdd(){
                this.personalCommition.splice(this.personalCommition.length - 2, 0,{
                    "type":"01",
                    "commissionId":'',
                    "low": "",
                    businessType: '01',
                    rate: '',
                    "high":"",
                });
            },
            // 个人汇总删除
            handlePersionaldelete(){
                this.personalCommition.splice(this.personalCommition.length - 2, 1);
            },
            handlePersonChange(val,idx){
                if(this.personalCommition.length == idx +1 ){
                    return
                }
                this.$set(this.personalCommition[idx+1],'low',val);
            },
            handlePersonBlur(val,idx){
                if(this.personalCommition[idx].high <= this.personalCommition[idx].low){
                    return Message.error('请输入正确的提成区间');
                }
            },
            handleSavePersonData(){
                if(!this.section2Option){
                    return Message.error('请选择提成类型');
                }
                let filterArr = this.personalCommition.filter(item=>{
                    return (item.rate != '' && item.high != '')
                });
                this.commitionTypeList.push({
                    type: this.section2Option,
                    list: filterArr
                });
                this.section2Options.forEach((item,idx)=>{
                    if(item.value == this.section2Option){
                        return this.$set(this.section2Options[idx],'disabled',true);
                    }
                });
                this.section2Option = '';
                this.personalCommition = this.personalCommitionInit;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .add-responibility-container{
        .container-header{
            padding: 10px;
            .btn-return{
                @include buttonSet($color);
            }
        }
        .container-content{
            margin-top: 20px;
            .section1{
                display: flex;
            }
            .section2{
                .section2-header{
                    display: flex;
                    padding: 30px;
                }
                .section2-content{
                    >div{
                        display: flex;
                    }
                }
            }
            .section3{
                .section3-header{
                    display: flex;
                    padding: 30px;
                }
                .section3-content{
                    >div{
                        display: flex;
                        .form-item-box{
                            .area-money{
                                margin: 0 10px;
                            }
                            .input-box{
                                width: 110px;
                            }
                        }
                        .btn-add{
                            @include buttonSet($color);
                            height: 40px;
                            width: 70px;
                            margin-left: 20px;
                        }
                    }
                    .section3-btn{
                        display: flex;
                        justify-content: flex-end;
                        margin-right: 50px;
                        .btn-ensure{
                            @include buttonSet($color);
                        }
                    }
                    .section3-list{
                        ul{
                            width: 100%;
                            li{
                                margin: 30px;
                                background: #f5f5f5;
                                padding: 10px;
                                .section-list-header{
                                    display: flex;
                                    justify-content: space-between;
                                    span{
                                        &:hover{
                                            cursor: pointer;
                                            opacity: .7;
                                        }
                                    }
                                }
                                .section-list-content{
                                    display: flex;
                                    justify-content: space-between;
                                    margin-top: 20px;
                                    padding-right: 50px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .container-footer{
            padding: 10px;
            .btn-save-return{
                @include buttonSet($color)
            }
        }
    }
</style>
<style lang="scss">
    .add-responibility-container{
        .form-item-box{
            .el-form-item__content{
                display: flex;
            }
        }
    }

</style>
