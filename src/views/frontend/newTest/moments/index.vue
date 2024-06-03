<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-left: 10px;">
                <el-tag class="ml-2" type="success" size="large">机理模型仿真</el-tag>
            </el-col>

            <el-col :span="1.8" style="margin-right: 10px;margin-left: 50px;">
                <el-tooltip :content="radio" placement="top">
                    <el-radio-group v-model="radio">
                        <el-radio-button label="模型输入" />
                        <el-radio-button label="仿真结果" />
                    </el-radio-group>
                </el-tooltip>
            </el-col>

        </el-row>

        <div v-show="radio === '模型输入'">
            <tableIn></tableIn>
        </div>

        <div v-show="radio === '仿真结果'">
            <NewSim></NewSim>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import NewSim from './newSimFig.vue'
import tableIn from './table.vue'


const radio = ref('模型输入')


onMounted(() => {
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'moments',
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
