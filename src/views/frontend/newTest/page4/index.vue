<template>
    <div>
        <h1>api测试</h1>
        <el-button @click="send">点击发送请求</el-button>
    </div>
</template>

<script setup lang="ts">
import { testApi } from '/@/api/frontend/user/index';

const send = function(){
    console.log('发送请求');
    testApi('get').then((res)=>{
        console.log('测试api',res);
    })
}

</script>

<style scoped>

</style>