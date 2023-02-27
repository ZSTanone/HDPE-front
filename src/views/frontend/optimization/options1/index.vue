<!--
 * @Description: 
 * @Author: zwj
 * @Date: 2022-10-20 14:41:56
 * @LastEditTime: 2022-10-27 11:02:05
 * @LastEditors: zwj
-->
<template>
    <div class="default-main">
        <el-row>
            <el-col :span="2.9" style="margin-right: 10px;">
                <el-tooltip content="选取聚丙烯装置" placement="top">
                    <el-select v-model="devValue" style="width:150px" placeholder="I套聚丙烯装置">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tooltip>
            </el-col>
        </el-row>

        <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="never">
            <template #header>
                <div class="card-header">
                    <el-steps :active="active" finish-status="success" align-center class="steps">
                        <el-step title="上传文件"></el-step>
                        <el-step title="选择牌号"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>

                    <el-button type="success" size="large" round @click="preStep">上一步</el-button>
                    <el-button type="success" size="large" round @click="nextStep">下一步</el-button>
                </div>
            </template>
            <div class="item">
                <el-upload 
                    ref="upload" v-show="active === 0" drag :on-exceed="handleExceed" action=""
                    :http-request="handleRequest" :limit="1" :on-change="beforeUpload" 
                     :auto-upload="false">
                    <Icon name="el-icon-UploadFilled" size="60" />
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                </el-upload>

                <div v-show="active === 1" style="display: flex;line-height: 100%;margin: 0 30%;">
                    <div style="font-size: 18px;height: 40px;line-height: 40px;">
                        请选择你想优化的牌号：
                    </div>
                    <el-select style="width: 30%;" v-model="gradeValue" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>

                <div v-show="active === 2" style="width: 10%;margin: 0 45%;">
                    <el-button style="width: 100%,margin: auto;" type="success" size="large" @click="submitUpload">提交</el-button>
                </div>

                <div v-show="active === 3" style="width: 10%;margin: 0 45%;">
                    <el-button style="width: 100%,margin: auto;" type="success" size="large" @click="clearaActive">
                        回到第一步
                    </el-button>
                </div>
            </div>
        </el-card>

        <Ipp v-if="devValue === 'Option1'"></Ipp>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, genFileId, UploadProps } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'
import { uploadTargetMW } from '/@/api/frontend/user'
import Ipp from './Ipp.vue'

const options = [
    {
        value: 'Option1',
        label: 'I套聚丙烯装置',
    }, {
        value: 'Option2',
        label: 'II套聚丙烯装置',
    },
]
const gradeOptions = [
    {
        value: 'M60ET',
        label: 'M60ET',
    }, {
        value: 'M26ET',
        label: 'M26ET',
    },
]

const devValue = ref('Option1')
const gradeValue = ref('M60ET')



const active = ref(0)
const upload = ref<UploadInstance>()
let uploadFlag = false
const preStep = () => {
    if (active.value-- <= 0) active.value = 0;
    console.log(upload.value!.fileList);
}
const nextStep = () => {
    if (uploadFlag && active.value++ > 2) {
        active.value = 3;
    }
}
const clearaActive = () => {
    active.value = 0;
    uploadFlag = false;
}
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
const beforeUpload: UploadProps['onChange'] = (file: any) => {
    const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
    const whiteList = ["xls", "xlsx", 'csv'];
    if (whiteList.indexOf(fileSuffix) === -1) {
        ElMessage.error("上传文件只能是 xls,xlsx,csv 格式");
        ElMessage.error("上传失败");
        return false;
    }
    ElMessage({
        message: '上传成功',
        type: 'success',
    })
    uploadFlag = true
}

const handleRequest: UploadProps['httpRequest'] = (e:any) => {
    const fd = new FileReader()
    fd.readAsDataURL(e.file)
    // 将文件转化为base64格式传入后端
    fd.onload = () => {
        uploadTargetMW('post', {file: fd.result,})
    }
}
const submitUpload = () => {
  upload.value!.submit()
}



</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'optimization/options1',
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

.item {
    padding: 0 10px;
}

.chart {
    margin-top: 0px;
    width: 400px;
    height: 400px;
    background-color: aquamarine;
}
</style>
