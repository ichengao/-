<template>
    <div class="container member-setting-container">
        <div class="section-1">
            <div class="section1">
                <div class="section-lf">
                    <span class="section-lf-title">消费积分规则</span>
                    <span>销售记账时，会员积分将依据本规则自动累加</span>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form1.integralRule"
                        active-text="启用"
                        @change="handleUpdate('zv_integral',true)"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section2">
                <el-form :model="form1" status-icon ref="form1" >
                    <el-input v-model="form1.money" placeholder="输入金额" class="el-input integral-input"></el-input>
                    <span>元 = </span>
                    <el-input v-model="form1.integral" placeholder="输入积分" class="el-input integral-input"></el-input>
                    <span>积分</span>
                    <el-tooltip class="item" effect="dark" content="小技巧：积分按照整数计算，不支持小数点积分计算。
                    小技巧：若举办“会员日双倍积分”活动，可仅调整当天的积分规则，以前的积分不受影响。
                    （切记：活动结束后，立即改回原来的规则。）场景举例：如设置消费积分10元1分，
                    则消费15元积1分，消费5元不积分。" placement="right">
                        <span class="el-icon-question icon-question"></span>
                    </el-tooltip>
                    <el-button class="btn-save" @click="handleUpdate('zv_integral')">保存</el-button>
                </el-form>
            </div>
        </div>
        <div class="section-2">
            <div class="section1">
                <span class="section-lf-title">会员级别和折扣设置(会员折扣输入范围：0--10)</span>
                <span>以历史积分为标准，设定不同的等级和折扣，刺激消费</span>
            </div>
            <div class="section2">
                <div class="section-lf">
                    <span class="section-lf-title">等级晋升规则</span>
                    <el-radio v-model="form2.levelType" label="1">按累计积分晋升等级</el-radio>
                    <el-radio v-model="form2.levelType" label="2">按当前积分晋升等级</el-radio>
                </div>
                <div class="section-rgt">
                    <el-switch
                        v-model="form2.state"
                        @change="handleUpdate('zv_member_grade',true)"
                        active-text="启用"
                        inactive-text="关闭">
                    </el-switch>
                </div>
            </div>
            <div class="section3">
                <el-form :model="form2" status-icon ref="form2" >
                    <ul>
                        <li v-for="(item,idx) in form2.list" :key="idx">
                            <span>等级名称</span>
                            <el-input v-model="item.levelName" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>当会员积分在</span>
                            <el-input v-model="item.startArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>到</span>
                            <el-input v-model="item.endArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>之间，可享受</span>
                            <el-input v-model="item.endArea" placeholder="输入等级名称" class="el-input"></el-input>
                            <span>折，</span>
                            <el-button class="btn-delete" v-if="idx != 0" @click="handleDeleteLine(idx)">删除</el-button>
                        </li>
                    </ul>
                </el-form>
                <div class="control-btn">
                    <el-button class="btn-control el-icon-plus" @click="handleAddLine"></el-button>
                    <el-button class="btn-control" @click="handleUpdate('zv_member_grade')">保存</el-button>
                </div>
            </div>
        </div>
        <div class="section-3">
            <ul>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">会员共享</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form3.set1"
                            active-text="启用"
                            @change="handleUpdate('zv_member_share',true)"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否发送短信提醒会员</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form3.set2"
                            @change="handleUpdate('zv_member_msg',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否自动生成会员卡号</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            v-model="form3.set3"
                            @change="handleUpdate('zv_auto_member_no',true)"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
                <li>
                    <div class="section-lf">
                        <span class="section-lf-title">是否禁用手动输入会员卡卡号</span>
                    </div>
                    <div class="section-rgt">
                        <el-switch
                            @change="handleUpdate('zv_able_input_no',true)"
                            v-model="form3.set4"
                            active-text="启用"
                            inactive-text="关闭">
                        </el-switch>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { requestUpdateContent,requestGetContent,requestUpdateState,requestGetGradelist,requestUpdateGradelist } from '@/services/service';
    import { Message } from 'element-ui'
    export default {
        data(){
            return{
                form1: {
                    money: 1,
                    integral: 100,
                    integralRule: true
                },
                form2: {
                    state: true,      // 晋级设置状态
                    levelType: '1',   // 晋级规则
                    list: [
                        {
                            levelName: '',
                            startArea: '0',
                            endArea: '0',
                            discount: '0'
                        }
                    ]
                },
                form3: {
                    set1: false,
                    set2: false,
                    set3: false,
                    set4: false,
                }
            }
        },
        created(){
            this.initData()
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetContent(params).then(res=>{
                    let data = res.data.data;
                    this.form1.integralRule = data.zv_integral[1] == 0 ? true : false
                    this.form1.money = JSON.parse(data.zv_integral[0])[0];
                    this.form1.integral = JSON.parse(data.zv_integral[0])[1];

                    this.form2.levelType = JSON.parse(data.zv_member_grade[0])[0];
                    this.form2.state = data.zv_member_grade[1] == 0 ? false : true;
                });
                requestGetGradelist(params).then(res=>{

                });
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
                    case 'zv_integral':
                        params = Object.assign({},params,{
                            content: JSON.stringify([this.form1.money,this.form1.integral])
                        });
                        break;
                    case 'zv_member_grade':
                        let rule = this.form2.list.filter(item=>{
                            return (item.levelName && item.startArea && item.endArea && item.discount)
                        });
                        params = Object.assign({},params,{
                            content: JSON.stringify([this.form2.levelType])
                        });
                        let configParamsList = [];
                        this.form2.list.forEach(item=>{
                            let obj = new Object({
                                low: item.startArea,
                                high: item.endArea,
                                rate: item.discount,
                                gradeName: item.levelName
                            });
                            configParamsList.push(obj);
                        });
                        let configParams = {
                            shopId: this.$route.params.id,

                        };
                        requestUpdateGradelist(configParams).then(res=>{

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
            // 新增一列
            handleAddLine(){
                this.form2.list.push({
                    levelName: '',
                    startArea: '0',
                    endArea: '0',
                    discount: '0'
                })
            },
            handleDeleteLine(idx){
                this.form2.list.splice(idx,1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .container{
        margin-top: 10px;
        .section-1{
            background: #fff;
            padding: 20px;
            .section1{
                display: flex;
                justify-content: space-between;
                .section-lf{
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
            }
            .section2{
                margin-top: 30px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .el-input{
                    width: 100px;
                    &.integral-input{
                        margin-left: 10px;
                    }
                }
                span{
                    padding-left: 10px;
                    &.icon-question{
                        color: $color-btn-green;
                        font-size: 18px;
                    }
                }
                .btn-save{
                    @include buttonSet($color-btn-green);
                    margin-left: 40px;
                }
            }
        };
        .section-2{
            background: #fff;
            padding: 20px;
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
            };
            .section2{
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
                .section-lf-title{
                    margin-right: 10px;
                }
            };
            .section3{
                margin-top: 20px;
                li{
                    margin-top: 20px;
                    .el-input{
                        width: 100px;
                        margin-right: 10px;
                    }
                    span{
                        margin-right: 10px;
                    }
                    .btn-delete{
                        @include buttonSet($color-btn-green);
                        margin-left: 40px;
                    }
                };
                .control-btn{
                    margin-top: 20px;
                    .btn-control{
                        @include buttonSet($color-btn-green);
                        margin-right: 40px;
                    }
                }
            }
        };
        .section-3{
            ul{
                padding-bottom: 20px;
                li{
                    margin-top: 10px;
                    background: #fff;
                    padding: 20px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
<style lang="scss">
    .member-setting-container{
        .el-tooltip__popper{
            max-width: 400px;
        }
    }
</style>
