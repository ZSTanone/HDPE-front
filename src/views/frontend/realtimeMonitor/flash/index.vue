<template>
    <div class="outer">
        <div class="box1">
            <el-button type="primary" size="large" class="PI-55">{{ PI43155 }} MPa</el-button>
            <el-button type="primary" size="large" class="TI-1A">{{ TI43161A }} degC</el-button>
            <el-button type="primary" size="large" class="LZI-6A">{{ LZI43166A }} %</el-button>
            <el-button type="primary" size="large" class="TI-56">{{ TI43156 }} degC</el-button>
            <el-button type="primary" size="large" class="LZI-6B">{{ LZI43166B }} %</el-button>
            <el-button type="primary" size="large" class="TI-52">{{ TI43152 }} degC</el-button>
            <el-button type="primary" size="large" class="PI-53">{{ PI43153 }} MPa</el-button>
            <el-button type="primary" size="large" class="AI-57">{{ AI43157 }} ppmv</el-button>

            <!-- <el-card class="date" shadow="never">
                <h1 style="color: rgb(185, 71, 0); margin-bottom: 5px">当前时刻</h1>
                <h1>0-0-0</h1>
            </el-card> -->

            <el-card class="data-box" shadow="never">
                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">H2</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="H2" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431581" width="110">
                                <template #default="{ row }"> {{ row.line1 }} VOL% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431581A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} VOL% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">C2H4</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="C2H4" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431582" width="110">
                                <template #default="{ row }"> {{ row.line1 }} wt% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431582A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} wt% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">C2H6</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="C2H6" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431583" width="110">
                                <template #default="{ row }"> {{ row.line1 }} wt% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431583A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} wt% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">C4</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="C4" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431584" width="110">
                                <template #default="{ row }"> {{ row.line1 }} wt% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431584A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} wt% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">C61</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="C61" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431585" width="110">
                                <template #default="{ row }"> {{ row.line1 }} wt% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431585A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} wt% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">C62</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-table :data="C62" border style="width: 100%">
                            <el-table-column prop="line1" label="AI-431586" width="110">
                                <template #default="{ row }"> {{ row.line1 }} wt% </template>
                            </el-table-column>

                            <el-table-column prop="line2" label="AI-431586A" width="110">
                                <template #default="{ row }"> {{ row.line2 }} wt% </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row :gutter="20" align="middle">
                    <el-col :span="1.5"> <el-tag size="large">H2/C2</el-tag></el-col>
                    <el-col :span="1.5">
                        <el-button text bg>{{ h2c2 }}</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFlashdata } from '/@/stores/flashpara'
import { storeToRefs } from 'pinia'
// 0723 再创建一个其余参数的状态仓库

const flashData = useFlashdata()
const {
    AI431581,
    AI431581A,
    AI431582,
    AI431582A,
    AI431583,
    AI431583A,
    AI431584,
    AI431584A,
    AI431585,
    AI431585A,
    AI431586,
    AI431586A,
    h2c2,
    PI43153,
    PI43155,
    TI43152,
    TI43156,
    TI43161A,
    LZI43166A,
    LZI43166B,
    AI43157,
} = storeToRefs(flashData)

const H2 = [
    {
        line1: AI431581,
        line2: AI431581A,
    },
]

const C2H4 = [
    {
        line1: AI431582,
        line2: AI431582A,
    },
]

const C2H6 = [
    {
        line1: AI431583,
        line2: AI431583A,
    },
]

const C4 = [
    {
        line1: AI431584,
        line2: AI431584A,
    },
]

const C61 = [
    {
        line1: AI431585,
        line2: AI431585A,
    },
]

const C62 = [
    {
        line1: AI431586,
        line2: AI431586A,
    },
]
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'realtimeMonitor/flash',
})
</script>

<style scoped lang="scss">
.outer {
    width: 100vw;
    height: 100vh;
    // background-color: rgb(230, 255, 255);

    padding-top: 1vw;

    .box1 {
        width: 100%;
        height: 88%;

        position: relative;

        background-image: url(/@/assets/product/高压闪蒸724.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position-x: 30%;
    }

    .data-box {
        width: 370px;

        position: absolute;
        top: 0.3 * 5vw;
        left: 12 * 5vw;

        border: 1px solid rgba(33, 74, 121, 0.842);

        .el-row {
            margin-bottom: 10px;
        }
        .el-row:last-child {
            margin-bottom: 0;
        }
    }

    .PI-55 {
        position: absolute;
        top: 2.7 * 5vw;
        left: 2.2 * 5vw;
        font-size: medium;
    }

    .TI-1A {
        position: absolute;
        top: 5.3 * 5vw;
        left: 2.2 * 5vw;
        font-size: medium;
    }

    .LZI-6A {
        position: absolute;
        top: 7.4 * 5vw;
        left: 2.2 * 5vw;
        font-size: medium;
    }

    .TI-56 {
        position: absolute;
        top: 4.1 * 5vw;
        left: 4.7 * 5vw;
        font-size: medium;
    }

    .LZI-6B {
        position: absolute;
        top: 6 * 5vw;
        left: 4.7 * 5vw;
        font-size: medium;
    }

    .TI-52 {
        position: absolute;
        top: 2.7 * 5vw;
        left: 5.85 * 5vw;
        font-size: medium;
    }

    .PI-53 {
        position: absolute;
        top: 2.2 * 5vw;
        left: 8 * 5vw;
        font-size: medium;
    }

    .AI-57 {
        position: absolute;
        top: 2.7 * 5vw;
        left: 10.2 * 5vw;
        font-size: medium;
    }

    .date {
        position: absolute;
        top: 0.5 * 5vw;
        left: 7 * 5vw;
        width: 280px;
        height: 80px;
        text-align: center;

        background-color: #72a1d76a;
    }
}
</style>
