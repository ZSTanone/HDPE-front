<template>
    <div class="default-main">
        <newPage3 v-if="devValue === 'Option3'"></newPage3>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, inject, onMounted, watch } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import { usePPdata } from '/@/stores/PPdata'
import newPage3 from './newPage3.vue'


// const socket: Socket = inject("socket") as Socket;
const Ippdata = usePPdata()

const options = [
    {
        value: 'Option1',
        label: '旧页面',
    },
    {
        value: 'Option2',
        label: '新页面',
    },
    {
        value: 'Option3',
        label: '新页面1',
    },
]


const dialogVisible = ref(false)
let optValue = ref('牌号选择')
const devValue = ref('Option3')

// 牌号

const displayRadio = ref('熔融指数')

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
        R4101_H2: '0.384',
        R4101_C2H4: '2303.3724',
        R4101_C6H12: '4627.7004',
        R4201_H2: '0.384',
        R4201_C2H4: '2303.3724',
        R4201_C6H12: '4627.7004',
    },
    {
        description: '优化下限\xa0(Kmol/h)',
        R4101_H2: '0.256',
        R4101_C2H4: '1535.5816',
        R4101_C6H12: '3085.1336',
        R4201_H2: '0.256',
        R4201_C2H4: '1535.5816',
        R4201_C6H12: '3085.1336',
    },
])

// 日志框中的信息
const showOpt1 = () => {
    optValue.value = '牌号选择'
}
const showOpt2 = () => {
    optValue.value = '变量约束'
}
const showOpt3 = () => {
    optValue.value = '优化过程'
}

// 获取设定值的函数
const getOptPara = () => {
    let oldGrade: string = gradeNow.value
    let newGrade: string = targetGrade.value
    let oldPara = []
    let newPara: string[] = []

    let optVariableInput: string[] = []
    // let variableTargetWeight: string[] = []

    let optLb: string[] = []
    let optUb: string[] = []

    for (let i = 0; i < gradeNowTable.length; i++) {
        for (let key in gradeNowTable[i]) {
            oldPara.push(gradeNowTable[i][key])
        }
    }

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
        oldPara,
        newPara,
        optVariableInput,
        optLb,
        optUb,
    }
}

const onFinish = () => {
    let para = getOptPara()
    console.log(para)
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
