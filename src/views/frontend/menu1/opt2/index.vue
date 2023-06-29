<template>
    <div class="outer">
        <div class="box1">
            <div class="table1"> <span>R4101环管反应器工艺参数</span></div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect, CSSProperties } from 'vue'






// 表格样式



</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'menu1/opt1',
})
</script>

<style scoped lang="scss">
.outer {

    background-color: white;
    padding-top: 10px;
    padding-left: 20px;

    width: 100vw;
    height: 100vh;

    .box1 {
        position: relative;

        width: 100%;
        height: 100%;
        // height: 1200px;
        background-image: url(/@/assets/product/HDPE527.png);

        background-repeat: no-repeat;
        // 适应屏幕大小
        background-size: 80% auto; //自己掌握缩放比例

        display: flex;

        // .table {
        //     position: absolute;
        //     display: flex;
        //     width: 100%;
        //     top: 6.7*5vw
        // }

        .table1 {

            height: 10vw;
            width:15vw;
            // padding-top: 12%;
            background: linear-gradient(to left, #1b65f0, #1b65f0) left top no-repeat,
                linear-gradient(to bottom, #1b65f0, #1b65f0) left top no-repeat,
                linear-gradient(to left, #1b65f0, #1b65f0) right top no-repeat,
                linear-gradient(to bottom, #1b65f0, #1b65f0) right top no-repeat,
                linear-gradient(to left, #1b65f0, #1b65f0) left bottom no-repeat,
                linear-gradient(to bottom, #1b65f0, #1b65f0) left bottom no-repeat,
                linear-gradient(to left, #1b65f0, #1b65f0) right bottom no-repeat,
                linear-gradient(to left, #1b65f0, #1b65f0) right bottom no-repeat;
            background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
            border: 2px solid #95beff;
            position: absolute;
            top: 6.7*5vw;
            left: 1vw;
            background-color: rgb(211, 229, 247);
            // background-image: url(/@/assets/table.jpg);
            // background-size: auto 60%;
        }

        .table1 span {
            display: inline-block;
            text-align: center;
            width: 70%;
            background: #3059ab;
            font-size: 0.75vw;
            font-weight: bold;
            position: absolute;
            top: 0;
            left: 15%;
            padding: 4px 0px;
            color: #ffffff;
            border-radius: 0 0 10px 10px;

        }
    }
}
</style>