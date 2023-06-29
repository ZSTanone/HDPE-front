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
            <!-- 插槽 -->
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


// 默认第0步
const active = ref(0)

// upload表示表格的引用名称，是一个响应式变量，表示组件上传的实例
const upload = ref<UploadInstance>()

let uploadFlag = false

// 这里修改了一部分逻辑，使得不传入文件step组件也能正常运行
const preStep = () => {
    if (active.value-- <= 0) active.value = 0;
    console.log(active.value);
    // console.log(upload.value!.fileList);
}
const nextStep = () => {
    // if (uploadFlag && active.value++ > 2) {
    //     active.value = 3;
    // }
    if (active.value++ > 2) {
        active.value = 3;
    }
    console.log(active.value);
}
const clearaActive = () => {
    active.value = 0;
    uploadFlag = false;
}

// 当文件个数超过 :limit 属性的值时触发的事件。
const handleExceed: UploadProps['onExceed'] = (files) => {
    
    upload.value!.clearFiles()  // .clearFiles() 是一个方法，作用是清空文件列表。
    const file = files[0] as UploadRawFile  // 将files数组中的第一个文件对象转换为 UploadRawFile 类型，并将结果保存在file变量中
    file.uid = genFileId()  //将 file 对象的 uid 属性设置为生成的文件 ID，用于标识文件。
    upload.value!.handleStart(file) //handleStart 方法会将该文件标记为“上传中”，并且开始向服务器端发送文件数据
}

// 用于判断上传文件是否符合要求。
const beforeUpload: UploadProps['onChange'] = (file: any) => {
    const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1); //获取文件名的后缀名的
    const whiteList = ["xls", "xlsx", 'csv'];
    if (whiteList.indexOf(fileSuffix) === -1) {    // = -1 说明没有匹配到白名单中的文件后缀
        ElMessage.error("上传文件只能是 xls,xlsx,csv 格式");
        ElMessage.error("上传失败");
        return false;
    }
    ElMessage({
        message: '上传成功',
        type: 'success',
    })
    // 表示已经上传，可以进行后续步骤
    uploadFlag = true
}

// 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求
const handleRequest: UploadProps['httpRequest'] = (e:any) => {
    const fd = new FileReader()  //实例化一个FileReader对象
    fd.readAsDataURL(e.file)  //将文件传递给FileReader实例的readAsDataURL()方法，可以将文件以base64编码格式读取出来
    // 文件读取完成后触发fd.onload事件
    fd.onload = () => {
        uploadTargetMW('post', {file: fd.result,}) //fd.result表示读取文件后的结果（这里是 base64 编码的字符串）
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
