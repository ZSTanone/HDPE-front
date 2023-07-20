<template>
    <div class="outer">
        <div class="box1"></div>

    </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'realtimeMonitor/flash',
})
</script>

<style scoped lang="scss">
.outer {

    width: 100vw;
    height: 100vh;
    background-color: rgb(230, 255, 255);

    padding-top: 1vw;

    .box1 {
        width: 100%;
        height: 60%;

        background-image: url(/@/assets/product/flash.jpg);
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: 40%;

    }
}
</style>