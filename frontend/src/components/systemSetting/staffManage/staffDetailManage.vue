<template>
    <div class="staff-detail-container">
        <div class="section-header">
            <el-button class="header-button" @click="handleCreate">新增</el-button>
            <el-button class="header-button">批量删除</el-button>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column prop="gradeName" label="姓名" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="年龄" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="岗位" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="薪酬" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="店铺" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="入职时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="添加时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="mobile" label="薪资操作" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change='pageChange'
                v-show="initDataArray"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { requestGetAllStaff } from '@/services/service'
    export default {
        data(){
            return{
                initDataArray: [],
                selectedIdsArr: [],     //  选中id列表
                selectedDetailArr: '',  //  选中详细信息
                keyword: '',
                totalCount: 0,
            }
        },
        mounted(){
            this.initData();
            // EventBus.$on(CREATE_SUPPLIER_VENDOR,()=>{
            //     this.initData();
            // });
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
                    selectedIdsArr.push(item.supplierId);
                });
                this.selectedIdsArr = selectedIdsArr;
            },
            handleDelete(){
                if(!this.selectedIdsArr.length){
                    Message.error('至少选择一个');
                    return
                }
                let params = {
                    shopId: this.$route.params.id,
                    supplierIds: this.selectedIdsArr
                };
                requestGetAllStaff(params).then((res)=>{
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
                this.$store.dispatch('openEditSupplierVendorModal',this.selectedDetailArr[0])
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
            .pagenation{
                text-align: right;
                margin-bottom: 20px;
                background: #fff;
                padding: 20px 20px 20px 0;
            }
        }
    }
</style>
