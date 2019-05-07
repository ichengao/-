<template>
    <div class="progress-container">
        <div class="progress-num" :style="{'width':progress+'%'}"></div>
    </div>
</template>
<script>
    export default {
        props: ['progress']
    }
</script>
<style lang="scss" scoped>
    .progress-container{
        height: 10px;
        background: rgb(240,242,245);
        .progress-num{
            background: rgb(151,95,228);
            height: 100%;
        }
    }
</style>
