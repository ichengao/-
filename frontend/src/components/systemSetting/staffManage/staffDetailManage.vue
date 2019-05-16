<template>
    <div class="staff-detail-container">
        <div class="section-header">
            <el-button class="header-button" @click="handleCreate">新增</el-button>
            <el-button class="header-button" @click="handleDelete">批量删除</el-button>
            <el-button class="header-button" @click="handEdit">编辑</el-button>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column prop="name" label="姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="age" label="年龄" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="roleName" label="岗位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="payment" label="薪酬" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shopName" label="店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="入职时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.createDate | timeStampTrans}}
                    </template>
                </el-table-column>
                <el-table-column label="薪资操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button class="btn-control">提成明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change='pageChange'
                    v-show="initDataArray"
                    :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestGetAllStaff,requestDeleteStaff } from '@/services/service';
    import { ADD_STAFF } from '@/components/eventEmitter/eventName';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                initDataArray: [],
                selectedIdsArr: [],     //  选中id列表
                selectedDetailArr: '',  //  选中详细信息
                totalCount: 0,
            }
        },
        mounted(){
            this.initData();
            EventBus.$on(ADD_STAFF,()=>{
                this.initData();
            });
        },
        methods: {
            initData(){
                let adminId = JSON.parse(sessionStorage.getItem('userMsg')).adminId;
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    adminId:adminId
                };
                requestGetAllStaff(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount;
                })
            },
            handleSelectionChange(params){
                let selectedIdsArr = [];
                this.selectedDetailArr = params;
                params.map(item=>{
                    selectedIdsArr.push(item.staffId);
                });
                this.selectedIdsArr = selectedIdsArr;
            },
            handleDelete(){
                if(!this.selectedIdsArr.length){
                    Message.error('至少选择一个');
                    return
                }
                console.log(this.selectedIdsArr)
                let params = {
                    shopId: this.$route.params.id,
                    staffIds: this.selectedIdsArr
                };
                requestDeleteStaff(params).then((res)=>{
                    if(res.data.code == '0000'){
                        Message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.initData()
                    }else{
                        Message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(function(){
                    Message({
                        message:'删除失败',
                        type: 'error'
                    });
                })
            },
            handEdit(){
                if(this.selectedIdsArr.length != 1){
                    Message.error('请选择一个');
                    return
                };
                this.$store.dispatch('openUpdateStaffModalStatus',this.selectedDetailArr[0])
            },
            handSearch(){
                let params = {
                    shopId: this.$route.params.id,
                    pageNum: 1,
                    keyword: this.keyword
                };
                requestGetAllStaff(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                    this.totalCount = res.data.data.totalCount
                })
            },
            // 分页
            pageChange(params1){
                let _this = this;
                let params = {
                    pageNum: params1,
                    keyword: this.keyword,
                    shopId: this.$route.params.id
                };
                requestGetWarehouseSupplierlist(params).then(function(res){
                    if(res.data.code == '0000'){
                        _this.initDataArray = res.data.data.list;
                        _this.totalCount = res.data.data.totalCount;
                    }
                });
            },
            handleCreate(){
                this.$store.dispatch('openCreateStaffModal')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .staff-detail-container{
        background: #fff;
        width: 100%;
        .section-header{
            padding: 10px;
            .header-button{
                @include buttonType1();
            }
        }
        .section-content{
            .btn-control{
                @include buttonSet($color);
                padding: 8px 10px;
            }
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
