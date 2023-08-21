<template>
    <div>
        <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="never">
            <!-- 在card组件的header插槽中加入步骤条组件 -->
            <template #header>
                <div class="card-header">
                    <el-row justify="space-evenly">
                        <el-col style="margin-bottom: 10px">
                            <el-steps :active="active" finish-status="success" align-center class="steps">
                                <el-step title="提交优化轨迹模板"></el-step>
                                <el-step title="选择优化牌号"></el-step>
                                <el-step title="优化变量约束"></el-step>
                            </el-steps>
                        </el-col>
                    </el-row>
                </div>
            </template>

            <!-- 这部分相当于主内容区，通过既定的步骤进行文件上传，参数限制等操作 -->
            <div class="item" v-loading="loading">
                <!-- 第一步 使用upload组件上传文件 -->
                <el-upload
                    ref="upload"
                    v-show="active === 0"
                    drag
                    :on-exceed="handleExceed"
                    action=""
                    :http-request="handleRequest"
                    :limit="1"
                    :on-change="beforeUpload"
                    :auto-upload="false"
                    accept=".csv"
                >
                    <div class="TableTitle">操作轨迹优化文件上传</div>
                    <Icon name="el-icon-UploadFilled" size="60" />
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                </el-upload>

                <!-- 第二步 确定优化的质量指标 + 优化的牌号  这是优化的目标-->
                <div v-if="active === 1" style="display: flex; flex-direction: column; line-height: 100%; margin: 1ch 2%">
                    <div>
                        <div class="TableTitle">选择切换牌号</div>
                    </div>
                    <GradeTrans
                        v-model:targetGrade="targetGrade"
                        :gradeNow="gradeNow"
                        :grade-now-table="gradeNowTable"
                        :target-grade-table="targetGradeTable"
                        @update:targetGrade="handleTargetGradeUpdate"
                    ></GradeTrans>
                </div>

                <div v-if="active === 2" style="display: flex; flex-direction: column; line-height: 100%; margin: 1ch 2%">
                    <div>
                        <div class="TableTitle">优化变量约束</div>
                    </div>
                    <paraConstrain v-model:inputSelect="inputSelect" :table-data="InputTableData"></paraConstrain>
                </div>

                <div v-show="active === 3" style="width: 10%; margin: 0 45%">
                    <el-result icon="success" title="配置成功" v-show="!loading"> </el-result>
                </div>
            </div>

            <el-row justify="space-evenly" style="margin-top: 50px">
                <el-col :span="2">
                    <el-button type="primary" size="large" round @click="preStep">上一步</el-button>
                </el-col>

                <el-col :span="2">
                    <el-button type="primary" size="large" round @click="nextStep" v-show="active === 0 || active === 1">下一步</el-button>
                    <el-button type="success" size="large" round v-show="active === 2" @click="submitUpload">提交</el-button>
                    <el-button type="primary" size="large" round @click="clearaActive" v-show="active === 3" :disabled="loading">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import GradeTrans from './gradeTrans.vue'
import paraConstrain from './paraConstrain.vue'
import { usePPdata } from '/@/stores/PPdata'
import { gradeResult } from '/@/api/frontend/user'

// const socket: Socket = inject("socket") as Socket;
const Ippdata = usePPdata()

// 历史记录
const info = ref<Array<any>>([])

// 加载
const loading =ref(false)

// 牌号
// 牌号选择-父子组件传参
const gradeNow = ref('牌号1')
const targetGrade = ref('牌号1')
const gradeNowTable = reactive<
    {
        reactor: string
        HoverM: number
        CoverM: number
        MI: number
        density: number
    }[]
>([
    {
        reactor: 'R4101',
        HoverM: 0,
        CoverM: 0,
        MI: 0,
        density: 0,
    },
    {
        reactor: 'R4201',
        HoverM: 0,
        CoverM: 0,
        MI: 0,
        density: 0,
    },
])

// 使用字典记录所有牌号信息
const gradeData = {
    牌号1: [
        {
            reactor: 'R4101',
            HoverM: 132.2,
            CoverM: 56.2,
            MI: 33,
            density: 62,
        },
        {
            reactor: 'R4201',
            HoverM: 112,
            CoverM: 87.9,
            MI: 64.3,
            density: 45.6,
        },
    ],

    牌号2: [
        {
            reactor: 'R4101',
            HoverM: 2,
            CoverM: 2,
            MI: 2,
            density: 2,
        },
        {
            reactor: 'R4201',
            HoverM: 112,
            CoverM: 87.9,
            MI: 64.3,
            density: 45.6,
        },
    ],
    牌号3: [
        {
            reactor: 'R4101',
            HoverM: 3,
            CoverM: 3,
            MI: 33,
            density: 3,
        },
        {
            reactor: 'R4201',
            HoverM: 112,
            CoverM: 87.9,
            MI: 64.3,
            density: 45.6,
        },
    ],
}

const handleTargetGradeUpdate = (newValue: any) => {
    targetGrade.value = newValue
}

//使用if语句 设置 grade_now_table 的初始值
if (gradeNow.value === '牌号1') {
    gradeNowTable.splice(0, gradeNowTable.length, ...gradeData.牌号1)
} else if (gradeNow.value === '牌号2') {
    gradeNowTable.splice(0, gradeNowTable.length, ...gradeData.牌号2)
} else if (gradeNow.value === '牌号3') {
    gradeNowTable.splice(0, gradeNowTable.length, ...gradeData.牌号3)
}
// 默认情况下目标牌号为当前牌号，这里是目标牌号表格数据的初始化
const targetGradeTable = reactive([...gradeNowTable])

