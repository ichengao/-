<template>
    <div class="container">
        <headerSection />
        <div class='content-section'>
            <asideSection />
            <div class="content-section-right">
                <router-view></router-view>
            </div>
        </div>
        <createMemberCardModal />
        <editMemberCardModal />
        <createGiftModal />
        <exchangeIntegralModal />
    </div>
</template>
<script>
import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
import asideSection from '@/components/common/aside';
import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal'
import editMemberCardModal from '@/components/modal/editMemberModal/editMemberModal';
import createGiftModal from '@/components/modal/createGiftModal/createGiftModal';
import exchangeIntegralModal from '@/components/modal/exchangeIntegralModal/exchangeIntegralModal'
export default {
    components: {
        headerSection,
        asideSection,
        createMemberCardModal,
        editMemberCardModal,
        createGiftModal,
        exchangeIntegralModal
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
            .content-section-right{
                padding: 10px 20px 0 10px;
                margin-top: 55px;
                width: 100%;
            }
        }
    }
</style>
<style lang="scss">
    body{
        margin: 0;
        padding: 0;
    }
</style>
