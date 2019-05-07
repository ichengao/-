<template>
    <div class="container">
        <headerSection />
        <div class='content-section'>
            <asideSection />
            <div class="content-main">
                <chartOne />
                <chartTwo />
                <chartThree />
            </div>
        </div>
        <createMemberCardModal />
    </div>
</template>
<script>
    import headerSection from '@/components/header/headerShopDetail/headerShopDetail';
    import asideSection from '@/components/common/aside';
    import createMemberCardModal from '@/components/modal/createMemberCardModal/createMemberCardModal'
    import chartOne from '@/components/shopOverview/child/chartOne';
    import chartTwo from '@/components/shopOverview/child/chartTwo';
    import chartThree from '@/components/shopOverview/child/chartThree';
    export default {
        components: {
            headerSection,
            asideSection,
            createMemberCardModal,
            chartOne,
            chartTwo,
            chartThree
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
            .content-main{
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

