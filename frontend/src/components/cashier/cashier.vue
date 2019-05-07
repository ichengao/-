<template>
    <div class="container">
        <headerSection />
        <div class='content-section'>
            <cashierDetail />
        </div>
        <createMemberCardModal />
        <discountModal />
        <updateProductPriceModal />
        <unprocessedOrderListModal />
        <deductionTimesModal />
        <memberManageModal />
        <selectMemberModal />
    </div>
</template>
<script>
    import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
    import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal'
    import cashierDetail from './cashierDetail';
    import discountModal from '@/components/modal/discountModal/discountModal';
    import updateProductPriceModal from '@/components/modal/updateProductPriceModal';
    import unprocessedOrderListModal from '@/components/modal/unprocessedOrderListModal';
    import deductionTimesModal from '@/components/modal/deductionTimesModal';
    import memberManageModal from '@/components/modal/memberManageModal';
    import selectMemberModal from '@/components/modal/selectMemberModal';
    export default {
        data(){
            return{

            }
        },
        components: {
            headerSection,
            createMemberCardModal,
            cashierDetail,
            discountModal,
            updateProductPriceModal,
            unprocessedOrderListModal,
            deductionTimesModal,
            memberManageModal,
            selectMemberModal
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
