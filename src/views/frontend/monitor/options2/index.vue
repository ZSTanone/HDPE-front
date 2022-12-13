<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 14:41:56
 * @LastEditTime: 2022-12-09 15:09:56
 * @LastEditors: zwj
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
                <el-tooltip content="显示进料或出料表格" placement="top">
                    <el-checkbox-group v-model="checkIOGroup">
                        <el-checkbox-button v-for="item in checkIOList" :key="item" :label="item">
                            {{ item }}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-tooltip>
            </el-col>

            <el-col :span="1.8" style="margin-right: 10px;">
                <el-tooltip content="当前产品牌号" placement="top">
                    <el-button type="info" style="font-size: 17px">
                        M26ET
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <IPPformVue v-if="devValue === 'Option1'"></IPPformVue>
        <IIPPformVue v-if="devValue === 'Option2'"></IIPPformVue>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IPPformVue from './IPPform.vue'
import IIPPformVue from './IIPPform.vue';

const options = [
    {
        value: 'Option1',
        label: 'IPP关键参数',
    }, {
        value: 'Option2',
        label: 'IIPP关键参数',
    },
]
const devValue = ref('Option1')
const checkIOGroup = ref(['进料'])
const checkIOList = ['进料', '出料']

onMounted(() => {
    monitorOptions2('get').then((res) => {
        
    })
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import { monitorOptions2 } from '/@/api/frontend/user';
export default defineComponent({
    name: 'monitor/options2',
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
