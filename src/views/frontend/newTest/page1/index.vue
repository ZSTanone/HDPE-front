<template>
    <div class="wrapper">
        <el-select v-model="value" class="m-2" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <page1 v-if="value == 'Option1'"></page1>
        <page2 v-if="value == 'Option2'"></page2>
        <page3 v-if="value == 'Option3'"></page3>
        <page4 v-if="value == 'Option4'"></page4>
        <page5 v-if="value == 'Option5'"></page5>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect } from 'vue'
import page1 from './Info1.vue'
import page2 from './Info2.vue'
import page3 from './info3.vue'
import page4 from './Info4.vue'
import page5 from './Info5.vue'

const value = ref('Option5')

const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'newTest/page1',
})
</script>

<style scoped lang="scss">
.wrapper {
    position: relative;
    width: 1800px;
    height: 1000px;

    .btn1 {
        position: absolute;

        left: 15.5 * 9.5px;
        top: 17 * 9.5px;
        font-size: medium;
        margin-left: 10px;
    }

    .btn2 {
        position: absolute;

        left: 15.5 * 9.5px;
        top: 22.5 * 9.5px;
        font-size: medium;
    }

    .btn3 {
        position: absolute;
        left: 15.5 * 9.5px;
        top: 28 * 9.5px;
        font-size: medium;
    }

    .btn4 {
        position: absolute;
        left: 15.5 * 9.5px;
        top: 33 * 9.5px;
        font-size: medium;
    }
}
</style>

<style scoped>
/* 设置el-dialog的背景颜色 */
.wrapper :deep(.el-dialog) {
    background-color: #e2e9ff;
}

:deep(.el-dialog__title) {
    /* background-color: #f0f0f0; */
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #000000;
    padding: 10px;
}
</style>
