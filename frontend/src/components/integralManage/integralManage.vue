<template>
    <div class="container charge-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/shopdetail/'+currentId+'/integral/integralChange'" active-class="active">
                    <div>积分变动</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/integral/giftsExchange'" active-class="active">
                    <div>礼品兑换</div>
                </router-link>
                <router-link :to="'/shopdetail/'+currentId+'/giftsManage'" active-class="active">
                    <div>礼品管理</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <!--<span class="header-export">导出</span>-->
                <!--<span class="header-print">打印</span>-->
            </div>
            <div class="section-header-rgt">
                <!--<el-input placeholder="请输入内容"  class="input-with-select">-->
                <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                <!--</el-input>-->
                <el-button class="el-btn" @click="exchangeIntergralListModal">兑换记录</el-button>
                <el-button class="el-icon-plus el-btn" @click="createNewGift">新建礼品</el-button>
            </div>
        </div>
        <div class="section-content">
            <div class="content-lf">
                <div class="content-search">
                    <el-input placeholder="手机号或者卡号" class="input-with-select" v-model="searchKey">
                        <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
                    </el-input>
                </div>
                <div class="content-list">
                    <ul>
                        <li v-for="(item,idx) in memberList" :key="idx" @click="checkMemberDetail(item.memberId)">
                            <div class="content-list-lf">
                                <img :src="item.headPicture" alt="" v-if='item.headPicture'>
                                <img src="../../assets/images/icon-user.png" alt="" v-else>
                            </div>
                            <div class="content-list-rgt">
                                <div class="line1">
                                    <span>{{item.userName}}</span>
                                    <span class="line-color" v-if="item.memberState == '1'">正常</span>
                                    <span class="line-color" v-else>异常</span>
                                </div>
                                <div class="line2">
                                    <span>卡内余额：{{item.balance}}元</span>
                                    <span>{{item.mobile}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- <div class="content-calc">
                    匹配到<span>1</span>位会员
                </div> -->
            </div>
            <div class="content-rgt">
                <div class="content-rgt-header" v-if="memberId">
                    <div class="user-img">
                        <img src="../../assets/images/icon-user.png" alt="" v-if="memberDetail.headPicture">
                        <img src="../../assets/images/icon-user.png" alt="">
                    </div>
                    <div class="user-detail-msg">
                        <ul>
                            <li>
                                <p>{{memberDetail.userName}}</p>
                                <p>{{memberDetail.memberNo}}</p>
                            </li>
                            <li>
                                <p>会员等级：{{memberDetail.gradeName}}</p>
                                <p>会员欠款：<span>￥{{memberDetail.arrearsBalance}}</span></p>
                            </li>
                            <li>
                                <p>会员生日：{{memberDetail.birthday}}</p>
                                <p>累计消费：<span>￥{{memberDetail.allPayAmount}}</span></p>
                            </li>
                            <li>
                                <p>会员余额：<span>￥{{memberDetail.balance}}</span></p>
                                <p>目前积分：<span>￥{{memberDetail.integral}}</span></p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="content-rgt-content" v-if="memberId">
                    <router-view :memberId = 'memberId' :integral = 'memberDetail.integral' ></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {requestSearchMemberlist,requestGetMemberDetail} from '@/services/service';
    import { INTEGRAL_CHANGE } from '@/components/eventEmitter/eventName';
    import EventEmitter from '@/components/eventEmitter/eventEmitter';
    export default {
        data(){
            return{
                currentId: '',
                memberList: [],    // 会员列表
                searchKey: '',     // 会员搜索数据字段
                memberId: '',      // 会员id
                memberDetail: [],  // 会员详情
            }
        },
        mounted(){
            this.currentId = this.$route.params.id;
            this.initData();
            EventEmitter.$on('INTEGRAL_CHANGE',()=>{
                this.checkMemberDetail()
            })
        },
        methods: {
            initData(){
                let params = {
                    keyword: this.searchKey,
                    shopId: this.$route.params.id
                }
                if(!this.searchKey){
                    this.memberList = []
                    return
                }
                requestSearchMemberlist(params).then((res)=>{
                    if(res.data.code == '0000'){
                        this.memberList = res.data.data.list
                    }
                })
            },
            // 查看会员详情
            checkMemberDetail(memberId){
                let _this = this;
                this.memberId = memberId ? memberId : this.memberId;
                let params = {
                    shopId: this.$route.params.id,
                    memberId: memberId || this.memberId
                };
                requestGetMemberDetail(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.memberDetail = res.data.data
                    }
                })
            },
            // 新建礼品
            createNewGift(){
                this.$store.dispatch('openCreateGiftsModal')
            },
            // 兑换纪录
            exchangeIntergralListModal(){
                this.$store.dispatch('openExchangeIntegralModalStatus')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        .section-header{
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .section-header-lf{
                display: flex;
                a{
                    div{
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }
                    &.active{
                        div{
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
            .section-header-rgt{
                .el-btn{
                    @include buttonType1();
                }
            }
        }
        .section-content{
            margin-top: 10px;
            display: flex;
            flex: 1;
            .content-lf{
                width: 28%;
                background: #fff;
                padding: 20px 20px 0;
                .content-list{
                    min-height: calc(100vh - 200px);
                    ul{
                        li{
                            display: flex;
                            align-items: center;
                            background: #ddd;
                            padding: 3px 5px;
                            margin-top: 10px;
                            cursor: pointer;
                            &:hover{
                                opacity: .7;
                            }
                            .content-list-lf{
                                width: 50px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img{
                                    width: 40px;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    border: 1px solid #ddd;
                                }
                            }
                            .content-list-rgt{
                                width: 100%;
                                div{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    flex: 1;
                                    .line-color{
                                        color: $color;
                                    }
                                }
                            }
                        }
                    }
                }
                .content-calc{
                    margin: 10px 0;
                    font-size: 16px;
                    padding: 5px 10px;
                    background: #ddd;
                    span{
                        color: $color;
                    }
                }
            }
            .content-rgt{
                margin-left: 10px;
                width: 72%;
                .content-rgt-header{
                    height: 72px;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    .user-img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        overflow: hidden;
                        background: #ddd;
                        margin: 0 20px;
                        img{
                            width: 50px;
                        }
                    }
                    .user-detail-msg{
                        ul{
                            display: flex;
                            li{
                                margin-right: 30px;
                                font-size: 14px;
                                p{
                                    margin: 0;
                                    &:first-child{
                                        margin-bottom: 5px;
                                    }
                                    span{
                                        color: rgb(255,11,72);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
