<template>
    <div class="default-main">
        <el-row>

            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tag class="ml-2" size="large"  effect="dark">选择反应器</el-tag>
            </el-col>

            <el-col :span="2.9" style="margin-right: 50px;">
                <el-tooltip content="选取聚乙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
        </el-row>

        <R1  v-if="devValue === 'Option1'" ></R1>
        <R2  v-if="devValue === 'Option2'" ></R2>

    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'
import R1 from './R1.vue'
import R2 from './R2.vue'

const options = [
    {
        value: 'Option1',
        label: 'R4101反应器',
    },
    {
        value: 'Option2',
        label: 'R4201反应器',
    },
]

const devValue = ref('Option1')

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'realtimeMonitor/reactor',
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