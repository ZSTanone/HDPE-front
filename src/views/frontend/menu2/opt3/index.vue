<template>
    <div class="default-main">
        <el-row>

            <!-- <el-col :span="2.9" style="margin-right: 10px;">
                <el-tag class="ml-2" size="large"  effect="dark">选择反应器</el-tag>
            </el-col>

            <el-col :span="2.9" style="margin-right: 50px;">
                <el-tooltip content="选取聚乙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col> -->

            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tag class="ml-2" size="large"  effect="dark">选择查询频率</el-tag>
            </el-col>

            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选择查询时间频率" placement="top">
                    <el-input class="input-with-select" v-model="timestamps" style="width:140px"
                        :blur="timestampsischange = true">
                        <template #append>
                            <el-select v-model="freqValue" style="width:70px">
                                <el-option v-for="item in ferqOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </template>
                    </el-input>
                </el-tooltip>
            </el-col>
        </el-row>

        <!-- 去掉 -->
        <!-- <R1  v-if="devValue === 'Option1'" ></R1>
        <R2  v-if="devValue === 'Option2'" ></R2> -->
        <R1></R1>

    </div>
</template>


<script setup lang="ts">
import { onMounted, Ref, ref, watch ,reactive, watchEffect } from 'vue'
import { useHDPEpara } from '/@/stores/hdpepara'
import R1 from './R4101.vue'
import R2 from './R4201.vue'

const freqValue = ref('Option2')

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

const ferqOptions = [
    {
        value: 'Option1',
        label: 'sec',
    }, {
        value: 'Option2',
        label: 'min',
    },
]

const devValue = ref('Option1')
const HDPEpara = useHDPEpara()

// 注意在实时监控功能中我们不需要在index页面显示某些图表之类的，所以，这个state的定义，有待商榷
const state: {
    postdata: object // postdata是向后端请求数据时的负载数据
} = reactive({
    postdata: {
        reactor: devValue,
        timestamp: 100,
        time: new Date(1636326000 * 1000).toString(),
        full: true
    }
})

// 时间间隔  默认60 min
let timestamps: Ref<number> = ref(HDPEpara.timeset)
// 时间是否改变
let timestampsischange = true

// 监听查询频率的变化
watchEffect(() => {
    if (freqValue.value === 'Option1' && timestamps.value && timestampsischange) {
        timestampsischange = false
        HDPEpara.timeset = timestamps.value
        setTimeout(() => {
            HDPEpara.timestamps = timestamps.value * 1000
            timestampsischange = true
            console.log('查询时间发生变化')
        }, 2000)
    } else if (freqValue.value === 'Option2' && timestamps.value && timestampsischange) {
        timestampsischange = false
        HDPEpara.timeset = timestamps.value
        setTimeout(() => {
            HDPEpara.timestamps = timestamps.value * 1000 * 60
            timestampsischange = true
            console.log('查询时间发生变化')
        }, 2000)
    }
})

</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'menu2/opt3',
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