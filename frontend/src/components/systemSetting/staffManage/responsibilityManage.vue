<template>
    <div class="responsibillity-container">
        <div class="section-header" v-show="currentMode">
            <el-button class="header-button" @click="handleAdd">添加岗位</el-button>
            <el-button class="header-button" @click="handleDelete">批量删除</el-button>
        </div>
        <div class="section-content" v-show="currentMode">
            <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                >
                <el-table-column prop="roleName" label="岗位名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column label="设置权限" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button class="el-icon-plus btn-add-permission" @click="handleUpdatePermission"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button @click="handleDelete(scope.row.roleId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <addResponsibilityManage v-show="!currentMode" :data="checkList" />
    </div>
</template>
<script>
    import addResponsibilityManage from './child/addResponsibilityManage';
    import EventBus from '@/components/eventEmitter/eventEmitter';
    import { ADD_RESPONSIBILITY_MANAGE } from '@/components/eventEmitter/eventName';
    import { requestGetRoleList,requestDeleteRole } from '@/services/service';
    import { Message } from 'element-ui';
    export default {
        data(){
            return{
                initDataArray: [{
                    gradeName: 'test',
                    remark: '1'
                }],
                checkList: [],          // 选中的类型
                currentMode: true,      // 页面模式
            }
        },
        components: {
            addResponsibilityManage
        },
        mounted(){
            EventBus.$on(ADD_RESPONSIBILITY_MANAGE,(res)=>{
                this.checkList = res;
                this.currentMode = false;
            });
            this.initData();
        },
        methods: {
            initData(){
                let params = {
                    shopId: this.$route.params.id
                };
                requestGetRoleList(params).then((res)=>{
                    this.initDataArray = res.data.data.list;
                })
            },
            handleDelete(params1){
                let params = {
                    shopId: this.$route.params.id,
                    roleId: params1
                };
                requestDeleteRole(params).then((res)=>{
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
            handleAdd(){
                this.$store.dispatch('openAddResponsibilityManage')
            },
            handleUpdatePermission(params){
                this.$store.dispatch('openUpdatePermissionModal','123');
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common.scss";
    .responsibillity-container{
        background: #fff;
        width: 100%;
        .section-header{
            padding: 10px;
            .header-button{
                @include buttonType1();
            }
        }
        .section-content{
            .btn-add-permission{
                @include buttonSet($color);
            }
        }
    }
</style>
