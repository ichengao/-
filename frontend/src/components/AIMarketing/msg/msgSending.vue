<template>
    <div class="msg-sending-container">
        <div class="section-lf">
            <div class="section1">
                发送须知：
                <br>1、根据工信部《通信短信息服务管理规定》要求，所有营销短信需在结尾加【退订回复N】的退订机制，系统已在短信内预置【退订回复N】，无需重复添加
                <br>2、短信发送时间：08:00-20：00，如有未收到的情况，请48小时内及时联系客服
                <br>3、达到时间：测试短信30分钟左右，群发短信1小时25分钟左右
                <br>4、短信内容：必须正规合法，如若出现违法内容，将自行承担一切法律责任。
            </div>
            <div class="section2">
                <div class="section2-header">
                    短信发送 <span>(您还剩余短信{{lastMsgNum}}条)</span>
                </div>
                <div class="section2-content">
                    <div class="member-select">
                        <el-button class="select-btn" @click="handleChooseMember">选择会员</el-button>
                        <div class="member-lf">
                            <span v-for="(item,idx) in memberArr" :key="idx">{{item.mobile}},</span>
                        </div>
                        <span class="member-rgt">已选择{{memberArr.length}}位会员</span>
                    </div>
                    <div class="msg-template">
                        <span>短信模板:</span>
                        <div class="msg-template-list">
                            <span @click="handleChooseTemplate('01')">系统短信</span>
                            <span @click="handleChooseTemplate('02')">祝福短信</span>
                            <span @click="handleChooseTemplate('03')">营销短信</span>
                        </div>
                    </div>
                    <div class="msg-edit">
                        <el-input
                            type="textarea"
                            :rows="10"
                            placeholder="请输入内容"
                            class="msg-edit-content"
                            v-model="msgContent">
                        </el-input>
                        <!--<div class="msg-edit-content" contenteditable="true">-->
                            <!--{{msgContent}}-->
                        <!--</div>-->
                        <div class="msg-edit-footer">
                            <span>短信签名【安徽学士】按1条计费</span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="section2-footer">
                    <el-radio>同意短信发送条款</el-radio>
                    <el-button class="btn-send" @click="handleSend">发送</el-button>
                </div>
            </div>
        </div>
        <div class="section-rgt">
            <div class="section-content">
                <span>预览区</span>
                <div class="preview">
                    <p>{{msgContent}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetMsgReamin,requestSendMsg } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_MSG_TEMPLATE,UPDATE_MSG_MEMBER } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                lastMsgNum: 0,
                msgContent: '',
                memberArr: []
            }
        },
        created(){
            this.initData();
        },
        mounted(){
            EventBus.$on(UPDATE_MSG_TEMPLATE,res=>{
                this.msgContent = res
            })
            EventBus.$on(UPDATE_MSG_MEMBER,res=>{
                this.memberArr = res
            })
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetMsgReamin(params).then(res=>{
                    this.lastMsgNum = res.data.data.msgCount
                })
            },
            handleChooseMember(){
                this.$store.dispatch('openMsgModuleForMemberChooseModalStatus');
            },
            handleChooseTemplate(type){
                this.$store.dispatch('openMsgTemplateModal',type);
            },
            handleSend(){
                if(this.memberArr.length == 0){
                    Message.error('请先选中会员');
                    return
                }
                let memberIds = [];
                this.memberArr.forEach(item=>{
                    memberIds.push(item.memberId)
                });
                let params = {
                    memberIds: memberIds,
                    shopId: this.$route.params.id,
                    msgContent: this.msgContent
                };
                requestSendMsg(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('发送成功')
                    }else{
                        Message.error('发送失败')
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .msg-sending-container{
        margin-top: 10px;
        display: flex;
        .section-lf{
            flex: 1;
            background: #fff;
            padding: 15px 20px;
            .section1{
                background: #FFE7CE;
                border: 1px solid $color;
                padding: 15px 20px;
                border-radius: 5px;
                line-height: 20px;
            }
            .section2{
                margin-top: 15px;
                border: 1px solid $color;
                border-radius: 5px;
                .section2-header{
                    background: $color;
                    padding: 10px 15px;
                    color: #fff;
                    font-size: 18px;
                    span{
                        font-size: 14px;
                    }
                }
                .section2-content{
                    padding: 10px;
                    .member-select{
                        display: flex;
                        justify-content: space-between;
                        box-shadow: 0 0 15px rgba(165,45,1,.2);
                        align-items: center;
                        padding: 10px;
                        .member-lf{
                            display: flex;
                            flex-wrap: wrap;
                            margin-left: 10px
                        }
                        .member-rgt{
                            width: 100px;
                        }
                        .select-btn{
                            @include buttonSet($color);
                            padding: 8px 15px;
                        }
                    }
                    .msg-template{
                        display: flex;
                        align-items: center;
                        font-size: 18px;
                        margin: 20px 10px;
                        .msg-template-list{
                            display: flex;
                            margin-left: 30px;
                            span{
                                padding: 5px 10px;
                                border: 1px solid $color;
                                color: $color;
                                margin-right: 15px;
                                border-radius: 3px;
                                font-size: 14px;
                                &:hover{
                                    cursor: pointer;
                                    opacity: .7;
                                }
                            }
                        }
                    }
                    .msg-edit{
                        .msg-edit-content{
                            border: 1px solid #ddd;
                            border-bottom: 0;
                            min-height: 200px;
                            border-radius: 5px;
                            outline: none;
                        }
                        .msg-edit-footer{
                            border: 1px solid #ddd;
                            padding: 10px;
                            border-top: 0;
                            display: flex;
                            justify-content: space-between;
                            border-radius: 5px;
                        }
                    }
                }
                .section2-footer{
                    display: flex;
                    padding: 20px;
                    justify-content: space-between;
                    align-items: center;
                    .btn-send{
                        @include buttonSet($color);
                        padding: 8px 20px;
                    }
                }
            }
        }
        .section-rgt{
            margin-left: 10px;
            width: 318px;
            background: #fff;
            .section-content{
                margin: 10px;
                background: #f5f5f5;
                text-align: center;
                padding-top: 20px;
                .preview{
                    background: url("../../../assets/images/perview.png") 0 0 no-repeat;
                    background-size: 100% auto;
                    height: 500px;
                    margin-top: 20px;
                    padding-top: 125px;
                    p{
                        background: #fff;
                        padding: 5px;
                        border-radius: 3px;
                        text-align: left;
                        width: 215px;
                        margin: 0 20px 0 37px;
                    }
                }
            }

        }
    }
</style>
<style lang="scss">
    .msg-sending-container{
        .el-textarea__inner{
            border: 0;
            min-height: 200px;
        }
    }
</style>
