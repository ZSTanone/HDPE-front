<template>
    <div class="outer">
        <div class="box1">
            <el-button type="primary" size="large"  class="T21">{{ 65.5 }} degC</el-button>
            <el-button type="primary" size="large"  class="T23">{{ 70.1 }} degC</el-button>
            <el-button type="primary" size="large"  class="T24">{{ 69.4 }} degC</el-button>
            <el-button type="primary" size="large"  class="T25">{{ 69.4 }} degC</el-button>
            <el-button type="primary" size="large"  class="T26">{{ 65.6 }} degC</el-button>
            <el-button type="primary" size="large"  class="T27">{{ 64.1 }} degC</el-button>
            <el-button type="primary" size="large"  class="T29">{{ 70.4 }} degC</el-button>
            <el-button type="primary" size="large"  class="T30">{{ 65.3 }} degC</el-button>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.outer {

    width: 100vw;
    height: 100vh;

    padding-top: 1vw;

    .box1 {
        width: 100%;
        height: 80%;
        position: relative;

        background-image: url(/@/assets/product/新4101.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: 30%;

    }

    .T21{
        position: absolute;
        top: 6.1 * 5vw;
        left: 5.5 * 5vw;
        font-size: medium;
    }

    .T23{
        position: absolute;
        top: 5.1 * 5vw;
        left: 8.1 * 5vw;
        font-size: medium;
    }

    .T24{
        position: absolute;
        top: 5.15 * 5vw;
        left: 13.4 * 5vw;
        font-size: medium;
    }

    .T25{
        position: absolute;
        top: 3.2 * 5vw;
        left: 12 * 5vw;
        font-size: medium;
    }

    .T26{
        position: absolute;
        top: 6.1 * 5vw;
        left: 10.5 * 5vw;
        font-size: medium;
    }

    .T27{
        position: absolute;
        top: 3.25 * 5vw;
        left: 14.9 * 5vw;
        font-size: medium;
    }

    .T29{
        position: absolute;
        top: 3.75 * 5vw;
        left: 6.8 * 5vw;
        font-size: medium;
    }

    .T30{
        position: absolute;
        top: 2.1 * 5vw;
        left: 10.6 * 5vw;
        font-size: medium;
    }
}
</style>