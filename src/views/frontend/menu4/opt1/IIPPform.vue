<template>
    <div class="wrapper">
        <div class="form-wrapper">

            <el-row>
                <el-col :span="24" style="margin-bottom: 20px;">
                    <h2 style="text-align: center;">R4101环管反应器输入</h2>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px" class="main-form">

                        <el-form-item label="操作变量1:" prop="var1">
                            <el-col :span="16">
                                <el-input v-model.number="form.var1" placeholder="请输入变量1的值" />
                            </el-col>

                            <el-col :span="8">
                                <el-tag class="ml-2" type="success">提示1</el-tag>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="操作变量2:" prop="var2">
                            <el-col :span="16">
                                <el-input v-model.number="form.var2" placeholder="请输入变量2的值" />
                            </el-col>

                            <el-col :span="8">
                                <el-tag class="ml-2" type="success">提示2</el-tag>
                            </el-col>
                        </el-form-item>



                        <el-form-item label="操作变量3:" prop="var3">
                            <el-input v-model.number="form.var3" placeholder="请输入变量3的值" />
                        </el-form-item>


                        <el-form-item label="操作变量4:" prop="var4">
                            <el-input v-model.number="form.var4" placeholder="请输入变量4的值" />
                        </el-form-item>

                        <el-form-item label="操作变量5:" prop="var5">
                            <el-input v-model.number="form.var5" placeholder="请输入变量5的值" />
                        </el-form-item>

                        <el-form-item label="操作变量6:" prop="var6">
                            <el-input v-model.number="form.var6" placeholder="请输入变量6的值" />
                        </el-form-item>


                        <el-form-item class="btn-item">
                            <el-button type="primary" @click="submitForm(ruleFormRef)">提交运行</el-button>
                            <el-button @click="resetForm(ruleFormRef)">清空数据</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            

        </div>

    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

// 表单栏绑定的数值
const form = reactive({
    var1: '',
    var2: '',
    var3: '',
    var4: '',
    var5: '',
    var6: '',

})

// 校验规则
const rules = reactive<FormRules>({
    var1: [
        {
            required: true,
            type: 'number',
            message: '警告信息1',
            trigger: 'blur',
            // 注意这里要进行
            // transform: (value) => Number(value),
        },
    ],
    var2: [
        {
            required: true,
            type: 'number',
            message: '警告信息2',
            trigger: 'blur',
            // transform: (value) => Number(value),
        },
    ],
    var3: [
        {
            required: true,
            type: 'number',
            message: '警告信息3',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    var4: [
        {
            required: true,
            type: 'number',
            message: '警告信息4',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    var5: [
        {
            required: true,
            type: 'number',
            message: '警告信息5',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
    var6: [
        {
            required: true,
            type: 'number',
            message: '警告信息6',
            trigger: 'change',
            // transform: (value) => Number(value),
        },
    ],
})



const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('成功提交!')
            console.log(form);
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>

<style scoped lang="scss">
.wrapper {
    width: 50vw;
    height: 100vh;
    background-color: aliceblue;
    display: flex;

    .form-wrapper {
        height: 500px;
        margin-top: 50px;
        margin-left: 30px;
        padding: 30px 50px;
        border: 1px solid rgb(193, 185, 185);
        // display: flex;

        .btn-item {
            margin-top: 50px;
        }
    }


}
</style>