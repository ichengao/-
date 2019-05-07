<template>
    <div class="shop-analisis-container">
        <div class="section-header">
            <div class="section-header-lf">
                <router-link :to="'/intelligentAnalysis/'+currentId+'/shopAnalysis/achievementAnalysis'" active-class="active">
                    <div>业绩汇总报表</div>
                </router-link>
                <router-link :to="'/intelligentAnalysis/'+currentId+'/shopAnalysis/memberAnalysis'" active-class="active">
                    <div>会员汇总报表</div>
                </router-link>
                <router-link :to="'/intelligentAnalysis/'+currentId+'/shopAnalysis/storeValueAnalysis'" active-class="active">
                    <div>储值汇总报表</div>
                </router-link>
                <router-link :to="'/intelligentAnalysis/'+currentId+'/shopAnalysis/timersAnalysis'" active-class="active">
                    <div>充次汇总报表</div>
                </router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentId: ''
            }
        },
        mounted() {
            this.currentId = this.$route.params.id
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container {
        .section-header {
            background: #fff;
            height: 60px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0 20px;
            .section-header-lf {
                display: flex;
                a {
                    div {
                        height: 57px;
                        line-height: 60px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-right: 20px;
                        border-bottom: 3px solid transparent;
                    }

                    &.active {
                        div {
                            border-bottom: 3px solid $color;
                        }
                    }
                }
            }
        }
    }
</style>

