<template>
    <div class="container store-control-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/stockManage/'+currentId+'/supplierVendor'" active-class="active">
                    <div>供应商管理</div>
                </router-link>
                <router-link :to="'/stockManage/'+currentId+'/storeControl'" active-class="active">
                    <div>仓库管理</div>
                </router-link>
            </div>
            <div class="section-header-center">
                <el-button class="header-button" @click="openCreateStoreControlModal">新增仓库</el-button>
                <ul>
                    <li @click="handEdit">修改</li>
                    <li @click="handleDelete">删除</li>
                </ul>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-model="keyword">
                    <el-button slot="append" icon="el-icon-search" @click="handSearch"></el-button>
                </el-input>
            </div>
        </div>
        <div class="section-content">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"> </el-table-column>
                <el-table-column prop="name" label="仓库名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="warehouseId" label="仓库编码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="admin" label="联系人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="tel" label="联系电话" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="仓库地址" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createDate" label="添加时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="仓库状态" show-overflow-tooltip prop="state">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.state"
                            active-color="#13ce66"
                            active-value="1"
                            inactive-value="0"
                            :name="scope.row.state"
                            @change="storeStatusChange(scope.row)"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column
                label="操作"
                show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看库存</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { requestGetWarehouselist,requestDelwarehouse,requestUpdatewarehouse } from '@/services/service';
import { Message } from 'element-ui';
import EventBus from '@/components/eventEmitter/eventEmitter';
import { CREATE_STORE_CONTROL } from '@/components/eventEmitter/eventName';
export default {
    data(){
        return{
            currentId: '',
            initDataArray: [],
            selectedDetailArr: [],
            selectedIdsArr: [],
            keyword: ''
        }
    },
    mounted(){
        this.currentId = this.$route.params.id;
        this.initData();
        EventBus.$on(CREATE_STORE_CONTROL,()=>{
            this.initData();
        });
    },
    methods: {
        initData(){
            let params = {
                shopId: this.$route.params.id,
                pageNum: 1
            };
            requestGetWarehouselist(params).then((res)=>{
                this.initDataArray = res.data.data.list;
                this.totalCount = res.data.data.totalCount;
            })
        },
        handleSelectionChange(params){
            let selectedIdsArr = [];
            this.selectedDetailArr = params;
            params.map(item=>{
                selectedIdsArr.push(item.warehouseId);
            });
            this.selectedIdsArr = selectedIdsArr;
        },
        openCreateStoreControlModal(){
            this.$store.dispatch('openCreateStoreControlModal');
        },
        handleDelete(){
            if(!this.selectedIdsArr.length){
                Message.error('至少选择一个');
                return
            }
            console.log(this.selectedIdsArr);
            let params = {
                shopId: this.$route.params.id,
                warehouseIds: this.selectedIdsArr
            };
            requestDelwarehouse(params).then((res)=>{
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
            this.$store.dispatch('openEditStoreControlModal',this.selectedDetailArr[0])
        },
        handSearch(){
            let params = {
                shopId: this.$route.params.id,
                pageNum: 1,
                keyword: this.keyword
            };
            requestGetWarehouselist(params).then((res)=>{
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
            requestGetWarehouselist(params).then(function(res){
                if(res.data.code == '0000'){
                    _this.initDataArray = res.data.data.list;
                    _this.totalCount = res.data.data.totalCount;
                }
            });
        },
        // 仓库状态修改
        storeStatusChange(params1){
            let params = {
                shopId: this.$route.params.id,
                warehouseId: params1.warehouseId,
                state: params1.state
            };
            requestUpdatewarehouse(params).then((res)=>{
                if(res.data.code == '0000'){
                    Message({
                        message: '更新成功',
                        type: 'success'
                    });
                }
            })
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
            .section-header-center{
                display: flex;
                align-items: center;
                .header-button{
                    @include buttonType1();
                }
                ul{
                    display: flex;
                    margin-left: 20px;
                    li{
                        padding-left: 40px;
                        margin-right: 20px;
                        cursor: pointer;
                        font-size: 16px;
                        &:hover{
                            opacity: .6;
                        }
                        &:first-child{
                            background: url('../../assets/images/icon_edit.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                        &:nth-child(2){
                            background: url('../../assets/images/icon_import.png') 10px center no-repeat;
                            background-size: 18px; 
                        }
                    }
                }
            }
        }
        .section-content{
            margin-top: 10px;
        }
    }
</style>
<style lang="scss">
