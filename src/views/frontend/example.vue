<template>
    <el-scrollbar height="96vh">
        <el-form class="form-box" :model="items" label-width="120px" label-position="right">
            <!-- 以下四种输入框使用了 el-input -->
            <!-- input-attr 属性演示了如何添加 el-input 组件原有的属性 -->
            <FormItem
                label="string"
                type="string"
                v-model="items.string"
                :input-attr="{
                    maxlength: 10,
                    clearable: true,
                    onChange: onChangeString, // 事件以on开头，并使用大写驼峰的事件名称定义，不支持在此处单独传递$event（若需要请改用el-form-item）
                }"
                placeholder="Placeholder"
            />
            <FormItem
                label="password"
                type="password"
                v-model="items.password"
                :input-attr="{ maxlength: 10, clearable: true, 'show-password': true }"
            />
            <FormItem label="number" type="number" v-model.number="items.number" :input-attr="{ clearable: true, size: 'large' }" />
            <FormItem label="textarea" type="textarea" v-model="items.textarea" :input-attr="{ 'show-word-limit': true, rows: 3 }" />

            <!-- 同时使用了 el-radio-group 和 el-radio -->
            <!-- 通过 data.content 配置了`选项`数据 -->
            <!-- 通过 attr 设置了el-radio-group 的 size 属性 -->
            <!-- 通过 data.childrenAttr 设置了 el-radio 的 border 属性 -->
            <FormItem
                label="radio"
                type="radio"
                v-model="items.radio"
                :input-attr="{ size: 'large' }"
                :data="{ childrenAttr: { border: true }, content: { a: '选项a', b: '选项b' } }"
            />

            <!-- 同时使用了 el-checkbox-group 和 el-checkbox -->
            <!-- 本类型类似于 radio 只是它的绑定值是一个数组 -->
            <FormItem
                label="checkbox"
                type="checkbox"
                v-model="items.checkbox"
                :input-attr="{ size: 'large' }"
                :data="{ childrenAttr: { border: true }, content: { '0': '选项a', '1': '选项b' } }"
            />

            <!-- 使用了 el-switch -->
            <FormItem label="switch" type="switch" v-model="items.switch" :input-attr="{ size: 'large' }" />

            <!-- 使用了自定义组件 /@/components/baInput/components/array.vue -->
            <FormItem label="array" type="array" v-model="items.array" />

            <!-- 以下三种输入框使用了 el-date-picker -->
            <FormItem label="datetime" type="datetime" v-model="items.datetime" />
            <FormItem label="year" type="year" v-model="items.year" />
            <FormItem label="date" type="date" v-model="items.date" />

            <!-- 使用了 el-time-picker -->
            <FormItem label="time" type="time" v-model="items.time" />

            <!-- 以下两种输入框使用了 el-select -->
            <FormItem label="select" type="select" v-model="items.select" :data="{ content: { '0': '选项0', '1': '选项1' } }" />
            <FormItem label="selects" type="selects" v-model="items.selects" :data="{ content: { '0': '选项0', '1': '选项1', '2': '选项2' } }" />

            <!-- 使用了自定义组件 /@/components/baInput/components/remoteSelect.vue -->
            <!-- 使用时，请确保pk(主键),field(字段),remote-url(api地址)配置正确 -->
            <FormItem
                label="remoteSelect"
                type="remoteSelect"
                v-model="items.remoteSelect"
                :input-attr="{
                    multiple: false,
                    pk: 'user.id',
                    field: 'nickname',
                    'remote-url': userUser + 'index',
                }"
                placeholder="点击选择远程数据-单选"
            />
            <FormItem
                label="remoteSelect"
                type="remoteSelect"
                v-model="items.remoteSelects"
                :input-attr="{
                    multiple: true,
                    pk: 'user.id',
                    field: 'nickname',
                    'remote-url': userUser + 'index',
                    placeholder: '点击选择远程数据-多选',
                }"
            />

            <!-- 使用了 el-cascader -->
            <FormItem label="city" type="city" v-model="items.city" />

            <!-- 以下四种输入框使用了 el-upload -->
            <!-- images 和 files 可以绑定数组类型的值 -->
            <FormItem label="image" type="image" v-model="items.image" />
            <FormItem label="images" type="images" v-model="items.images" />
            <FormItem label="file" type="file" v-model="items.file" />
            <FormItem label="files" type="files" v-model="items.files" />

            <!-- 使用了自定义组件 /@/components/editor/index.vue -->
            <FormItem label="editor" type="editor" v-model="items.editor" />

            <!-- 使用了自定义组件 /@/components/baInput/components/iconSelector.vue -->
            <!-- 具体使用请参考`字体图标` -->
            <FormItem label="icon" type="icon" v-model="items.icon" :input-attr="{ placement: 'top', 'show-icon-name': true }" />
        </el-form>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormItem from '/@/components/formItem/index.vue'
import { userUser } from '/@/api/controllerUrls'

const onChangeString = ()=>{
    console.log('onChangeString excuted !');
}

const items = reactive({
    string: '',
    password: '',
    number: 1,
    textarea: '',
    radio: 'a',
    checkbox: ['0', '1'],
    switch: 1,
    array: [{ key: '这里是key', value: '这里是Value' }],
    datetime: '',
    year: '',
    date: '',
    time: '',
    select: '0',
    selects: ['0', '1'],
    remoteSelect: '1',
    remoteSelects: ['1'],
    editor: '<p>默认内容123</p>',
    city: '',
    image: 'http://localhost:1818/src/assets/logo.png',
    images: 'http://localhost:1818/src/assets/logo.png',
    file: 'http://localhost:1818/src/assets/logo.png',
    files: 'http://localhost:1818/src/assets/logo.png',
    icon: 'el-icon-Apple',
})
</script>

<style scoped lang="scss">
.form-box {
    width: 80vw;
    height: 96vh;
    margin: 40px auto;
}
</style>
