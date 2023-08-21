<template>
    <div class="outer">
        <div class="box1">
            <el-button type="primary" size="large"  class="T21">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T23">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T24">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T25">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T26">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T27">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T29">{{ 0 }} degC</el-button>
            <el-button type="primary" size="large"  class="T30">{{ 0 }} degC</el-button>
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
        height: 82%;
        position: relative;
        background-image: url(/@/assets/product/新4201.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: 30%;

    }

    .T21{
        position: absolute;
        top: 6.1 * 5vw;
        left: 5.6 * 5vw;
        font-size: medium;
    }

    .T23{
        position: absolute;
        top: 5.0 * 5vw;
        left: 8.3 * 5vw;
        font-size: medium;
    }

    .T24{
        position: absolute;
        top: 5.1 * 5vw;
        left: 13.6 * 5vw;
        font-size: medium;
    }

    .T25{
        position: absolute;
        top: 3.1 * 5vw;
        left: 12.1 * 5vw;
        font-size: medium;
    }

    .T26{
        position: absolute;
        top: 6.0 * 5vw;
        left: 10.6 * 5vw;
        font-size: medium;
    }

    .T27{
        position: absolute;
        top: 2.85 * 5vw;
        left: 15.1 * 5vw;
        font-size: medium;
    }

    .T29{
        position: absolute;
        top: 3.6 * 5vw;
        left: 6.9 * 5vw;
        font-size: medium;
    }

    .T30{
        position: absolute;
        top: 1.9 * 5vw;
        left: 10.7 * 5vw;
        font-size: medium;
    }
}
</style>