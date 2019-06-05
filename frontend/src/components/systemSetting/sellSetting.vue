<template>
    <div class="container">
        <div class="section-1">
            <div class="section1">
                <div class="section-lf">
                    <span class="section-lf-title">系统支付方式设置（灰色停用）</span>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.payTypeSetting"
                        @change="handleUpdate('zv_system_pay_type',true)"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2" v-show="form1.payTypeSetting">
                <ul>
                    <li :class="{'disabled' : form0.content[0] == 0}" @click="handleToggleSystemPayType(0)"><div class="icon1" ></div>现金</li>
                    <li :class="{'disabled' : form0.content[1] == 0}" @click="handleToggleSystemPayType(1)"><div class="icon2" ></div>储值卡</li>
                    <li :class="{'disabled' : form0.content[2] == 0}" @click="handleToggleSystemPayType(2)"><div class="icon3" ></div>扫码支付</li>
                    <li :class="{'disabled' : form0.content[3] == 0}" @click="handleToggleSystemPayType(3)"><div class="icon4" ></div>支付宝</li>
                    <li :class="{'disabled' : form0.content[4] == 0}" @click="handleToggleSystemPayType(4)"><div class="icon5" ></div>微信</li>
                    <li :class="{'disabled' : form0.content[5] == 0}" @click="handleToggleSystemPayType(5)"><div class="icon6" ></div>银行卡</li>
                    <li :class="{'disabled' : form0.content[6] == 0}" @click="handleToggleSystemPayType(6)"><div class="icon7" ></div>优惠券</li>
                    <li :class="{'disabled' : form0.content[7] == 0}" @click="handleToggleSystemPayType(7)"><div class="icon8" ></div>美团</li>
                    <li :class="{'disabled' : form0.content[8] == 0}" @click="handleToggleSystemPayType(8)"><div class="icon9" ></div>口碑</li>
                    <li :class="{'disabled' : form0.content[9] == 0}" @click="handleToggleSystemPayType(9)"><div class="icon10" ></div>闪惠</li>
                    <li :class="{'disabled' : form0.content[10] == 0}" @click="handleToggleSystemPayType(10)"><div class="icon11"></div>赊账</li>
                </ul>
            </div>
            <div class="section3" v-show="form1.payTypeSetting">
                <span class="section-lf-title">自定义支付方式设置（灰色停用）</span>
                <div class="section3-content">
                    <ul>
                        <li v-for="(item,idx) in form0.contentSelf" :class="{'disabled' : item.state == 0}" :key="idx" @click="handleToggleSelfStatus(item,idx)">
                            <div></div>
                            <span>{{item.name}}</span><br>
                            <span class="el-icon-delete btn-delete" @click="handleDelete(idx)"></span>
                        </li>
                    </ul>
                    <el-button class="btn-control el-icon-plus" @click="handleAdd"></el-button>
                </div>
            </div>
        </div>
        <div class="section-2">
            <div class="section1">
                <span class="section-lf-title">流水单号设置</span>
                <span>特别适合餐饮行业，每次销售后单号+1，最多支持8位数字。</span>
            </div>
            <div class="section2">
                <el-checkbox v-model="form1.state" class="el-cbx" @change="handleUpdate('zv_auto_flow_id',true)">自动流水单号</el-checkbox>
                <el-tooltip class="item" effect="dark" content="自定义初始流水单号后，每次销售后单号自动+1" placement="right">
                    <span class="el-icon-question icon-question"></span>
                </el-tooltip>
            </div>
            <div class="section3">
                <span>初始流水单号</span>
                <el-input v-model="form1.autoOrderId" placeholder="输入初始流水号" class="el-input"></el-input>
            </div>
            <div class="section4">
                <el-button class="btn-save" @click="handleUpdate('zv_auto_flow_id')">保存设置</el-button>
            </div>
        </div>
        <div class="section-3">
            <div class="section1">
                <div class="section-lf">
                    <span>积分抵现设置</span>
                    <el-tooltip class="item" effect="dark" content="设置后销售时积分将按比例抵现，积分数需个位数为0（刷新销售页面后生效）暂不支持跨店抵现" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.state"
                        @change="handleUpdate('zv_integral_to_money',true)"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <el-input v-model="form3.num" placeholder="输入积分数量" class="el-input"></el-input>
                <span>积分=1元</span>
            </div>
            <div class="section3">
                <el-button class="btn-save" @click="handleUpdate('zv_integral_to_money')">保存设置</el-button>
            </div>
        </div>
        <div class="section-4">
            <div class="section1">
                <div class="section-lf">
                    <span>是否启用每日流水号</span>
                    <el-tooltip class="item" effect="dark" content="特别适合餐饮行业,每日流水号重置" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form2.state"
                        @change="handleUpdate('zv_auto_day_flow_id',true)"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <span>编号前缀</span>
                <el-input v-model="form2.extraCode" placeholder="输入编号前缀" class="el-input"></el-input>
                <span>最小长度</span>
                <el-input v-model="form2.minLength" placeholder="输入最小长度" class="el-input"></el-input>
                <span>填充字符</span>
                <el-input v-model="form2.insertCode" placeholder="输入填充字符" class="el-input"></el-input>
                <span>最大长度</span>
                <el-input v-model="form2.maxLength" placeholder="输入最大长度" class="el-input"></el-input>
            </div>
            <div class="section3">
                <el-button class="btn-save" @click="handleUpdate('zv_auto_day_flow_id')">保存设置</el-button>
            </div>
        </div>
        <div class="section-5">
            <ul>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用会员密码</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.memberPwd"
                            @change="handleUpdate('zv_member_pwd',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用员工提成</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.staffCommition"
                            @change="handleUpdate('zv_staff_commission',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用交接班</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.staffsuccession"
                            @change="handleUpdate('zv_staff_succession',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">启用交接班备用金</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.staffsuccessionMoney"
                            @change="handleUpdate('zv_staff_succession_money',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">收银前台无图展示</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.cashierImage"
                            @change="handleUpdate('zv_cashier_image',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否允许零库存销售</span>
                    </div>

                    <div class="section-rgt">
                        <el-switch
                            v-model="form4.zeroInventory"
                            @change="handleUpdate('zv_able_zero_inventory',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog title="请输入支付名称" :visible.sync="dialogData.status" @close='handleCloseModal'>
            <el-input v-model="dialogData.name"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCloseModal" class="dialog-btn">取 消</el-button>
                <el-button type="primary" @click="handleConfirm"  class="dialog-btn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { requestUpdateContent,requestGetContent,requestUpdateState } from '@/services/service';
    import { Message } from 'element-ui'
    export default {
        data(){
            return{
                form0: {
                    state: true,
                    content: [1,1,1,1,1,1,1,1,1,1,1],
                    contentSelf: [
                    //     {
                    //     name: '测试',
                    //     state: 1
                    // }
                    ]
                },
                form1: {
                    state: true,
                    autoOrderId: '1',  //自动流水单号
                },
                form3: {
                    state: true,
                    num: 100
                },
                form2: {
                    state: true,
                    extraCode: '',
                    minLength: '',
                    insertCode: '',
                    maxLength: ''
                },
                form4: {
                    memberPwd: true,
                    staffCommition: true,
                    staffsuccession: true,
                    staffsuccessionMoney: true,
                    cashierImage: true,
                    zeroInventory: true
                },
                dialogData: {
                    status: false,
                    name: ''
                }
            }
        },
        mounted(){
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetContent(params).then(res=>{
                    let data = res.data.data;
                    this.form0.content = JSON.parse(data.zv_system_pay_type[0]);
                    this.form0.state = data.zv_system_pay_type[1];
                    this.form0.contentSelf = JSON.parse(data.zv_self_pay_type[0]);
                    this.form3.state =  data.zv_integral_to_money[1]
                })
            },
            handleToggleSelfStatus(item,idx){
                let itemCopy = {
                    name: item.name,
                    state: item.state == 1 ? 0 : 1
                };
                this.form0.contentSelf.splice(idx,1,itemCopy);
                this.handleUpdate('zv_self_pay_type');
            },
            handleDelete(idx){
                this.form0.contentSelf.splice(idx,1);
                this.handleUpdate('zv_self_pay_type');
            },
            handleAdd(){
                this.dialogData = {
                    status: true,
                    name: ''
                };
            },
            handleCloseModal(){
                this.dialogData.status = false;
            },
            handleConfirm(){
                if(!this.dialogData.name){
                    Message.error('请完善')
                    return
                }
                this.form0.contentSelf.push({
                    name: this.dialogData.name,
                    state: 0
                });
                this.handleUpdate('zv_self_pay_type');
                this.handleCloseModal();
            },
            handleToggleSystemPayType(idx){
                let state = this.form0.content[idx];
                this.form0.content.splice(idx,1,state == 1 ? 0 : 1);
                this.handleUpdate('zv_system_pay_type');
            },
            handleUpdate(type,isStateBtn = false){
                let params = {
                    contentType: type,
                    shopId: this.$route.params.id
                };
                if(!isStateBtn){
                    this.handleUpdateContent(type,params);
                }else{
                    this.handleUpdateState(type,params);
                }
            },
            // 更新内容
            handleUpdateContent(type,params){
                switch (type) {
                    case 'zv_system_pay_type':
                        params = Object.assign({},params,{
                            content: JSON.stringify(this.form0.content)
                        });
                        break;
                    case 'zv_self_pay_type':
                        params = Object.assign({},params,{
                            content: JSON.stringify(this.form0.contentSelf)
                        });
                        break;
                    case 'zv_auto_flow_id':
                        params = Object.assign({},params,{
                            content: this.form1.autoOrderId
                        });
                        break;
                    case 'zv_integral_to_money':
                        params = Object.assign({},params,{
                            content: this.form3.num
                        });
                        break;
                    case 'zv_auto_day_flow_id':
                        params = Object.assign({},params,{
                            content: JSON.stringify([
                                this.form2.extraCode,
                                this.form2.minLength,
                                this.form2.insertCode,
                                this.form2.maxLength
                            ])
                        });
                        break;
                    default:;
                }
                requestUpdateContent(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('保存成功');
                    }else{
                        Message.error('保存失败');
                    }
                })
            },
            // 更新状态
            handleUpdateState(type,params){
                requestUpdateState(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('保存成功');
                    }else{
                        Message.error('保存失败');
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .container{
        margin-top: 10px;
        .section-1{
            padding: 20px;
            background: #fff;
            .section1{
                display: flex;
                justify-content: space-between;
                .section-lf{
                    .section-lf-title{
                        padding-right: 5px;
                        margin-right: 2px;
                        color: #4a4a4a;
                    }
                    span{
                        color: rgb(218,218,218);
                    }
                }
            };
            .section2{
                ul{
                    display: flex;
                    li{
                        text-align: center;
                        margin-right: 20px;
                        &.disabled{
                            div{
                                opacity: .4;
                            }
                        }
                        div{
                            width: 50px;
                            height: 50px;
                            box-shadow: 3px 3px 2px #f5f5f5;
                            margin: 20px 0 10px;
                            cursor: pointer;
                            background: url("../../assets/images/icon_pay1.png") -13px center no-repeat;
                            &.icon2{
                                background-position-x: -101px;
                            }
                            &.icon3{
                                background-position-x: -191px;
                            }
                            &.icon4{
                                background-position-x: -281px;
                            }
                            &.icon5{
                                background-position-x: -371px;
                            }
                            &.icon6{
                                background-position-x: -461px;
                            }
                            &.icon7{
                                background-position-x: -551px;
                            }
                            &.icon8{
                                background-position-x: -641px;
                            }
                            &.icon9{
                                background-position-x: -731px;
                            }
                            &.icon10{
                                background-position-x: -821px;
                            }
                            &.icon11{
                                background-position-x: -911px;
                            }
                        }

                    }
                }
            };
            .section3{
                margin-top: 20px;
                .btn-control{
                    @include buttonSet($color-btn-green);
                    margin-right: 40px;
                    margin-top: 20px;
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        text-align: center;
                        margin-right: 20px;
                        &.disabled{
                            div{
                                opacity: .4;
                            }
                        }
                        div{
                            width: 50px;
                            height: 50px;
                            box-shadow: 3px 3px 2px #f5f5f5;
                            margin: 20px 0 10px;
                            cursor: pointer;
                            background: url("../../assets/images/icon_pay1.png") -13px center no-repeat;
                        }
                        .btn-delete:hover{
                            cursor: pointer;
                            opacity: .7;
                        }
                    }
                }
            }
        }
        .section-2{
            padding: 20px;
            background: #fff;
            margin-top: 10px;
            .section1{
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    border-right: 1px solid #ddd;
                    color: #4a4a4a;
                }
                span{
                    color: rgb(218,218,218);
                }
            }
            .section2{
                margin-top: 20px;
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
                .el-cbx{
                    margin-right: 0;
                }
            }
            .section3{
                margin-top: 20px;
                .el-input{
                    width: 150px;
                }
            }
            .section4{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-3{
            margin-top: 10px;
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    color: #4a4a4a;
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
            }
            .section2{
                margin-top: 20px;
                .el-input{
                    width: 100px;
                    margin-right: 10px;
                }
            }
            .section3{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-4{
            margin-top: 10px;
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .section-lf-title{
                    padding-right: 5px;
                    margin-right: 2px;
                    color: #4a4a4a;
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
            }
            .section2{
                margin-top: 20px;
                .el-input{
                    width: 100px;
                    margin-right: 10px;
                }
                span{
                    margin-right: 10px;
                }
            }
            .section3{
                margin-top: 20px;
                .btn-save{
                    @include buttonSet($color-btn-green);
                }
            }
        }
        .section-5{
            padding-bottom: 20px;
            ul{
                li{
                    padding: 20px;
                    background: #fff;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
