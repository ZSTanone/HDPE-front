<template>
    <div class="default-main">
        <!-- 顶部的导航栏 -->
        <el-row>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="配置参数" placement="top">
                    <el-button type="primary" @click="dialogVisible = true">
                        配置参数
                    </el-button>
                </el-tooltip>
            </el-col>
        </el-row>

        <!-- 点击配置参数选项的弹出对话框 -->
        <el-dialog v-model="dialogVisible" title="配置参数" width="70%" draggable style="border-radius: 1ch;">
            <!-- 这里在dialog组件内包裹了一个card组件 -->
            <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="hover">
                <!-- 在card组件的header插槽中加入步骤条组件 -->
                <template #header>
                    <div class="card-header">
                        <el-steps :active="active" finish-status="success" align-center class="steps">
                            <el-step title="上传文件"></el-step>
                            <el-step title="选择优化参数"></el-step>
                            <el-step title="选择优化指标"></el-step>
                        </el-steps>

                        <el-button type="success" size="large" round @click="preStep">上一步</el-button>
                        <el-button type="success" size="large" round @click="nextStep">下一步</el-button>
                    </div>
                </template>

                <!-- 这部分相当于主内容区，通过既定的步骤进行文件上传，参数限制等操作 -->
                <div class="item">
                    
                    <!-- 第一步 使用upload组件上传文件 -->
                    <el-upload 
                        ref="upload" v-show="active === 0" drag :on-exceed="handleExceed" action=""
                        :http-request="handleRequest" :limit="1" :on-change="beforeUpload" :auto-upload="false"
                        accept=".csv">
                        <div class="TableTitle">优化分布质量指标文件上传</div>
                        <Icon name="el-icon-UploadFilled" size="60" />
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                    </el-upload>
                    
                    <!-- 第二步 确定优化的质量指标 + 优化的牌号  这是优化的目标-->
                    <div v-if="active === 1" style="display: flex;flex-direction: column; line-height: 100%;margin:1ch 2%;">
                        <el-select class="gradeSelect" v-model="gradeValue" placeholder="请选择你想优化的牌号">
                            <el-option label="M30RH" value="M30RH" />
                            <el-option label="M26ET" value="M26ET" />
                            <el-option label="Y26" value="Y26" />
                        </el-select>

                        <div>
                            <div class="TableTitle">优化数值质量指标输入</div>
                            <TargetTable v-model:targetSelect="targetSelect" :tableData="TargetTableData"/>
                        </div>
                    </div>

                    <!-- 第三步 确定各个优化变量的上下限 + 提交运行 这是优化的变量，操作值 -->
                    <div v-if="active === 2" style="width: 98%;margin: 1ch 0;">
                        
                        <div>
                            <div class="TableTitle">工艺参数输入</div>
                            <InputTable v-model:inputSelect="inputSelect" :table-data="InputTableData"/>
                        </div>
                        <el-button 
                            style="width: 10%;margin: 3ch 0 0ch 90%;" 
                            type="success" size="large"
                            @click="submitUpload">完成配置</el-button>
                    </div>

                    <div v-show="active === 3" style="width: 10%;margin: 0 45%;">
                        <el-button style="width: 100%,margin: auto;" type="success" size="large" @click="clearaActive">
                            回到第一步
                        </el-button>
                    </div>
                </div>
            </el-card>
        </el-dialog>
        
        <!-- 主内容区 -->
        <Ipp v-if="devValue === 'Option1'"></Ipp>

        <el-card class="msgCard" :body-style="{ padding: '0px' }" shadow="never" >
            <el-table :data="msgData" height="250" style="width: auto">
                <el-table-column prop="date" label="Date" width="220" align="center"/>
                <el-table-column prop="message" label="Message" width="300" align="center"/>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import Ipp from './Ipp.vue'
import InputTable from './InputTable.vue'
import TargetTable from './TargetTable.vue'
import { usePPdata} from '/@/stores/PPdata'

// const socket: Socket = inject("socket") as Socket;
const Ippdata = usePPdata()

const options = [
    {
        value: 'Option1',
        label: 'I套聚丙烯装置',
    }, {
        value: 'Option2',
        label: 'II套聚丙烯装置',
    },
]

const dialogVisible = ref(false)
const devValue = ref('Option1')
const gradeValue = ref('M26ET')

// 以下定义的一写变量是用于父组件向子组件传参，即在步骤栏中进行参数的确定
const inputSelect = reactive<{ 
TICL4: boolean; TEAL: boolean; 
R200H2: boolean; R200C3H6: boolean;
R201H2: boolean; R201C3H6: boolean; 
R202H2: boolean; R202C3H6: boolean;
R401H2: boolean; R401C3H6: boolean; R401C2H4: boolean;}>({
    TICL4: false, TEAL: false,
    R200H2: true, R200C3H6: true,
    R201H2: true, R201C3H6: true, 
    R202H2: true, R202C3H6: true, 
    R401H2: true, R401C3H6: true, R401C2H4: true,
})

// 定义变量的时候指定了变量的类型
const targetSelect = reactive<{ 
'总聚合产量': boolean; '均聚物产量': boolean; 
'共聚物产量': boolean; '总聚合乙烯含量': boolean; 
'共聚乙烯含量': boolean; 'SCBaver': boolean; }>({
    '总聚合产量': true, '均聚物产量': true,
    '共聚物产量': true, '总聚合乙烯含量': true,
    '共聚乙烯含量': true, 'SCBaver': true,
})

