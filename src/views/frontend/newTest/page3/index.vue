<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 14:41:56
 * @LastEditTime: 2022-12-12 19:57:52
 * @LastEditors: zwj
-->
<template>
    <div class="default-main">
        <el-row class="el-row">
            <el-col :span="2" style="margin-right: 35px;">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select class="gradeSelect" v-model="devValue" style="width:135px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in devOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>

            <el-col :span="2" style="margin-right: 10px;">
                <el-tooltip content="选取模拟仿真的牌号" placement="top">
                    <el-select class="gradeSelect" v-model="gradeValue" style="width:100px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>

            <el-col :span="1" style="margin-right: 10px;">
                <el-tooltip content="显示MWD仿真结果" placement="top">
                    <el-button type="primary" @click="() => {isShow = !isShow}">显示图表</el-button>
                </el-tooltip>
            </el-col>

            <el-col :span="1" style="margin-right: 10px;">
                <el-tooltip content="显示MWD仿真结果" placement="top">
                    <el-button type="primary" @click="() => {isShow = !isShow}">显示图表 测试</el-button>
                </el-tooltip>
            </el-col>

        </el-row>

        <IPPform v-if="devValue === 'Option1'" :isShow="isShow" :devValue="devValue" :grade="gradeValue"/>
        <IIPPform v-else :isShow="isShow" :devValue="devValue" :grade="gradeValue"/>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import IPPform from './IPPform.vue'
import IIPPform from './IIPPform.vue'

const devValue = ref('Option1')
const gradeValue = ref('M26ET')
const isShow = ref(false)
const devOptions = [
    {
        value: 'Option1',
        label: 'I套聚丙烯装置',
    },{
        value: 'Option2',
        label: 'II套聚丙烯装置',
    },
]
const gradeOptions = [
    {
        value: 'M26ET',
        label: 'M26ET',
    },{
        value: 'M30RH',
        label: 'M30RH',
    },{
        value: 'M60T',
        label: 'M60T',
    },{
        value: 'PPBM09',
        label: 'PPBM09',
    },{
        value: 'PPHY26',
        label: 'PPHY26',
    },
]
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'simulation',
})
</script>

<style scoped lang="scss">
.el-row {
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 100%;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-bottom: none;
    padding: 2px 2px;
    margin-top: 10px;
    font-size: 14px;
}

.el-col {
    border-radius: 4px;
}

.gradeSelect {
    width: 17%;
    margin: 10px 18px;
    user-select: none;

    .el-select {
        user-select: none;
        background-color: #ffffff;
        border: none;
    }

    :deep(.el-input__wrapper) {
        user-select: none;
        // background-color: #ffffff !important;
        border: 1px rgba(119, 155, 154, 0.341) solid;
        box-shadow: none;
    }

    :deep(.el-input__inner) {
        user-select: none;
        background-color: transparent !important;
        border: none;
        box-shadow: none;
        color: #000000;
    }
}
</style>
