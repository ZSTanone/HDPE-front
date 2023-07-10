<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-left: 10px;">
                <el-tag class="ml-2" type="success" size="large">仿真设置</el-tag>
            </el-col>

            <el-col :span="1.8" style="margin-right: 10px;margin-left: 50px;">
                <el-tooltip :content="radio" placement="top">
                    <el-radio-group v-model="radio">
                        <el-radio-button label="工艺参数设定" />
                        <el-radio-button label="仿真模拟结果" />
                    </el-radio-group>
                </el-tooltip>
            </el-col>

        </el-row>

        <div v-show="radio === '工艺参数设定'">
            <tableIn></tableIn>
        </div>

        <div v-show="radio === '仿真模拟结果'">
            <NewSim></NewSim>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watch } from 'vue'
import IIPPformVue from './IIPPform.vue';
import InputForm from './InputForm.vue';
import NewSim from './newSimFig.vue'
import tableIn from './table.vue'


const radio = ref('工艺参数设定')


// let timestamps: Ref<number> = ref(20)    //默认20min
// let timestamps_flag = true
// watch(timestamps, () => {
//     if (timestamps_flag) {
//         timestamps_flag = false
//         // 防抖 修改完查询时间3s后向后端发送请求，表明时间修改完成
//         setTimeout(() => {
//             timestamps_flag = true
//             let postdata = {
//                 'timing': timestamps.value
//             }
//             // 这个不是用于请求反应器数据的，而是通知后端查询时间改变了
//             getPPData('post', postdata).then((res) => {

//             })
//         }, 3000);
//     }
// })

// 测试多选框与其控制的几个响应式变量
watch([radio], () => {
    console.log('当前显示的内容有', radio.value);
})


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