const InputTableData = reactive<{ 
description: string; TICL4: string; TEAL: string;
R200H2: string; R200C3H6: string; 
R201H2: string; R201C3H6: string; 
R202H2: string; R202C3H6: string;
R401H2: string; R401C3H6: string; R401C2H4: string;}[]>([
    {
        description: '优化上限\xa0(Kmol/h)', TICL4: '', TEAL: '',
        R200H2: '0.114', R200C3H6: '3240',
        R201H2: '3.816', R201C3H6: '51873.096', 
        R202H2: '37.044', R202C3H6: '21118.596', 
        R401H2: '0.384', R401C3H6: '2303.3724', R401C2H4: '4627.7004',
    },
    {
        description: '优化下限\xa0(Kmol/h)', TICL4: '', TEAL: '',
        R200H2: '0.076', R200C3H6: '2160',
        R201H2: '2.544', R201C3H6: '34582.064', 
        R202H2: '24.696', R202C3H6: '14079.064', 
        R401H2: '0.256', R401C3H6: '1535.5816', R401C2H4: '3085.1336',
    },
])

const TargetTableData = reactive<{ 
description: string; '总聚合产量': string; '均聚物产量': string; '共聚物产量': string; 
'总聚合乙烯含量': string; '共聚乙烯含量': string; 'SCBaver': string;}[]>([
    {
        description: '目标设定值\xa0(Kmol/h)', '总聚合产量': '42560', '均聚物产量': '35897',
        '共聚物产量': '6663', '总聚合乙烯含量': '0.087733557','共聚乙烯含量': '0.560399247', 'SCBaver': '144.6607563',
    },
])

// 这个函数的作用就是从我们的输入中获取对应的操作变量的值
const getOptValue = () => {
    // 下面四个变量分别是：操作变量、目标值、（操作变量的）上界、下界
    let optVariableInput:string[] = []
    let variableTargetWeight:string[] = []
    let optLb:string[] = []
    let optUb:string[] = []
    // for in 遍历inputSelect 得到的是key（操作变量的名称，如TEAL） 使用inputSelect[key]得到value（false 或 true）
    // 当值为true的时候，表示要用到这个值，将其压入对应数组
    for (let key in inputSelect) {
        if (inputSelect[key]) {
            // 录入优化变量以及其上下限
            optVariableInput.push(key)
            optUb.push(InputTableData[0][key])
            optLb.push(InputTableData[1][key])
        }
    }
    // 对应的优化目标也进行类似处理
    for (let key in targetSelect) {
        if (targetSelect[key]) {
            variableTargetWeight.push(key)
        }
    }
    // 读取优化目标变量的值：TargetTableData[0]是一个对象
    let variableTarget = [
        Number(TargetTableData[0]['均聚物产量']),
        Number(TargetTableData[0]['总聚合产量']),
        Number(TargetTableData[0]['共聚物产量']),
        Number(TargetTableData[0]['总聚合乙烯含量']),
        Number(TargetTableData[0]['共聚乙烯含量']),
        Number(TargetTableData[0]['SCBaver'])
    ]
    return {
        optVariableInput,
        optUb,
        optLb,
        gradeValue: gradeValue.value,
        variableTarget: variableTarget,
        variableTargetWeight,
    }
}

// 日志框中的信息
const msgData = reactive<{
    'date': string,
    'message': string
}[]>([
    
])

// 上传文件的列表
let uploadFileList = ref();
// 进度条步骤，默认0
const active = ref(0)
const upload = ref<UploadInstance>()
// 为了方便起见先设置为true
let uploadFlag = true
// 上一步
const preStep = () => {
    if (active.value-- <= 0) active.value = 0;
    console.log(upload.value!.fileList);  //这里打印undefined怎么回事
}
// 下一步
const nextStep = () => {
    if (active.value === 1 && gradeValue.value === '') {
        ElMessage.error("请选择想要优化的牌号");
        return false
    }
    if (uploadFlag && active.value++ > 2) {
        active.value = 3;
    }
    // console.log(upload.value?.fileList);
}
// 返回第一步
const clearaActive = () => {
    active.value = 0;
    uploadFlag = false;
}
// 当上传的文件超出限制的处理
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
// 上传文件之前的回调 判断上传文件的格式
const beforeUpload: UploadProps['onChange'] = (file: any) => {
    const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
    const whiteList = ['csv'];
    if (whiteList.indexOf(fileSuffix) === -1) {
        ElMessage.error("上传文件只能是 csv 格式");
        ElMessage.error("上传失败");
        return false;
    }
    ElMessage({
        message: '上传成功',
        type: 'success',
    })
    uploadFlag = true
    uploadFileList.value = file;
}

// 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
const handleRequest: UploadProps['httpRequest'] = (e: any) => {
    let fd = new FormData()
    fd.append('files', uploadFileList.value.raw)

    let optValue = getOptValue()
    
    for (let key in optValue) {
        fd.append(key, optValue[key])
    }

    const fileReader = new FileReader();
    fileReader.readAsText(uploadFileList.value.raw);
    
    nextStep()

    return uploadTargetMW('post', fd)
}

// 完成最终的配置
const submitUpload = () => {
    if (gradeValue.value === '') {
        ElMessage.error("优化的牌号名字不能为空");
        return false
    }
    upload.value!.submit()
}

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
    name: 'newTest/page2',
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

.box-card {
    widows: 100%;
    margin-top: 1.5ch;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 8ch;
    line-height: 100%;
}

.steps {
    width: 100%;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
}
.TableTitle{
    width: 20%;
    height: 2rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: large;
    font-weight: 700;
    color: #3b8eea;
}

.item {
    padding: 0 10px;
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
}
</style>
