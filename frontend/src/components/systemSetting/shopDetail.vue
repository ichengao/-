<template>
    <div class="container shop-detail-container">
        <div class="section-header">
            <div class="section-header-logo">
                <img src="../../assets/images/icon_logo_white.png" alt="">
                <p>安徽雪儿教育</p>
            </div>
            <ul class="section-header-list">
                <li>123123</li>
                <li>18267535353</li>
                <li>373737373@qq.com</li>
                <li>永久</li>
            </ul>
        </div>
        <div class="section-content">
            <ul>
                <li><span>店铺信息</span><span class="btn-change">【修改】</span></li>
                <li><span>店铺名称</span><span>安徽学士教育</span></li>
                <li><span>店主姓名</span><span>蒋先生</span></li>
                <li><span>微信账号</span><span>12123</span></li>
                <li><span>行业类型</span><span>通用行业</span></li>
                <li><span>店铺简称</span><span>安徽学士教育</span></li>
                <li><span>店铺电话</span><span>12312321</span></li>
                <li><span>注册时间</span><span>2018-10-10</span></li>
                <li><span>店铺地址</span><span>安徽省寿县板桥</span></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .container{
        .section-header{
            margin-top: 10px;
            padding: 20px;
            background: url("../../assets/images/myshopbg.png") center center no-repeat;
            background-size: cover;
            .section-header-logo{
                text-align: center;
                img{
                    width: 50px;
                    height: auto;
                }
                p{
                    color: #fff;
                    margin-top: 5px;
                }
            }
            .section-header-list{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 30px;
                padding: 0 30px;
                li{
                    padding-left: 40px;
                    color: #fff;
                    height: 30px;
                    line-height: 30px;
                    &:first-child{
                        background: url("../../assets/images/systeminfobg.png") 0 0 no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(2){
                        background: url("../../assets/images/systeminfobg.png") 0 -30px no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(3){
                        background: url("../../assets/images/systeminfobg.png") 0 -60px no-repeat;
                        background-size: 30px;
                    }
                    &:nth-child(4){
                        background: url("../../assets/images/systeminfobg.png") 0 -90px no-repeat;
                        background-size: 30px;
                    }
                }
            }
        }
        .section-content{
            background: #fff;
            margin-top: 10px;
            ul{
                padding: 30px 0;
                li{
                    padding-left: 50px;
                    height: 60px;
                    line-height: 60px;
                    border-bottom: 1px dashed #ddd;
                    span{
                        margin-right: 40px;
                        &.btn-change{
                            color: rgb(45,172,191);
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
