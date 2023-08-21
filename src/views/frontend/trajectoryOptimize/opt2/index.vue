<template>
    <div class="default-main">
        <el-row style="margin-bottom: 20px" class="nav-bar">

            <el-col :span="2.9" style="margin-right: 20px">
                <el-tooltip content="查看页面" placement="top">
                    <el-select v-model="devValue" style="width: 150px" placeholder="I套聚已烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>

            <el-col :span="1.2" style="margin-right: 50px">
                <el-radio-group v-model="displayRadio">
                    <el-tooltip content="新旧牌号分子量分布对比" placement="top">
                        <el-radio-button label="分子量分布" />
                    </el-tooltip>
                    <el-tooltip content="质量指标变化趋势" placement="top">
                        <el-radio-button label="质量指标" />
                    </el-tooltip>
                    <el-tooltip content="优化配置比对" placement="top">
                        <el-radio-button label="优化结果分析" />
                    </el-tooltip>
                    <el-tooltip content="优化配置比对" placement="top">
                        <el-radio-button label="820组会页面" />
                    </el-tooltip>
                </el-radio-group>
            </el-col>

            <el-col :span="2.9" style="margin-right: 10px">
                <el-tooltip content="运行日志" placement="top">
                    <el-button type="success" plain @click="msgVisible = true"> 显示运行日志 </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <Ipp v-if="devValue === 'Option1'" :displayRadio="displayRadio"></Ipp>
        <newResult v-if="devValue === 'Option2'" :displayRadio="displayRadio"></newResult>

        <el-dialog v-model="msgVisible" width="30%" draggable style="border-radius: 1ch; background-color: #eafaff" center>
            <template #header>
                <h1>运行日志</h1>
            </template>
            <el-card class="msgCard" :body-style="{ padding: '0px' }" shadow="never">
                <el-table :data="msgData" height="300" style="width: auto">
                    <el-table-column prop="date" label="Date" width="220" align="center" />
                    <el-table-column prop="message" label="Message" width="300" align="center" />
                </el-table>
            </el-card>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, watch } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import Ipp from './Ipp.vue'
import newResult from './newResult.vue' 
import { usePPdata } from '/@/stores/PPdata'


const options = [
    {
        value: 'Option1',
        label: '旧页面',
    },
    {
        value: 'Option2',
        label: '新页面',
    },
]

const devValue = ref('Option2')

// const socket: Socket = inject("socket") as Socket;
const Ippdata = usePPdata()

// 牌号

const displayRadio = ref('优化结果分析')
const msgVisible = ref(false)


// 日志框中的信息
const msgData = reactive<
    {
        date: string
        message: string
    }[]
>([])



// onMounted(() => {
//     socket.on('connect', function() {
//         console.log('Socket connected');
//         socket.emit('status', {status: 'I\'m connected!'});
//     });
//     socket.on("connect_error", (err) => {
//         console.log(err);
//     })
//     socket.on('celerystatus', function(info) {
//         console.log(info)

//         msgData.push({
//             'date': info.datetime,
//             'message': info.message,
//         })

//         if (info.data.targetQuality) {
//             Ippdata.dataFill(info.data)
//         }

//         if (info.data.optQuality) {
//             Ippdata.dataFill(info.data)
//         }

//         // Ippdata.MWW = {
//         //     'MWW1': info.data.MWW1,
//         //     'MWW2': info.data.MWW2,
//         // }

//         // Ippdata.PDI = {
//         //     'PDI1': info.data.PDI1,
//         //     'PDI2': info.data.PDI2,
//         // }
//     });
// })
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import newResultVue from './newResult.vue'
// import { Socket } from 'socket.io-client'
export default defineComponent({
    name: 'trajectoryOptimize',
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

.nav-bar {
    background-color: white;
}

.box-card {
    widows: 100%;
    margin-top: 0px;
}

.card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: rgb(130, 45, 11);
    line-height: 100%;
}

:deep(.el-card__header) {
    border-bottom: none;
}

.TableTitle {
    width: 20%;
    height: 2rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: large;
    font-weight: 700;
    color: #3b8eea;
}

.box {
    padding: 0 10px;
    overflow: hidden;
    border: none;
}

.left {
    float: left;
    width: 200px;
    height: 600px;
}
.right {
    margin-left: 210px;
    height: 600px;
}

.btn-row {
    margin: 20px 0;
    // border: none;
}

.chart {
    margin-top: 0px;
    width: 400px;
    height: 400px;
    background-color: aquamarine;
}

.labelFont {
    font-size: 18px;
    color: red;
}

.gradeSelect {
    width: 17%;
    margin: 10px 18px;
}

.msgCard {
    width: 520px;
    margin-top: 2ch;
    border-radius: 1ch;

    margin: 0 auto;
}
</style>
