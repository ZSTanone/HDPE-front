<template>
    <div class="default-main">
        <el-row>
            <el-col :span="1.2" style="margin-right: 50px">
                <el-tooltip content="优化结果显示" placement="top">
                    <el-radio-group v-model="displayRadio">
                        <el-radio-button label="分子量分布" />
                        <el-radio-button label="数值指标" />
                    </el-radio-group>
                </el-tooltip>
            </el-col>

            <el-col :span="2.9" style="margin-right: 10px">
                <el-tooltip content="运行日志" placement="top">
                    <el-button type="success" plain @click="msgVisible = true"> 显示运行日志 </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <Ipp :displayRadio="displayRadio"></Ipp>

        <el-dialog v-model="msgVisible" width="30%" draggable style="border-radius: 1ch; background-color: #dcdcdc" center>
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
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import Ipp from './Ipp.vue'
import { usePPdata } from '/@/stores/PPdata'

// const socket: Socket = inject("socket") as Socket;
const Ippdata = usePPdata()

const displayRadio = ref('分子量分布')
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
// import { Socket } from 'socket.io-client'
export default defineComponent({
    name: 'OptResult',
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


.chart {
    margin-top: 0px;
    width: 400px;
    height: 400px;
    background-color: aquamarine;
}


.msgCard {
    width: 520px;
    margin-top: 2ch;
    border-radius: 1ch;

    margin: 0 auto;

}
</style>
