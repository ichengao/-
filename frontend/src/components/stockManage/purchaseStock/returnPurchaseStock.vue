<template>
    <div class="return-pruchase-stock">
        <div class="section1">
            <div class="section-header">
                <span>输入进货单号/产品编号/产品名称：</span>
                <el-input v-model="searchKey" class="search-input" ></el-input>
                <el-button class="btn-search">查询</el-button>
                <el-button class="btn-search">快捷查询</el-button>
            </div>
        </div>
        <div class="section2">
            <p>进货主单</p>
            <ul>
                <li>
                    <span>单号</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
                <li>
                    <span>供应商</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
                <li>
                    <span>数量</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
                <li>
                    <span>金额</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
                <li>
                    <span>时&emsp;间</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
                <li>
                    <span>备注</span>
                    <el-input readonly class="order-detail"></el-input>
                </li>
            </ul>
        </div>
        <div class="section3">
            <div class="section3-lf">
                <p>进货明细</p>
                <el-table ref="multipleTable" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                          >
                    <el-table-column type="selection" width="25"> </el-table-column>
                    <el-table-column prop="bizId" label="批次号" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="supplierName" label="产品编号" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="count" label="进货价格" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="userName" label="入库状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="section3-rgt">
                <p>退货列表</p>
                <el-table ref="multipleTable1" :data="initDataArray" tooltip-effect="dark" style="width: 100%"
                >
                    <el-table-column type="selection" width="25"> </el-table-column>
                    <!--<el-table-column prop="gradeName" label="序号" show-overflow-tooltip >-->
                    <!--</el-table-column>-->
                    <el-table-column label="单价" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ (scope.row.totalAmount / scope.row.count).toFixed(2) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalAmount" label="合计金额" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="realAmount" label="实付金额" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="userName" label="入库状态" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.state == 0 ? '未入库' : '已入库' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">详情</el-button>
                            <br>
                            <el-button
                                size="mini"
                                type="danger"
                                class="btn-control"
                                @click="handleCopyAdd(scope.row)">复制新增</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                searchKey: '',
                initDataArray: [],
                form: {

                }
            }
        },
        methods: {
            handleSelectionChange(){}
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .return-pruchase-stock{
        background: #fff;
        .section1{
            .section-header{
                background: #fff;
                height: 60px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 20px;
                margin-top: 10px;
                .search-input{
                    width: 200px;
                    margin-right: 10px;
                }
                .btn-search{
                    @include buttonSet($color);
                }
            }
            border-bottom: 1px solid #ddd;
        }
        .section2{
            p{
                border-bottom: 1px solid #ddd;
                margin: 0;
                padding: 10px 0 10px 10px;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
                li{
                    width: calc(100%/3);
                    text-align: center;
                    margin-top: 10px;
                    .order-detail{
                        width: 200px;
                    }
                }
            }
        }
        .section3{
            display: flex;
            .section3-lf{
                width: 50%;
                padding-right: 10px;
                p{
                    padding: 10px 10px 0 10px;
                }
            }
            .section3-rgt{
                width: 50%;
                padding-left: 10px;
                p{
                    padding: 10px 10px 0 10px;
                }
            }
        }
    }
</style>
