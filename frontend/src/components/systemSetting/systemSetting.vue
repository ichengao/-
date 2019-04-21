<template>
    <div class="container">
        <headerSection />
        <div class='content-section'>
            <asideSection />
            <div class="content-section-right">
                <div class="content-nav">
                    <router-link :to="'/systemSetting/'+currentId+'/systemShopDetail'" active-class="active">
                        <div>店铺资料</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/staffManage'" active-class="active">
                        <div>员工管理</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/memberSetting'" active-class="active">
                        <div>会员配置</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/productSetting'" active-class="active">
                        <div>商品配置</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/sellSetting'" active-class="active">
                        <div>销售配置</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/paySetting'" active-class="active">
                        <div>支付设置</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/printSetting'" active-class="active">
                        <div>打印设置</div>
                    </router-link>
                    <router-link :to="'/systemSetting/'+currentId+'/hardwareSetting'" active-class="active">
                        <div>硬件设置</div>
                    </router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
        <createMemberCardModal />
        <updateShopModal />
    </div>
</template>
<script>
    import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
    import asideSection from '@/components/common/aside';
    import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal'
    import updateShopModal from '@/components/modal/updateShopModal/updateShopModal';

    export default {
        data(){
            return{
                currentId: ''
            }
        },
        components: {
            headerSection,
            asideSection,
            createMemberCardModal,
            updateShopModal
        },
        mounted(){
            this.currentId = this.$route.params.id;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/assets/scss/common.scss';
    .container{
        background: #eee;
        min-height: 100vh;
        .content-section{
            display: flex;
            .content-nav{
                background: #fff;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
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
            .content-section-right{
                padding: 10px 20px 0 10px;
                margin-top: 55px;
                width: 100%;
            }
        }
    }
</style>
<style lang="scss">