// 监听target_grade（目标牌号）的变化
watch(targetGrade, (newValue) => {
    targetGradeTable.splice(0, targetGradeTable.length, ...gradeData[newValue])
})

// 变量约束 父子组件传参 参数约束
const inputSelect = reactive<{
    R4101_H2: boolean
    R4101_C2H4: boolean
    R4101_C6H12: boolean
    R4201_H2: boolean
    R4201_C2H4: boolean
    R4201_C6H12: boolean
}>({
    R4101_H2: true,
    R4101_C2H4: true,
    R4101_C6H12: true,
    R4201_H2: true,
    R4201_C2H4: true,
    R4201_C6H12: true,
})

const InputTableData = reactive<
    {
        description: string
        R4101_H2: string
        R4101_C2H4: string
        R4101_C6H12: string
        R4201_H2: string
        R4201_C2H4: string
        R4201_C6H12: string
    }[]
>([
    {
        description: '优化上限\xa0(Kmol/h)',
        R4101_H2: '0.3',
        R4101_C2H4: '2303',
        R4101_C6H12: '4627',
        R4201_H2: '0.3',
        R4201_C2H4: '2303',
        R4201_C6H12: '4627',
    },
    {
        description: '优化下限\xa0(Kmol/h)',
        R4101_H2: '0.2',
        R4101_C2H4: '1535',
        R4101_C6H12: '3085',
        R4201_H2: '0.2',
        R4201_C2H4: '1535',
        R4201_C6H12: '3085',
    },
])

// 获取设定值的函数
const getOptPara = () => {
    let oldGrade: string = gradeNow.value
    let newGrade: string = targetGrade.value
    // let oldPara = []
    // let newPara: string[] = []

    let optVariableInput: string[] = []

    let optLb: string[] = []
    let optUb: string[] = []

    // for (let i = 0; i < gradeNowTable.length; i++) {
    //     for (let key in gradeNowTable[i]) {
    //         oldPara.push(gradeNowTable[i][key])
    //     }
    // }

    for (let key in inputSelect) {
        if (inputSelect[key]) {
            optVariableInput.push(key)
            optUb.push(InputTableData[0][key])
            optLb.push(InputTableData[1][key])
        }
    }

    return {
        oldGrade,
        newGrade,
        // oldPara,
        // newPara,
        optVariableInput,
        optLb,
        optUb,
    }
}

// 上传文件的列表
let uploadFileList = ref()
// 进度条步骤，默认0
const active = ref(0)
const upload = ref<UploadInstance>()
let uploadFlag = true
// 上一步
const preStep = () => {
    if (active.value-- <= 0) active.value = 0
    // console.log(upload.value!.fileList) //这里打印undefined怎么回事
}
// 下一步
const nextStep = () => {
    console.log(active.value)
    if (uploadFlag && active.value++ > 2) {
        active.value = 3
    }
}
// 返回第一步
const clearaActive = () => {
    active.value = 0

    uploadFlag = true //这里可能需要稍加修改
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
    const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1)
    const whiteList = ['csv']
    if (whiteList.indexOf(fileSuffix) === -1) {
        ElMessage.error('上传文件只能是 csv 格式')
        ElMessage.error('上传失败')
        return false
    }
    ElMessage({
        message: '上传成功',
        type: 'success',
    })
    uploadFlag = true
    uploadFileList.value = file
}

// 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求，上传文件的同时获取操作变量
const handleRequest: UploadProps['httpRequest'] = (e: any) => {
    let fd = new FormData()
    fd.append('files', uploadFileList.value.raw)

    let setting = getOptPara()

    for (let key in setting) {
        fd.append(key, setting[key])
    }

    const fileReader = new FileReader()
    fileReader.readAsText(uploadFileList.value.raw)

    nextStep()

    return uploadTargetMW('post', fd)
}

// 完成最终的配置
const submitUpload = () => {
    if (uploadFlag && active.value++ > 2) {
        active.value = 3
    }

    loading.value = true

    // upload.value!.submit()
    let setting = getOptPara()
    // setting['result'] = [1,2,3,4,5]

    // // 在这里调用接口拿到后端返回的数据（熔指），存进info 写入sessionStorage
    gradeResult('post', setting).then((res) => {
        if (res.code == 1) {
            ElMessage.success('轨迹调优运行完毕')
            setting['result'] = res.data.data
            setting['updateTime'] = res.time

            // 设置为只能存储四个历史数据
            if (info.value.length < 2) {
                info.value.push(setting)
            } else {
                info.value.shift()
                info.value.push(setting)
            }
            console.log(setting)
            sessionStorage.setItem('gradeSet', JSON.stringify(info.value))
            loading.value = false
        } else {
            ElMessage.error('发生错误请检查后重试')
        }
    })
}

onMounted(() => {
    info.value = []

    let val = JSON.parse(sessionStorage.getItem('gradeSet')!)

    if (val) {
        for (let item of val) {
            info.value.push(item)
        }
    }
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
    height: 100vh;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20ch;
    line-height: 100%;
}

.steps {
    width: 100%;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
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

.item {
    padding: 0 10px;
    height: 600px;
}
</style>
