<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tag class="ml-2" type="success" size="large">选择反应器</el-tag>
            </el-col>

            <el-col :span="2.9" style="margin-right: 50px;">
                <el-tooltip content="选取反应器装置" placement="top">
                    <el-select v-model="devValue" style="width:217px" placeholder="R4101反应器">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
          
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tag class="ml-2" type="success" size="large">查看质量指标</el-tag>
            </el-col>


            <el-col :span="1.8" style="margin-right: 10px;margin-left: 0px;">
                <el-tooltip content="查询产品的质量指标" placement="top">
                    <el-radio-group v-model="radio">
                        <el-radio-button label="宏观质量指标" />
                        <el-radio-button label="微观质量指标" />
                    </el-radio-group>
                </el-tooltip>
            </el-col>

        </el-row>

        <R4101 :indicator="radio" v-if="devValue === 'Option1'"></R4101>
        <R4201 :indicator="radio"  v-if="devValue === 'Option2'"></R4201>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { productPred } from '/@/api/frontend/user';
import R4101 from './R4101.vue';
import R4201 from './R4201.vue';

const radio = ref('宏观质量指标')

const options = [
    {
        value: 'Option1',
        label: 'R4101反应器',
    }, {
        value: 'Option2',
        label: 'R4201反应器',
    },
]
const devValue = ref('Option1')
const indicator = ref('micro')



onMounted(() => {
    productPred('get').then((res)=>{
        console.log('产品质量预测',res);
    })
})
</script>

<script setup lang="ts">

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'productPred',
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