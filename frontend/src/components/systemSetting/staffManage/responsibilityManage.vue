<template>
    <div class="responsibillity-container">
        <div class="section-header" v-show="currentMode">
            <el-button class="header-button" @click="handleAdd">添加岗位</el-button>
            <el-button class="header-button">批量删除</el-button>
        </div>
        <div class="section-content" v-show="currentMode">
            <el-table ref="multipleTable" :data="initData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection"> </el-table-column>
                <el-table-column prop="gradeName" label="岗位名称" show-overflow-tooltip >
                </el-table-column>
                <el-table-column prop="mobile" label="设置权限" show-overflow-tooltip>
                    <template solt-scope="scope">
                        <el-button class="el-icon-plus btn-add-permission" @click="handleUpdatePermission"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark" show-overflow-tooltip>
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
    export default {
        data(){
            return{
                initData: [{
                    gradeName: 'test',
                    remark: '1'
                }],
                currentMode: true,          // 页面模式
                checkList: [],              // 选择的列表
            }
        },
        components: {
            addResponsibilityManage
        },
        mounted(){
            EventBus.$on(ADD_RESPONSIBILITY_MANAGE,(res)=>{
                this.checkList = res;
                this.currentMode = false;
            })
        },
        methods: {
            handleEdit(){

            },
            handleAdd(){
                this.$store.dispatch('openAddResponsibilityManage')
            },
            handleSelectionChange(){},
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
