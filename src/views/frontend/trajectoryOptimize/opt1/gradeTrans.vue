<template>
    <div class="wrapper">
        <el-row>
            <el-col>
                <el-card class="cardbox" shadow="never">
                    <el-row :gutter="40" class="header" align="middle" justify="center">
                        <el-col :span="2.5"> 当前生产牌号 </el-col>

                        <el-col :span="2.5">
                            <el-button :type="'warning'">{{ gradeNow }}</el-button>
                        </el-col>
                    </el-row>

                    <el-row justify="center">
                        <el-table :data="gradeNowTable" :style="Table" :header-cell-style="headerStyle()">
                            <el-table-column prop="reactor" label="反应器" />
                            <el-table-column prop="HoverM" label="氢气-乙烯比" />
                            <el-table-column prop="CoverM" label="共聚单体-乙烯比" />
                            <el-table-column prop="MI" label="熔融指数" width="150" />
                            <el-table-column prop="density" label="聚乙烯密度" />
                        </el-table>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-card class="cardbox" shadow="never">
                    <el-row :gutter="20" class="header" align="middle" justify="center">
                        <el-col :span="2.5"> <span style="color: rgb(255, 0, 0)">目标生产牌号</span> </el-col>

                        <el-col :span="2.5">
                            <el-button :type="'warning'">{{ targetGrade }}</el-button>
                        </el-col>

                        <el-col :span="1"></el-col>

                        <el-col :span="2.5"> 选择目标牌号 </el-col>

                        <el-col :span="2.5">
                            <el-select v-model="targetGrade" placeholder="请选择要切换的牌号" :style="{ width: '100px' }" @change="updateTargetGrade">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row justify="center">
                        <el-table :data="targetGradeTable" :style="Table" :header-cell-style="headerStyle()">
                            <el-table-column prop="reactor" label="反应器" />
                            <el-table-column prop="HoverM" label="氢气-乙烯比" />
                            <el-table-column prop="CoverM" label="共聚单体-乙烯比" />
                            <el-table-column prop="MI" label="熔融指数" width="150" />
                            <el-table-column prop="density" label="聚乙烯密度" />
                        </el-table>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, CSSProperties, Ref, watch, toRefs} from 'vue'


const targetGrade = ref('牌号1')
const options = [
    {
        value: '牌号1',
        label: '牌号1',
    },
    {
        value: '牌号2',
        label: '牌号2',
    },
    {
        value: '牌号3',
        label: '牌号3',
    },
]

const emit = defineEmits(['update:targetGrade'])

const updateTargetGrade = () => {
    // 触发自定义事件，传递新的值
    emit('update:targetGrade', targetGrade.value)
}


let props = defineProps<{
    gradeNow: string
    targetGrade: string
    gradeNowTable: {
        reactor: string
        HoverM: number
        CoverM: number
        MI: number
        density: number
    }[]
    targetGradeTable: {
        reactor: string
        HoverM: number
        CoverM: number
        MI: number
        density: number
    }[]
}>()

const { gradeNow, gradeNowTable, targetGradeTable} = toRefs(props)

const headerStyle = (): CSSProperties => {
    return {
        background: '#49846a',
        height: '1.2vw',
        'font-weight': 'bold',
        'font-size': '15px',
        color: '#ffffff',
        border: '0px',
    }
}

const Table = {
    width: '60%',
    margin: '10px',
    'font-family': 'Lucida Sans Unicode, Lucida Grande, Sans-Serif',
    'border-spacing': '0',
    'border-radius': '14px',
    border: 'none',
}

// const change2 = () => {
//     grade_now.value = '牌号2'
// }
// const change3 = () => {
//     grade_now.value = '牌号3'
// }
</script>

<style scoped lang="scss">
.wrapper {
    height: 550px;
}

.cardbox {
    margin: 20px auto;
    width: 80%;
}

.header {
    margin-bottom: 20px;
}

.card-header {
}

// 使用样式穿透解决使用header插槽会留下透明边框问题
:deep(.el-card__header) {
    border-bottom: none;
}
</style>
