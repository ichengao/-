<template>
    <div class="achievement-analysis-container">
        <div class="section-header">
            <el-button>导出</el-button>
            <div class="section-header-center">
                <el-radio-group v-model="pickerTime">
                    <el-radio-button label="今天"></el-radio-button>
                    <el-radio-button label="昨日"></el-radio-button>
                    <el-radio-button label="本周"></el-radio-button>
                    <el-radio-button label="本月"></el-radio-button>
                </el-radio-group>
                <span>选择日期: </span>
                <el-date-picker
                    v-model="pickDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="section-header-rgt">
                <el-input placeholder="请输入内容"  class="input-with-select" v-model="searchKey">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                pickerTime: '',
                pickDate: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .achievement-analysis-container{
        background: #fff;
        margin-top: 10px;
        .section-header{
            display: flex;
            justify-content: space-between;
            padding: 20px;
        }
        .section-header-center{
            span{
                margin: 0 0 0 20px;
            }
        }
    }
</style>
