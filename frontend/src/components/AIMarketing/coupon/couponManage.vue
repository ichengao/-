<template>
    <div class="coupon-manage-container">
        <div class="section-header">
            <div class="section-header-lf">
                <el-button class="btn-new el-icon-plus" @click="handleAdd">新建优惠卷</el-button>
                <el-button class="btn-new el-icon-s-promotion" @click="handleIssueCoupons">发放优惠卷</el-button>
            </div>
            <div class="section-header-rgt">
                <el-select v-model="checkState" placeholder="请选择"
                @change="handleSearch">
                    <el-option
                        v-for="item in searchTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column prop="couponName" label="优惠卷名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column label="优惠卷类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.couponType == '1' ? '代金券' : '折扣券' }}
                    </template>
                </el-table-column>
                <el-table-column prop="faceAmount" label="面值" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="useCondition" label="使用条件" show-overflow-tooltip>
                    <template slot-scope="scope">
                        单人单日限用{{JSON.parse(scope.row.useCondition).use}}张,
                        单人单日限领{{JSON.parse(scope.row.useCondition).get}}张[0表示不限制],
                        最低消费{{JSON.parse(scope.row.useCondition).amount}}元[达到可用]
                    </template>
                </el-table-column>
                <el-table-column label="是否可以叠加" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.overlay == '1' ? '可叠加' : '不可叠加' }}
                    </template>
                </el-table-column>
                <el-table-column label="有效期类型" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.effectiveType == '1' ? '日期' : '天数' }}
                    </template>
                </el-table-column>
                <el-table-column label="有效期范围" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.start | timeStampTrans}}
                        {{ scope.row.end | timeStampTrans}}
                    </template>
                </el-table-column>
                <el-table-column prop="allCount" label="总数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="remainCount" label="剩余数量" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{ scope.row.state == '1' ? '已发放' : '未发放'}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">修改</el-button>
                        <br>
                        <el-button
                            class="btn-control"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.couponId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initDataArray.length"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetCoupon,requestDelCoupon } from '@/services/service';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { UPDATE_COUMANAGE_LIST } from '@/components/eventEmitter/eventName';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                checkState: '',
                searchTypeOptions: [
                    {
                        label: '全部',
                        value: '',
                    },
                    {
                        label: '待核销',
                        value: '0',
                    },
                    {
                        label: '已核销',
                        value: '1',
                    }
                ],
                initDataArray: [],
                totalCount: 0,
                currentSelectData: []
            }
        },
        created(){
            this.initData();
        },
        mounted(){
            EventBus.$on(UPDATE_COUMANAGE_LIST,()=>{
                this.initData()
            });
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetCoupon(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleAdd(){
                this.$store.dispatch('openAddCouponModal');
            },
            handleDelete(id){
                let params = {
                    couponIds: [id],
                    shopId: this.$route.params.id
                };
                requestDelCoupon(params).then(res=>{
                    if(res.data.code == '0000'){
                        Message.success('删除成功');
                        this.initData();
                    }else{
                        Message.error('删除失败')
                    }
                })
            },
            handleEdit(item){
                this.$store.dispatch('openEditCouponModal',item);
            },
            handleSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    checkState: this.checkState
                };
                requestGetCoupon(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            pageChange(page){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: page,
                    checkState: this.checkState
                };
                requestGetCoupon(params).then(res=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleSelectionChange(params){
                this.currentSelectData = params;
            },
            handleIssueCoupons(){
                if(this.currentSelectData.length == 0){
                    Message.error('请选择要发放的优惠券');
                    return
                }
                if(this.currentSelectData.length > 1){
                    Message.error('优惠券只可选择一种');
                    return
                }
                this.$store.dispatch('openIssueCouponsModal',this.currentSelectData[0]);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .coupon-manage-container{
        margin-top: 10px;
        .section-header{
            background: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            padding-right: 20px;
            .section-header-lf{
                font-size: 18px;
                .btn-new{
                    @include buttonType1;
                    margin-left: 20px;
                    padding: 8px 10px;
                    &:before{
                        margin-right: 15px;
                    }
                }
            }
        }
        .section-content{
            margin-top: 10px;
            padding: 10px;
            background: #fff;
            .btn-control{
                margin-top: 5px;
            }
            .pagenation{
                text-align: right;
                padding: 10px;
            }
        }
    }
</style>
