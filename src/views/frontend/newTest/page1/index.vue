<template>
    <div class="wrapper">
        <el-button size="default" type="primary" class="btn1" @click="click1()" plain>功能按钮1</el-button>
        <el-button size="default" type="primary" class="btn2" @click="click2()" plain>功能按钮2</el-button>
        <el-button size="default" type="primary" class="btn3" @click="click3()" plain>功能按钮3</el-button>
        <el-button size="default" type="primary" class="btn4" @click="click4()" plain>功能按钮4</el-button>


        <el-dialog v-model="opt1" width="50%" draggable title="功能1" center>
            <!-- <template #header></template> -->
            <page1></page1>
        </el-dialog>

        <el-dialog v-model="opt2" width="50%" draggable title="功能2" center>
            <!-- <template #header></template> -->
            <page2></page2>
        </el-dialog>

        <el-dialog v-model="opt4" width="60%" draggable title="功能4" center @open="open()" @close="close()">
            <page4></page4>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, Ref, ref, watchEffect } from 'vue'
import page1 from './Info1.vue'
import page2 from './Info2.vue'
import page4 from './Info4.vue'


const opt1 = ref(false)
const opt2 = ref(false)

const opt4 = ref(false)

const click1 = () => {
    console.log('点击按钮1');
    opt1.value = true
}

const click2 = () => {
    console.log('点击按钮2');
    opt2.value = true
}
const click3 = () => {
    console.log('点击按钮3');
}

const click4 = () => {
    console.log('点击按钮4');
    opt4.value = true
}

const open = ()=>{
    console.log('图表栏打开');
}

const close = ()=>{
    console.log('图表栏关闭');
}


</script>


<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'newTest/page1',
})
</script>

<style scoped lang="scss">



.wrapper {
    position: relative;
    width: 1800px;
    height: 1000px;
    background-image: url(/@/assets/product/HDPE-511.png);
    background-repeat: no-repeat;
    // background-size: 60% auto;
    background-size: contain;
    // 上面内容记得加分号


    .btn1 {
        position: absolute;

        left: 15.5*9.5px;
        top: 17*9.5px;
        font-size: medium;
        margin-left: 10px;
    }

    .btn2 {
        position: absolute;

        left: 15.5*9.5px;
        top: 22.5*9.5px;
        font-size: medium;
    }

    .btn3 {
        position: absolute;
        left: 15.5*9.5px;
        top: 28*9.5px;
        font-size: medium;
    }

    .btn4 {
        position: absolute;
        left: 15.5*9.5px;
        top: 33*9.5px;
        font-size: medium;
    }



}
</style>


<style scoped>
/* 设置el-dialog的背景颜色 */
.wrapper :deep(.el-dialog) {
  background-color:#e2e9ff;
}

:deep(.el-dialog__title) {
  /* background-color: #f0f0f0; */
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #000000;
  padding: 10px;
}

</style>
