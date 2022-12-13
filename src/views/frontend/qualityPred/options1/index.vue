<!--
 * @Author: zwj
 * @Date: 2022-11-26 11:12:41
 * @LastEditors: zwj
 * @LastEditTime: 2022-12-09 16:08:51
 * @Description: 
-->
<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
            <el-col :span="1.2" style="margin-right: 10px;">
                <el-tooltip content="最近熔指采样数据" placement="top">
                    <el-button type="primary">
                        质量指标
                    </el-button>
                </el-tooltip>
            </el-col>
            <el-col :span="1.2" style="margin-right: 10px;">
                <el-tooltip content="散点图表示分子量分布" placement="top">
                    <el-button type="primary">
                        微观结构
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <IPPVue v-if="devValue === 'Option1'"></IPPVue>
        <IIPPVue  v-if="devValue === 'Option2'"></IIPPVue>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IPPVue from './Ipp.vue';
import IIPPVue from './IIpp.vue';

const options = [
    {
        value: 'Option1',
        label: 'IPP质量预测',
    }, {
        value: 'Option2',
        label: 'IIPP质量预测',
    },
]
const devValue = ref('Option1')

onMounted(() => {
    monitorOptions2('get').then((res) => {
        
    })
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import { monitorOptions2 } from '/@/api/frontend/user';
export default defineComponent({
    name: 'qualityPred/options1',
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
    background-color: var(--ba-bg-color-overlay);
    border: 1px solid var(--ba-border-color);
    border-bottom: none;
    padding: 13px 15px;
    font-size: 14px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}
</style>
