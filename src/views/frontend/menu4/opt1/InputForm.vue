<!-- 使用表单制作模拟仿真的输入 -->
<template>
    <div class="wrapper">
        <div class="form-wrapper">
            <el-row>
                <el-form :inline="true" ref="ruleFormRef" :model="form" :rules="rules" label-width="130px"
                    class="main-form">
                    <h2 class="title">R4101环管反应器输入</h2>

                    <el-form-item label="乙烯进料:" prop="FC41058">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC41058" placeholder="请输入变量1的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示1</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="氢气进料:" prop="FC41053">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC41053" placeholder="请输入变量2的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示2</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="己烯进料:" prop="FC41049">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC41049" placeholder="请输入变量3的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示3</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="催化剂进料:" prop="FC30253">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC30253" placeholder="请输入变量4的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示4</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="助催化剂进料:" prop="FC30493">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC30493" placeholder="请输入变量5的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示5</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="新鲜异丁烷进料:" prop="FC41048">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC41048" placeholder="请输入变量6的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示6</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-divider />

                    <h2 class="title">R4201环管反应器输入</h2>

                    <el-form-item label="乙烯进料:" prop="FC42058">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC42058" placeholder="请输入变量7的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示7</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="氢气进料:" prop="FC42053">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC42053" placeholder="请输入变量8的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示8</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="己烯进料:" prop="FC42049">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC42049" placeholder="请输入变量9的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示9</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="助催化剂进料:" prop="FC30486">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC30486" placeholder="请输入变量10的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示10</el-tag>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="新鲜异丁烷进料:" prop="FC42048">
                        <el-col :span="16">
                            <el-input v-model.number="form.FC42048" placeholder="请输入变量11的值" />
                        </el-col>

                        <el-col :span="8">
                            <el-tag class="ml-2" type="success">提示11</el-tag>
                        </el-col>
                    </el-form-item>



                    <el-form-item class="btn-item">
                        <el-button type="primary" @click="submitForm(ruleFormRef)">提交运行</el-button>

                        <el-button @click="resetForm(ruleFormRef)">清空数据</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

import { useSimPara } from "/@/stores/SimPara";
import { storeToRefs } from 'pinia'

const SimPara = useSimPara()
const { FC41058, FC41053, FC41049, FC30253, FC30493, FC41048, FC42058, FC42053, FC42049, FC30486, FC42048} = storeToRefs(SimPara)

const ruleFormRef = ref<FormInstance>()

let para_obj : { [key: string]: any } = {}
let submit_flag : Ref<boolean> = ref(SimPara.submit)

// 表单栏绑定的数值
const form = reactive({
    FC41058,
    FC41053,
    FC41049,
    FC30253,
    FC30493,
    FC41048,

    FC42058,
    FC42053,
    FC42049,
    FC30486,
    FC42048,
})

// 校验规则
const rules = reactive<FormRules>({
    FC41058: [
        {
            required: true,
            type: 'number',
            message: '警告信息1',
            trigger: 'blur',
            // 注意这里要进行
            // transform: (value) => Number(value),
        },
    ],
    FC41053: [
        {
            required: true,
            type: 'number',
            message: '警告信息7',
            trigger: 'change',
        },
    ],
    FC41049: [
        {
            required: true,
            type: 'number',
            message: '警告信息3',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    FC30253: [
        {
            required: true,
            type: 'number',
            message: '警告信息4',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    FC30493: [
        {
            required: true,
            type: 'number',
            message: '警告信息5',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    FC41048: [
        {
            required: true,
            type: 'number',
            message: '警告信息6',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    FC42058: [
        {
            required: true,
            type: 'number',
            message: '警告信息7',
            trigger: 'change',
        },
    ],
    FC42053: [
        {
            required: true,
            type: 'number',
            message: '警告信息8',
            trigger: 'change',
        },
    ],
    FC42049: [
        {
            required: true,
            type: 'number',
            message: '警告信息9',
            trigger: 'change',
        },
    ],
    FC30486: [
        {
            required: true,
            type: 'number',
            message: '警告信息10',
            trigger: 'change',
        },
    ],
    FC42048: [
        {
            required: true,
            type: 'number',
            message: '警告信息11',
            trigger: 'change',
        },
    ],
})


// 设置防抖
let timer: NodeJS.Timeout | null = null;

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    // 清除之前的定时器
    if (timer) {
        clearTimeout(timer);
    }

    // 设置新的定时器
    timer = setTimeout(async () => {
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('成功提交!');
                ElMessage({
                    message: '反应数据设置成功',
                    type: 'success',
                });
                para_obj = SimPara.getPara()
                // flag为true表示成功提交
                submit_flag.value = true
                console.log(submit_flag.value)
                console.log(para_obj);
            } else {
                console.log('error submit!', fields);
                ElMessage.error('输入数据有误，请检查后重试');
            }
        });

        // 清空定时器
        timer = null;
    }, 1500);
};


const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
.wrapper {
    width: 100%;
    height: 100vh;
    background-color: aliceblue;
    display: flex;
    justify-content: center;

    .form-wrapper {
        height: 700px;
        width: 50vw;
        margin-top: 50px;
        margin-left: 30px;
        text-align: center;
        border: 3px solid rgb(193, 185, 185);
        display: flex;

        .btn-item {
            margin-top: 4vw;

            // 控制两个按钮中间的距离
            .el-button {
                margin: 0px 5vw;
            }
        }
    }

    .title {
        text-align: center;
        margin-bottom: 50px;
        margin-top: 50px;
    }
}
</style>
